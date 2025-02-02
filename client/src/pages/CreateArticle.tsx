import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useAxiosInstance } from "@/api/axios-instance";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { TArticle, zodArticleSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sanitizeArticleContent } from "@/lib/utils";
import RTEContent from "@/components/tiptap/rte-content";
import { useNavigate } from "react-router";

type CreateArticleResponse = {
    message: string;
    articleId: string;
};

function CreateArticle() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();
    const form = useForm<TArticle>({
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
        },
        resolver: zodResolver(zodArticleSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: TArticle) => {
            return await axiosInstance.post<CreateArticleResponse>(
                "/articles",
                {
                    ...data,
                }
            );
        },
        onSuccess({ data: { message, articleId } }) {
            toast.success(message, {
                description: "Check it out",
            });
            navigate(`/articles/${articleId}`);
        },
        onError({ message }) {
            toast.error(message, {
                description: "Please try again.",
            });
        },
        onSettled() {
            toast.dismiss();
            queryClient.invalidateQueries({
                queryKey: ["articles"],
                type: "all",
            });
        },
    });

    function createArticle(data: TArticle) {
        const sanitizedContent = sanitizeArticleContent(data.content);
        mutate({ ...data, content: sanitizedContent });
    }

    return (
        <section className="min-h-screen py-8 bg-background">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <article>
                    <Card className="rounded-xl shadow-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle>Add a new article</CardTitle>
                            <CardDescription>
                                Create your article here. Click "Create article"
                                below when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(createArticle)}
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
                                                    This is your article
                                                    content.
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
                                            label="Create article"
                                            submittingLabel="Creating article"
                                        />
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </article>
            </MaxWidthWrapper>
        </section>
    );
}

export default CreateArticle;
