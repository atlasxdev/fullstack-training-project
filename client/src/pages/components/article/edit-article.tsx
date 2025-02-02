import { useAxiosInstance } from "@/api/axios-instance";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TArticle, zodArticleSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sanitizeArticleContent } from "@/lib/utils";
import RTEContent from "@/components/tiptap/rte-content";
import { useEffect } from "react";

function EditArticle({
    articleId,
    title,
    content,
}: {
    articleId: string;
    title: string;
    content: string;
}) {
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();
    const form = useForm<TArticle>({
        mode: "onChange",
        defaultValues: {
            title: title,
            content: content,
        },
        resolver: zodResolver(zodArticleSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: TArticle) => {
            return await axiosInstance.patch<{ message: string }>(
                `/articles/${articleId}`,
                {
                    ...data,
                }
            );
        },
        onSuccess({ data: { message } }) {
            toast.success(message, {
                description: "Check it out",
            });
        },
        onError({ message }) {
            toast.error(message, {
                description: "Please try again.",
            });
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: ["articles"],
            });
            queryClient.invalidateQueries({
                queryKey: ["article", articleId],
            });
        },
    });

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue =
                "You have unsaved changes. Are you sure you want to leave?";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    function updateArticle(data: TArticle) {
        const sanitizedContent = sanitizeArticleContent(data.content);
        mutate({ ...data, content: sanitizedContent });
    }

    return (
        <article>
            <Card className="rounded-xl shadow-xl overflow-hidden">
                <CardHeader>
                    <CardTitle>You're in Edit mode</CardTitle>
                    <CardDescription>
                        Edit your article here. Click "Save changes" below when
                        you're done.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(updateArticle)}
                            className="grid gap-4 "
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Title{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                autoFocus
                                                type=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your article title.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Content{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <RTEContent {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your article content.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="h-1" />
                            <div className="w-max ml-auto">
                                <FormButton
                                    size="default"
                                    isSubmitting={isPending}
                                    isValid={form.formState.isValid}
                                    label="Save changes"
                                    submittingLabel="Saving changes"
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </article>
    );
}

export default EditArticle;
