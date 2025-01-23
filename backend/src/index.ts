import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { bearerAuth } from "hono/bearer-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { pinoLogger } from "hono-pino";
import { errorMiddlewareHandler } from "@/middlewares/error-middleware.js";
import { verifyToken } from "@/lib/verify-token.js";
import webhook from "@/webhook/add-user.js";
import users from "@/routes/users.js";

const PORT = process.env.PORT as string;
const app = new Hono();

app.onError(errorMiddlewareHandler);
app.use(prettyJSON());
app.use(
    pinoLogger({
        pino: {
            level: "info",
        },
    })
);
app.use(
    "/api/*",
    bearerAuth({
        verifyToken: async (token, c) => {
            const isAuthorized = await verifyToken(token, c);
            return isAuthorized;
        },
    })
);

app.route("/webhook", webhook);
app.route("/api", users);

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.notFound((c) => {
    return c.json({ message: "404 not found" });
});

console.log(`Server is running on http://localhost:${PORT}`);

serve({
    fetch: app.fetch,
    port: parseInt(PORT),
});
