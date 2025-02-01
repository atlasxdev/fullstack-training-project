import { useAxiosInstance } from "@/api/axios-instance";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import type { Article } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Loading from "./components/article/loading";
import NotFound from "./NotFound";
import DeleteArticleDialog from "./components/article/delete-article-dialog";
import EditArticleSheet from "./components/article/edit-article-sheet";
import { Badge } from "@/components/ui/badge";

function Article() {
    const axiosInstance = useAxiosInstance();
    const params = useParams();

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

    return (
        <section className="min-h-screen py-8 bg-background">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <div className="flex justify-between items-center">
                    {data.data.article.date_updated && (
                        <Badge
                            variant={"secondary"}
                            className="text-[0.7rem] rounded-full"
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
                    <div className="flex items-center space-x-4">
                        <EditArticleSheet
                            articleId={params.id}
                            title={data.data.article.title}
                            content={data.data.article.content}
                        />
                        <DeleteArticleDialog articleId={params.id} />
                    </div>
                </div>
                <article>
                    <Card className="rounded-xl shadow-xl overflow-hidden">
                        <CardHeader>
                            <div className="flex justify-between mb-2">
                                <CardDescription className="text-xs font-medium uppercase tracking-widest">
                                    {format(
                                        new Date(
                                            data.data.article.date_created
                                        ),
                                        "EEEE, MMMM d, yyyy"
                                    )}
                                </CardDescription>

                                <CardDescription className="text-xs font-medium">
                                    {formatDistanceToNow(
                                        new Date(
                                            data.data.article.date_created
                                        ),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </CardDescription>
                            </div>
                            <Separator />
                            <CardTitle className="py-4 text-center w-full capitalize font-serif text-2xl md:text-4xl font-bold mb-4 leading-tight">
                                {data.data.article.title}
                            </CardTitle>
                            <Separator className="mt-6" />
                        </CardHeader>
                        <CardContent className="md:px-10 md:pb-6">
                            <div
                                id="article-content"
                                dangerouslySetInnerHTML={{
                                    __html: data.data.article.content,
                                }}
                            />
                        </CardContent>
                    </Card>
                </article>
            </MaxWidthWrapper>
        </section>
    );
}

export default Article;
