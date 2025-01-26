import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { TUsername, zodUsernameSchema } from "@/zod-schema";
import { useSession } from "@/hooks/use-session";
import FormButton from "@/components/ui/form-button";
import { updateUsername } from "@/actions/user/update-username";

function UpdateUsername() {
    const { session } = useSession();
    const form = useForm<TUsername>({
        defaultValues: {
            username: session?.user.user_metadata.username,
        },
        mode: "onChange",
        resolver: zodResolver(zodUsernameSchema),
    });

    return (
        <div className="w-full space-y-4">
            <p className="text-sm font-semibold">Display Name</p>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(updateUsername)}
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Username{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="w-2/4 text-sm -tracking-tighter"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-max">
                        <FormButton
                            size="default"
                            isSubmitting={form.formState.isSubmitting}
                            isValid={form.formState.isValid}
                            label="Save"
                            submittingLabel="Saving..."
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default UpdateUsername;
