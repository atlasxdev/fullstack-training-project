import { NotFoundError } from "@/lib/utils/error.js";
import supabase from "@/supabase.js";
import { PostgrestError } from "@supabase/supabase-js";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";

const admin = new Hono()
    .get("/", async (c) => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
            throw new PostgrestError(error);
        }
        c.status(StatusCodes.OK);
        return c.json({ data });
    })
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
    .post("/", async (c) => {
        const body = await c.req.json();
        const { error } = await supabase.from("users").insert([body]);
        if (error) {
            throw new PostgrestError(error);
        }
        c.status(StatusCodes.CREATED);
        return c.json({ message: "A new user has been created!" });
    })
    .patch("/:id", async (c) => {
        const userId = c.req.param("id");
        const body = await c.req.json();
        const { error } = await supabase
            .from("users")
            .update(body)
            .eq("id", userId);

        if (error) {
            throw new PostgrestError(error);
        }

        c.status(StatusCodes.OK);
        return c.json({ message: "User has been updated" });
    })
    .delete("/:id", async (c) => {
        const userId = c.req.param("id");
        const { error } = await supabase
            .from("users")
            .delete()
            .eq("id", userId);

        if (error) {
            throw new PostgrestError(error);
        }

        c.status(StatusCodes.OK);
        return c.json({ message: "User deleted successfully" });
    });

export default admin;
