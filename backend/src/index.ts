import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { WebhookPayload } from "@/types/index.js";
import supabase from "@/supabase.js";
import { logger } from "hono/logger";

const WEBHOOK_SIGNATURE = process.env.WEBHOOK_SIGNATURE as string;
const app = new Hono();

let RECORD = {};

app.use(logger());

app.get("/", async (c) => {
    console.log(RECORD);
    return c.text("Hello Hono!");
});

app.post("/supabase/webhook/user-create", async (c) => {
    try {
        const payload = await c.req.json<WebhookPayload>();
        if (payload.record.email_confirmed_at == null) {
            c.status(200);
            return c.json({ message: "Webhook received" });
        }
        RECORD = payload;
        const { data, error } = await supabase.from("users").insert({
            id: payload.record.id,
            email: payload.record.email,
            username: payload.record.raw_user_meta_data.username,
            password: payload.record.encrypted_password,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log(data);

        c.status(201);
        return c.json({ message: "User has been added" });
    } catch (error) {
        console.error(error);
    }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
