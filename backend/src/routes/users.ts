import { InternalServerError, NotFoundError } from "@/lib/utils/error.js";
import supabase from "@/supabase.js";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";

const users = new Hono()
    .basePath("/users")
    .get("/", async (c) => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
            throw new InternalServerError(error.message);
        }
        c.status(StatusCodes.OK);
        return c.json({ data });
    })
    .get("/:id", async (c) => {
        const userId = c.req.param("id");
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
        if (error) {
            if (error.message === "No rows found") {
                throw new NotFoundError("User not found");
            }
            throw new InternalServerError(error.message);
        }
        c.status(StatusCodes.OK);
        return c.json({ data });
    })
    .post("/", async (c) => {
        const body = await c.req.json();
        const { error } = await supabase.from("users").insert([body]);
        if (error) {
            throw new InternalServerError(error.message);
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
            throw new InternalServerError(error.message);
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
            throw new InternalServerError(error.message);
        }
        c.status(StatusCodes.OK);
        return c.json({ message: "User deleted successfully" });
    });

export default users;
