import { z } from "zod";

export const zodSignUpSchema = z.object({
    username: z
        .string()
        .min(5, { message: "Username must contain at least 5 character(s)" }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export const zodSignInSchema = z.object({
    email: z.string().email(),
});

export const zodUsernameSchema = z.object({
    username: z
        .string()
        .min(5, { message: "Username must contain at least 5 character(s)" }),
});

export const zodArticleSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must be at most 100 characters long"),
    content: z
        .string()
        .min(20, "Content must be at least 20 characters long")
        .max(5000, "Content must be at most 5000 characters long"),
});

export type TSignUp = z.infer<typeof zodSignUpSchema>;
export type TSignIn = z.infer<typeof zodSignInSchema>;
export type TArticle = z.infer<typeof zodArticleSchema>;
export type TUsername = z.infer<typeof zodUsernameSchema>;
