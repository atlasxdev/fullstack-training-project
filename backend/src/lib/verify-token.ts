import supabase from "@/supabase.js";
import type { Context } from "hono";
import { UnauthorizedError } from "./utils/error.js";

export async function verifyToken(token: string, c: Context) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("id")
            .eq("id", token);

        if (error) {
            throw new UnauthorizedError("Unauthorized access");
        }

        return Boolean(data?.length);
    } catch (e) {
        return false;
    }
}
