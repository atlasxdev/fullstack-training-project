import "dotenv/config";
import type { Context, Next } from "hono";
const ADMIN_SIGNATURE = process.env.ADMIN_SIGNATURE as string;

export function verifyAdminToken(token: string, c: Context) {
    if (!token || token != ADMIN_SIGNATURE) {
        return false;
    }
    return true;
}
