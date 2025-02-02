import { useAxiosInstance } from "@/api/axios-instance";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import type { Article } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import Loading from "./components/article/loading";
import NotFound from "./NotFound";
import DeleteArticleDialog from "./components/article/delete-article-dialog";
import EditArticle from "./components/article/edit-article";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import SwitchModeLoading from "./components/article/switch-mode-loading";
import ViewArticle from "./components/article/view-article";

function Article() {
    const [isTransitioning, startTransition] = useTransition();
    const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
    const axiosInstance = useAxiosInstance();
    const params = useParams();

    function switchMode(checked: boolean) {
        startTransition(() => {
            setIsInEditMode(checked);
        });
    }

    const { data, isPending, isError } = useQuery({
        queryKey: ["article", params.id],
        queryFn: async () => {
            return await axiosInstance.get<{ article: Article }>(
                `/articles/${params.id}`
            );
        },
        enabled: params.id != null,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    if (isPending) {
        return <Loading />;
    }

    if (params.id == null || isError) {
        return <NotFound />;
    }

    if (isTransitioning) {
        return <SwitchModeLoading />;
    }

    return (
        <section className="min-h-screen py-8 bg-background">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <div className="flex items-center">
                    {data.data.article.date_updated != null && (
                        <Badge
                            variant={"secondary"}
                            className="hidden md:block text-[0.7rem] rounded-full"
                        >
                            Edited{" "}
                            {formatDistanceToNow(
                                new Date(data.data.article.date_updated),
                                {
                                    addSuffix: true,
                                }
                            )}
                        </Badge>
                    )}
                    <div className="w-full md:w-max md:ml-auto flex items-center justify-between md:space-x-4">
                        <div className="flex items-center space-x-4">
                            <p className="text-[0.7rem] font-medium -tracking-tighter text-accent-foreground">
                                Switch to {isInEditMode ? "view" : "edit"} mode
                            </p>
                            <Switch
                                checked={isInEditMode}
                                onCheckedChange={switchMode}
                            />
                        </div>

                        {!isInEditMode && (
                            <DeleteArticleDialog articleId={params.id} />
                        )}
                    </div>
                </div>
                {isInEditMode ? (
                    <EditArticle
                        articleId={params.id}
                        title={data.data.article.title}
                        content={data.data.article.content}
                    />
                ) : (
                    <ViewArticle {...data.data.article} />
                )}
            </MaxWidthWrapper>
        </section>
    );
}

export default Article;
