import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import EditorLoader from "./editor-loader";

function NoArticles() {
    const navigate = useNavigate();
    const [isNavigating, setTransition] = useTransition();

    if (isNavigating) {
        return <EditorLoader />;
    }

    function navigateToCreateArticle() {
        setTransition(() => {
            navigate("/create-article");
        });
    }

    return (
        <Card className="bg-secondary py-16">
            <CardHeader className="flex flex-col items-center w-max mx-auto">
                <CardTitle>No articles created yet!</CardTitle>
                <img
                    alt="no articles image"
                    src="/no-articles.png"
                    className="size-56 object-cover"
                />
                <Button onClick={() => navigateToCreateArticle()}>
                    Create a new article
                </Button>
            </CardHeader>
        </Card>
    );
}

export default NoArticles;
