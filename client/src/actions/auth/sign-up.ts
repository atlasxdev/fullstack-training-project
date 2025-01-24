import supabase from "@/supabase";
import { TSignUp } from "@/zod-schema";
import { AuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function signUp({ email, password, username }: TSignUp) {
    try {
        const { data } = await supabase
            .from("users")
            .select("email")
            .eq("email", email);

        if (data?.length) {
            throw new Error("Email is already taken");
        }

        const { data: _data } = await supabase
            .from("users")
            .select("username")
            .eq("username", username);

        if (_data?.length) {
            throw new Error("Username is already taken");
        }

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    email: email,
                    username: username,
                    password: password,
                },
            },
        });
        if (error) {
            throw new Error(error.message);
        }
        toast.success("Email verification has been sent", {
            description: "Please check you email inbox.",
        });
    } catch (error) {
        const apiError = error as AuthApiError;
        toast.error(apiError.message + "!", {
            description: "Please try again.",
        });
    } finally {
        toast.dismiss();
    }
}
