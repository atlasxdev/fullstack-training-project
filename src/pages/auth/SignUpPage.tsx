import { Button, buttonVariants } from "@/components/ui/button";
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
import { TSignUp, zodSignUpSchema } from "@/zod-schema";
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react";
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

function SignUpPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<TSignUp>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(zodSignUpSchema),
    });

    async function signUp() {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signUp({
                email: form.getValues("email"),
                password: form.getValues("password"),
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
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="absolute top-0 left-0 p-4 w-max">
                <Link
                    to={"/"}
                    className={buttonVariants({
                        variant: "secondary",
                        className: "gap-2",
                        size: "sm",
                    })}
                >
                    <ArrowLeftIcon className="size-4" />
                    Go back
                </Link>
            </div>
            <Card className="w-11/12 md:w-[460px]">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center -tracking-tighter">
                        Create your account
                    </CardTitle>
                    <CardDescription className="text-xs text-center -tracking-tighter">
                        Welcome! Please fill in the details to get started.
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
                                                This is your personal email
                                                address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter a strong password"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                size={"sm"}
                                className="w-full gap-2"
                                disabled={isLoading || !form.formState.isValid}
                                onClick={signUp}
                            >
                                Continue
                                <ChevronRightIcon />
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <Separator />
                <CardFooter className="p-4 flex justify-between">
                    <div className="w-max mx-auto flex items-center gap-1">
                        <CardDescription className="text-xs -tracking-tighter">
                            Already have an account?
                        </CardDescription>
                        <Link
                            className={buttonVariants({
                                variant: "link",
                                className: "!p-0 -tracking-tighter text-xs",
                            })}
                            to={"/sign-in"}
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignUpPage;
