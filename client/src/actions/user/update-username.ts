import supabase from "@/supabase";
import { TUsername } from "@/zod-schema";
import { toast } from "sonner";

export async function updateUsername({ username }: TUsername) {
    try {
        const { error } = await supabase.auth.updateUser({
            data: { username },
        });

        if (error) {
            throw new Error(error.message);
        }

        toast.success("Username has been updated");
    } catch (error) {
        toast.error(error as string);
    } finally {
        toast.dismiss();
    }
}
