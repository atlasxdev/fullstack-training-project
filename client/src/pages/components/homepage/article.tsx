import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/types";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

export default function Article({ id, title, date_created }: Article) {
    return (
        <Link to={`/articles/${id}`}>
            <article>
                <Card className="hover:border-muted-foreground rounded-xl">
                    <CardHeader>
                        <div className="flex justify-between mb-2">
                            <CardDescription className="text-xs uppercase tracking-widest">
                                {format(
                                    new Date(date_created),
                                    "EEEE, MMMM d, yyyy"
                                )}
                            </CardDescription>
                            <CardDescription className="text-xs">
                                {formatDistanceToNow(new Date(date_created), {
                                    addSuffix: true,
                                })}
                            </CardDescription>
                        </div>
                        <Separator />
                        <CardTitle className="py-2 text-center truncate w-full capitalize font-serif text-2xl font-bold mb-4 leading-tight">
                            {title}
                        </CardTitle>
                        <Separator className="mt-6" />
                    </CardHeader>
                </Card>
            </article>
        </Link>
    );
}
