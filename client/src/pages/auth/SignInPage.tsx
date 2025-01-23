import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import supabase from "@/supabase";
import { TSignIn, zodSignInSchema } from "@/zod-schema";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
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
import { AuthApiError } from "@supabase/supabase-js";
import FormButton from "@/components/ui/form-button";

function SignInPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<TSignIn>({
        mode: "onChange",
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(zodSignInSchema),
    });

    async function signIn() {
        try {
            setIsLoading(true);
            const { data } = await supabase.from("users").select();
            console.log(data);
            const { error } = await supabase.auth.signInWithOtp({
                email: form.getValues("email"),
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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-11/12 md:w-[460px]">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center -tracking-tighter">
                        Sign in to Article
                        <span className="text-primary">Hub</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-center -tracking-tighter">
                        Welcome back! Please sign in to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder="Enter your email address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your login email
                                                address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormButton
                                icon={<LogInIcon />}
                                onClick={signIn}
                                isLoading={isLoading}
                                isValid={form.formState.isValid}
                                label="Login"
                                submittingLabel="Logging in"
                            />
                        </form>
                    </Form>
                </CardContent>
                <Separator />
                <CardFooter className="p-4 flex justify-between">
                    <div className="w-max mx-auto flex items-center gap-1">
                        <CardDescription className="text-xs -tracking-tighter">
                            Don't have an account?
                        </CardDescription>
                        <Link
                            className={buttonVariants({
                                variant: "link",
                                className: "!p-0 -tracking-tighter text-xs",
                            })}
                            to={"/sign-up"}
                        >
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignInPage;
