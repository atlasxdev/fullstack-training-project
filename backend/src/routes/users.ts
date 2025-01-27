import directusClient from "@/lib/directus.js";
import { BadRequestError, NotFoundError } from "@/lib/utils/error.js";
import { getBearerToken } from "@/lib/utils/get-bearer-token.js";
import { validateBody } from "@/middlewares/validate-body.js";
import { articleSchema } from "@/zod-schema.js";
import {
    createItem,
    deleteItem,
    readItem,
    readItems,
    updateItem,
} from "@directus/sdk";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";

const users = new Hono()
    .get("articles", async (c) => {
        const userId = getBearerToken(c);
        const page = parseInt(c.req.query("page") ?? "1");
        const LIMIT = 15;

        if (page < 1) {
            throw new BadRequestError("Invalid page param");
        }

        const articles = await directusClient.request(
            readItems("articles", {
                filter: {
                    user_id: {
                        _eq: userId,
                    },
                },
                sort: "-date_created",
                limit: LIMIT,
                offset: LIMIT * page - LIMIT,
            })
        );

        if (!articles.length) {
            throw new NotFoundError("That's it! No more articles to load.");
        }

        c.status(StatusCodes.OK);
        return c.json({ articles });
    })
    .get("articles/search", async (c) => {
        const userId = getBearerToken(c);
        const page = parseInt(c.req.query("page") ?? "1");
        const searchKeyword = c.req.query("keyword");
        const LIMIT = 15;

        if (page < 1) {
            throw new BadRequestError("Invalid page param");
        }

        const articles = await directusClient.request(
            readItems("articles", {
                filter: {
                    user_id: {
                        _eq: userId,
                    },
                },
                search: searchKeyword,
                limit: LIMIT,
                offset: LIMIT * page - LIMIT,
            })
        );

        if (!articles.length) {
            throw new NotFoundError(
                "No more articles found matching your search keyword."
            );
        }

        c.status(StatusCodes.OK);
        return c.json({ articles });
    })
    .get("articles/:articleId", async (c) => {
        const userId = getBearerToken(c);
        const articleId = c.req.param("articleId");

        const article = await directusClient.request(
            readItem("articles", articleId, {
                filter: {
                    user_id: {
                        _eq: userId,
                    },
                },
            })
        );

        if (!article) {
            throw new NotFoundError("No article found");
        }

        c.status(StatusCodes.OK);
        return c.json({ article });
    })
    .post("articles", validateBody("json", articleSchema), async (c) => {
        const body = c.req.valid("json");
        const userId = getBearerToken(c);

        await directusClient.request(
            createItem("articles", {
                ...body,
                user_id: userId,
            })
        );

        c.status(StatusCodes.CREATED);
        return c.json({ message: "Article has been created." });
    })
    .patch(
        "articles/:articleId",
        validateBody("json", articleSchema),
        async (c) => {
            const articleId = c.req.param("articleId");
            const body = c.req.valid("json");

            await directusClient.request(
                updateItem("articles", articleId, {
                    ...body,
                })
            );

            c.status(StatusCodes.OK);
            return c.json({ message: "Your article has been updated." });
        }
    )
    .delete("articles/:articleId", async (c) => {
        const articleId = c.req.param("articleId");
        await directusClient.request(deleteItem("articles", articleId));
        c.status(StatusCodes.CREATED);
        return c.json({ message: "Article has been removed." });
    });

export default users;
