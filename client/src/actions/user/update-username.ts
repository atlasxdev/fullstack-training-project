import supabase from "@/supabase";
import { TUsername } from "@/zod-schema";
import { toast } from "sonner";

export async function updateUsername({ username }: TUsername) {
    try {
        const { data } = await supabase.auth.getUser();

        const [promise1, promise2] = await Promise.allSettled([
            supabase.auth.updateUser({
                data: {
                    username,
                },
            }),
            supabase
                .from("users")
                .update({
                    username,
                })
                .eq("user_id", data.user?.id),
        ]);

        if (promise1.status == "rejected" || promise2.status == "rejected") {
            throw new Error("Uh oh! Something went wrong");
        }

        toast.success("Username has been updated");
    } catch (error) {
        toast.error(error as string);
    } finally {
        toast.dismiss();
    }
}
