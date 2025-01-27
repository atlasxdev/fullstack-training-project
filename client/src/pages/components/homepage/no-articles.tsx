import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AddArticleSheet from "./add-article-sheet";

function NoArticles() {
    return (
        <Card className="bg-secondary py-16">
            <CardHeader className="flex flex-col items-center w-max mx-auto">
                <CardTitle>No articles created yet!</CardTitle>
                <img
                    alt="no articles image"
                    src="/no-articles.png"
                    className="size-56 object-cover"
                />
                <AddArticleSheet label="Create a new article" />
            </CardHeader>
        </Card>
    );
}

export default NoArticles;
