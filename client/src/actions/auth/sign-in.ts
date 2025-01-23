import supabase from "@/supabase";
import { AuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function signIn({ email }: { email: string }) {
    try {
        const { data: _data } = await supabase
            .from("users")
            .select("email")
            .eq("email", email);

        if (!_data?.length) {
            throw new Error("User not found");
        }

        const { data } = await supabase.from("users").select();
        console.log(data);
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
        });
        if (error) {
            console.error(error);
            throw new Error(error.message);
        }
        toast.success("A confirmation email has been sent", {
            description: "Please check you email inbox.",
        });
    } catch (error) {
        const apiError = error as AuthApiError;
        toast.error(apiError.message + "!", {
            description: "Please try again.",
        });
    }
}
