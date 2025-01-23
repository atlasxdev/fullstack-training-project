import "dotenv/config";
import { ConflictError, UnauthorizedError } from "@/lib/utils/error.js";
import supabase from "@/supabase.js";
import { PostgrestError } from "@supabase/supabase-js";
import { Hono } from "hono";
import type { WebhookPayload } from "@/types/index.js";

const WEBHOOK_SIGNATURE = process.env.WEBHOOK_SIGNATURE as string;

const webhook = new Hono().post("/user-create", async (c) => {
    const signature = c.req.header("Authorization")?.split(" ")[1];
    const payload = await c.req.json<WebhookPayload>();
    if (!signature || signature != WEBHOOK_SIGNATURE) {
        throw new UnauthorizedError("Invalid token signature");
    }

    const { data, error: _error } = await supabase
        .from("users")
        .select("email")
        .eq("email", payload.record.email);

    if (_error) {
        throw new PostgrestError({ ..._error });
    }

    if (data.length) {
        throw new ConflictError("Email is already taken");
    }

    const { data: _data, error: __error } = await supabase
        .from("users")
        .select("username")
        .eq("username", payload.record.raw_user_meta_data.username);

    if (_error) {
        throw new PostgrestError({ ...__error! });
    }

    if (_data?.length) {
        throw new ConflictError("Username is already taken");
    }

    if (payload.record.email_confirmed_at == null) {
        c.status(200);
        return c.json({ message: "Webhook received" });
    }
    const { error } = await supabase.from("users").insert({
        user_id: payload.record.id,
        email: payload.record.email,
        username: payload.record.raw_user_meta_data.username,
        password: payload.record.encrypted_password,
    });

    if (error) {
        throw new PostgrestError({ ...error });
    }

    c.status(201);
    return c.json({ message: "User has been added" });
});

export default webhook;
