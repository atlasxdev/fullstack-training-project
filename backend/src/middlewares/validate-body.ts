import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { Schema } from "zod";

export function validateBody(target: keyof ValidationTargets, schema: Schema) {
    return zValidator(target, schema);
}
