import { z } from "zod";

export const articleSchema = z.object({
    title: z.string().max(255),
    content: z.string(),
});
