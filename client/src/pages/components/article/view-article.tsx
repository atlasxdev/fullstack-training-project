import { Article } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";

function ViewArticle({ date_created, title, content }: Article) {
    return (
        <article>
            <Card className="rounded-xl shadow-xl overflow-hidden">
                <CardHeader>
                    <div className="flex justify-between mb-2">
                        <CardDescription className="text-xs font-medium uppercase tracking-widest">
                            {format(
                                new Date(date_created),
                                "EEEE, MMMM d, yyyy"
                            )}
                        </CardDescription>

                        <CardDescription className="text-xs font-medium">
                            {formatDistanceToNow(new Date(date_created), {
                                addSuffix: true,
                            })}
                        </CardDescription>
                    </div>
                    <Separator />
                    <CardTitle className="py-4 text-center w-full capitalize font-serif text-2xl md:text-4xl font-bold mb-4 leading-tight">
                        {title}
                    </CardTitle>
                    <Separator className="mt-6" />
                </CardHeader>
                <CardContent className="md:px-10 md:pb-6">
                    <div
                        id="article-content"
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    />
                </CardContent>
            </Card>
        </article>
    );
}

export default ViewArticle;
