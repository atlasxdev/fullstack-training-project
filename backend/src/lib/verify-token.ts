import "dotenv/config";
import type { Context } from "hono";
import { UnauthorizedError } from "./utils/error.js";

const WEBHOOK_SIGNATURE = process.env.WEBHOOK_SIGNATURE as string;

export async function verifyToken(token: string, c: Context) {
    try {
        if (!token || token != WEBHOOK_SIGNATURE) {
            throw new UnauthorizedError("Unauthorized access");
        }
        return true;
    } catch (e) {
        return false;
    }
}
