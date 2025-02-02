import { useAxiosInstance } from "@/api/axios-instance";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CONFIRMATION_TEXT = "Delete article";

function DeleteArticleDialog({ articleId }: { articleId: string }) {
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (articleId: string) => {
            return await axiosInstance.delete<{ message: string }>(
                `/articles/${articleId}`
            );
        },
        onSuccess({ data: { message } }) {
            toast.success(message);
            navigate("/home", {
                replace: true,
            });
        },
        onError() {
            toast.error("Uh oh! Something went wrong", {
                description: "Please try again.",
            });
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: ["article", articleId],
            });
            queryClient.invalidateQueries({
                queryKey: ["articles"],
                type: "all",
            });
        },
    });
    const [confirmation, setConfirmation] = useState<string>("");

    function deleteArticle() {
        mutate(articleId);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2" size={"sm"} variant={"destructive"}>
                    Delete
                    <Trash2Icon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Article</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please type{" "}
                        <span className="font-bold text-black dark:text-white">
                            Delete article
                        </span>{" "}
                        to delete this article. After deletion, it can not be
                        recovered.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="Type Delete article"
                />
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={buttonVariants({
                            className: "w-full",
                            variant: "ghost",
                            size: "lg",
                        })}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        onClick={deleteArticle}
                        disabled={
                            isPending || confirmation !== CONFIRMATION_TEXT
                        }
                        className="w-full gap-2"
                        variant={"destructive"}
                        size={"lg"}
                    >
                        {isPending ? (
                            <>
                                Deleting{" "}
                                <l-dot-pulse
                                    size="15"
                                    speed="2"
                                    color="#FFF"
                                ></l-dot-pulse>
                            </>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteArticleDialog;
