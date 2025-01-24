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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TArticle, zodArticleSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function AddArticleSheet({ label }: { label: string }) {
    const form = useForm<TArticle>({
        mode: "onChange",
        defaultValues: {
            title: "",
            content: "",
        },
        resolver: zodResolver(zodArticleSchema),
    });

    return (
        <Sheet>
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
                <Form {...form}>
                    <form className="grid gap-4 py-4">
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
                                        <Input autoFocus type="" {...field} />
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
                                        <Textarea
                                            className="min-h-36"
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
                        <div className="h-1" />
                        <div className="w-max ml-auto">
                            {" "}
                            <FormButton
                                size="default"
                                isSubmitting={form.formState.isSubmitting}
                                isValid={form.formState.isValid}
                                label="Create article"
                                submittingLabel="Creating article"
                            />
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}

export default AddArticleSheet;
