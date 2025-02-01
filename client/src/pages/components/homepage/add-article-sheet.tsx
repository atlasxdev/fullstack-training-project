import { useAxiosInstance } from "@/api/axios-instance";
import RTEContent from "@/components/tiptap/rte-content";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { TArticle, zodArticleSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sanitizeArticleContent } from "@/lib/utils";

function AddArticleSheet({ label }: { label: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
            return await axiosInstance.post<{ message: string }>("/articles", {
                ...data,
            });
        },
        onSuccess({ data: { message } }) {
            toast.success(message, {
                description: "Check it out",
            });
            setIsOpen(false);
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
            form.resetField("title", {
                defaultValue: "",
            });
            form.resetField("content", {
                defaultValue: "",
            });
        },
    });

    function createArticle(data: TArticle) {
        const sanitizedContent = sanitizeArticleContent(data.content);
        mutate({ ...data, content: sanitizedContent });
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button>{label}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add a new article</SheetTitle>
                    <SheetDescription>
                        Create your article here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="pr-4 h-[85vh]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(createArticle)}
                            className="grid gap-4 py-4"
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
                                                className="max-w-[500px] mx-auto"
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
                                    label="Create article"
                                    submittingLabel="Creating article"
                                />
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default AddArticleSheet;
