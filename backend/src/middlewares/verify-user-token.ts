import "dotenv/config";
import type { Context, Next } from "hono";
import { UnauthorizedError } from "../lib/utils/error.js";
import supabase from "@/supabase.js";
import { PostgrestError } from "@supabase/supabase-js";
import { getBearerToken } from "@/lib/utils/get-bearer-token.js";

export async function verifyUserToken(c: Context, next: Next) {
    const token = getBearerToken(c);
    const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", token);

    if (error) {
        throw new PostgrestError(error);
    }

    if (!token || !data.length) {
        throw new UnauthorizedError("Unauthorized access");
    }

    await next();
}
