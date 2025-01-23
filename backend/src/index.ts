import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const WEBHOOK_SIGNATURE = process.env.WEBHOOK_SIGNATURE as string;
const app = new Hono();

let DATA = {};

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get("/hello", (c) => {
    console.log("YES");
    return c.json({ DATA });
});

app.post("/supabase/webhook/user-create", async (c) => {
    const data = await c.req.json();
    DATA = data;
    return c.json({ DATA });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
