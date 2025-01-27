import "dotenv/config";
import type { Context, Next } from "hono";
import { UnauthorizedError } from "../lib/utils/error.js";
import { getBearerToken } from "@/lib/utils/get-bearer-token.js";

const ADMIN_SIGNATURE = process.env.ADMIN_SIGNATURE as string;

export async function verifyAdminToken(c: Context, next: Next) {
    const token = getBearerToken(c);
    if (!token || token != ADMIN_SIGNATURE) {
        throw new UnauthorizedError("Unauthorized access");
    }
    await next();
}
