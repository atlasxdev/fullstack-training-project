import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { format, formatDistanceToNow } from "date-fns";
import { Article } from "@/types";
import { Separator } from "@/components/ui/separator";

function SearchResult({ id, date_created, title }: Article) {
    return (
        <Link key={id} to={`/articles/${id}`} className="w-full">
            <Card className="w-full hover:border-muted-foreground">
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
                    <CardTitle className="py-2 text-center truncate w-full capitalize font-serif text-xl font-bold mb-4 leading-tight">
                        {title}
                    </CardTitle>
                    <Separator className="mt-6" />
                </CardHeader>
            </Card>
        </Link>
    );
}

export default SearchResult;
