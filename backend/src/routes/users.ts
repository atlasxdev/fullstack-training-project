import directusClient from "@/lib/directus.js";
import { NotFoundError } from "@/lib/utils/error.js";
import supabase from "@/supabase.js";
import { readItem, readItems } from "@directus/sdk";
import { PostgrestError } from "@supabase/supabase-js";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";

const users = new Hono()
    .get("/:id", async (c) => {
        const userId = c.req.param("id");
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId);

        if (!data?.length) {
            throw new NotFoundError("No user found");
        }

        if (error) {
            throw new PostgrestError(error);
        }

        c.status(StatusCodes.OK);
        return c.json({ data });
    })
    .get("/:id/articles", async (c) => {
        const userId = c.req.param("id");
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId);

        if (!data?.length) {
            throw new NotFoundError("No user found");
        }

        if (error) {
            throw new PostgrestError(error);
        }

        const articles = await directusClient.request(readItems("articles"));

        c.status(StatusCodes.OK);
        return c.json({ articles });
    })
    .get("/:id/articles/:articleId", async (c) => {
        const userId = c.req.param("id");
        const articleId = c.req.param("articleId");
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId);

        if (!data?.length) {
            throw new NotFoundError("No user found");
        }

        if (error) {
            throw new PostgrestError(error);
        }

        const article = await directusClient.request(
            readItem("articles", articleId)
        );

        c.status(StatusCodes.OK);
        return c.json({ article });
    });

export default users;
