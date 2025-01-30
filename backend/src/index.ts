import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { errorMiddlewareHandler } from "@/middlewares/error-middleware.js";
import webhook from "@/webhook/add-user.js";
import admin from "@/routes/admin.js";
import users from "@/routes/users.js";
import { verifyUserToken } from "@/lib/utils/verify-user-token.js";
import { verifyAdminToken } from "@/lib/utils/verify-admin-token.js";

const PORT = process.env.PORT as string;
const app = new Hono();

app.onError(errorMiddlewareHandler);
app.use(
    cors({
        origin: "*",
        allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    })
);
app.use(prettyJSON());
app.use(logger());
app.use(
    "/api/users/*",
    bearerAuth({
        verifyToken: async (token, c) => {
            return await verifyUserToken(token, c);
        },
    })
);
app.use(
    "/api/admin/*",
    bearerAuth({
        verifyToken: (token, c) => {
            return verifyAdminToken(token, c);
        },
    })
);

app.route("/api/users", users);
app.route("/api/admin", admin);
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
