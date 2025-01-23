import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Homepage() {
    return (
        <section className="py-8">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <header>
                    <h1 className="font-bold text-3xl -tracking-tighter">
                        Articles
                    </h1>
                </header>
                <Card className="bg-secondary py-16">
                    <CardHeader className="flex flex-col items-center w-max mx-auto">
                        <CardTitle>No articles created yet!</CardTitle>
                        <img
                            src="/no-articles.png"
                            className="size-56 object-cover"
                        />
                        <Button>Create a new article</Button>
                    </CardHeader>
                </Card>
            </MaxWidthWrapper>
        </section>
    );
}

export default Homepage;
