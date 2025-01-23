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

export type TSignUp = z.infer<typeof zodSignUpSchema>;
export type TSignIn = z.infer<typeof zodSignInSchema>;
