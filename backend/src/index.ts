import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorMiddlewareHandler } from "@/middlewares/error-middleware.js";
import users from "@/routes/users.js";
import webhook from "@/webhook/add-user.js";
import { verifyToken } from "@/middlewares/verify-token.js";

const PORT = process.env.PORT as string;
const app = new Hono();

app.onError(errorMiddlewareHandler);
app.use(prettyJSON());
app.use(logger());
app.use("/api/*", verifyToken);

app.route("/api", users);
app.route("/webhook", webhook);

app.get("/", (c) => {
    return c.text("Hello world!");
});

app.notFound((c) => {
    return c.json({ message: "404 not found" });
});

console.log(`Server is running on http://localhost:${PORT}`);

serve({
    fetch: app.fetch,
    port: parseInt(PORT),
});
