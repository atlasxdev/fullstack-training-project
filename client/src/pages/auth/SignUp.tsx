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
import { TSignUp, zodSignUpSchema } from "@/zod-schema";
import { ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
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
import { PasswordInput } from "@/components/ui/password-input";
import FormButton from "@/components/ui/form-button";
import { signUp } from "@/actions/auth/sign-up";
import { useEffect } from "react";

function SignUp() {
    const form = useForm<TSignUp>({
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(zodSignUpSchema),
    });

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                email: "",
                password: "",
                username: "",
            });
        }
    }, [form]);

    return (
        <div className="h-screen flex items-center justify-center">
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
                        <form
                            onSubmit={form.handleSubmit(signUp)}
                            className="space-y-6"
                        >
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    data-test="username"
                                                    autoFocus
                                                    placeholder="Enter your username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public username.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    data-test="email"
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
                                                <PasswordInput
                                                    data-test="password"
                                                    placeholder="Enter a strong password"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormButton
                                size="sm"
                                icon={<ChevronRightIcon />}
                                isSubmitting={form.formState.isSubmitting}
                                isValid={form.formState.isValid}
                                label="Continue"
                                submittingLabel="Signing up"
                            />
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

export default SignUp;
