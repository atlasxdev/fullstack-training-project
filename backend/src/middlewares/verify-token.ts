import "dotenv/config";
import type { Context, Next } from "hono";
import { UnauthorizedError } from "../lib/utils/error.js";

const ADMIN_SIGNATURE = process.env.ADMIN_SIGNATURE as string;

export async function verifyToken(c: Context, next: Next) {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token || token != ADMIN_SIGNATURE) {
        throw new UnauthorizedError("Unauthorized access");
    }
    await next();
}
