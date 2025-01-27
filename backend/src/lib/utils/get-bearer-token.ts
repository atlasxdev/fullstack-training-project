import type { Context } from "hono";

export function getBearerToken(c: Context) {
    const token = c.req.header("Authorization")?.split(" ")[1];

    return token;
}
