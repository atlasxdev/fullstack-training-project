import { createErrorResponse } from "@/lib/utils/error.js";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export function errorMiddlewareHandler(err: Error, c: Context) {
    const error = createErrorResponse(err);
    if (err instanceof HTTPException) {
        return err.getResponse();
    }
    return c.json({ error: error });
}
