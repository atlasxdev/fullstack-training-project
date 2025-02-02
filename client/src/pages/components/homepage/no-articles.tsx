import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

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
                <Link
                    to={"/create-article"}
                    className={buttonVariants({
                        variant: "default",
                    })}
                >
                    Create a new article
                </Link>
            </CardHeader>
        </Card>
    );
}

export default NoArticles;
