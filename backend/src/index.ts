import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { bearerAuth } from "hono/bearer-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { pinoLogger } from "hono-pino";
import { errorMiddlewareHandler } from "@/middlewares/error-middleware.js";
import { verifyToken } from "@/lib/verify-token.js";
import webhook from "./webhook/add-user.js";

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
app.route("/webhook", webhook);
app.use(
    "/api/*",
    bearerAuth({
        verifyToken: async (token, c) => {
            const isAuthorized = await verifyToken(token, c);
            return isAuthorized;
        },
    })
);

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.notFound((c) => {
    return c.text("Custom 404 Message", 404);
});

console.log(`Server is running on http://localhost:${PORT}`);

serve({
    fetch: app.fetch,
    port: parseInt(PORT),
});
