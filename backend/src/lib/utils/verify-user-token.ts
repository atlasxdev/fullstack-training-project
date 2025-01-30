import supabase from "@/supabase.js";
import type { Context } from "hono";

export async function verifyUserToken(token: string, c: Context) {
    const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("user_id", token);

    if (error) {
        return false;
    }

    if (!token || !data.length) {
        return false;
    }
    return true;
}
