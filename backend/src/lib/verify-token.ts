import "dotenv/config";
import type { Context } from "hono";
import { UnauthorizedError } from "./utils/error.js";

const ADMIN_SIGNATURE = process.env.ADMIN_SIGNATURE as string;

export async function verifyToken(token: string, c: Context) {
    try {
        if (!token || token != ADMIN_SIGNATURE) {
            throw new UnauthorizedError("Unauthorized access");
        }
        return true;
    } catch (e) {
        return false;
    }
}
