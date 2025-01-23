import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { bearerAuth } from "hono/bearer-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { pinoLogger } from "hono-pino";
import { errorMiddlewareHandler } from "@/middlewares/error-middleware.js";
import { addUser } from "@/webhook/add-user.js";
import { cors } from "hono/cors";
import { verifyToken } from "@/lib/verify-token.js";

const PORT = process.env.PORT as string;
const WEBHOOK_ORIGIN = process.env.WEBHOOK_ORIGIN as string;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN as string;
const app = new Hono();

app.onError(errorMiddlewareHandler);
app.use(prettyJSON());
app.use(
    pinoLogger({
        pino: { level: "trace" },
    })
);
app.use(
    cors({
        origin: [WEBHOOK_ORIGIN, CLIENT_ORIGIN],
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

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/supabase/webhook/user-create", addUser);

console.log(`Server is running on http://localhost:${PORT}`);

serve({
    fetch: app.fetch,
    port: parseInt(PORT),
});
