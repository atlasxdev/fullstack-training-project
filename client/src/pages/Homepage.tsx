import MaxWidthWrapper from "@/components/max-width-wrapper";
import Articles from "./components/homepage/articles";

function Homepage() {
    return (
        <section className="py-8 bg-secondary dark:bg-background">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <header>
                    <h1 className="font-bold text-3xl -tracking-tighter">
                        Articles
                    </h1>
                </header>
                <Articles />
            </MaxWidthWrapper>
        </section>
    );
}

export default Homepage;
