import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const WEBHOOK_SIGNATURE = process.env.WEBHOOK_SIGNATURE as string;
const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/supabase/webhook/user-create", async (c) => {
    const signature = c.req.header("Authorization")?.split(" ")[1];

    if (!signature || signature != WEBHOOK_SIGNATURE) {
        c.status(401);
        return c.json({
            error: "Unauthorized access!",
            message: "Invalid token signature",
        });
    }
    const data = await c.req.json();
    return c.json({ data });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
