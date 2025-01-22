import MaxWidthWrapper from "@/components/max-width-wrapper";
import { BackgroundLines } from "@/components/ui/background-lines";

function Welcome() {
    return (
        <section className="h-screen flex flex-col items-center justify-center gap-6">
            <MaxWidthWrapper>
                <BackgroundLines className="flex items-center justify-center w-full">
                    <header className="flex items-center justify-center flex-col mx-auto w-3/4 space-y-6">
                        <h1 className="text-balance text-center max-w-prose font-bold text-6xl -tracking-tighter">
                            Manage Your Articles in One Place
                        </h1>
                        <p className="font-medium text-balance w-2/4 text-center -tracking-tighter">
                            Track, maintain, and streamline every aspect of your
                            content with ArticleHub.
                        </p>
                    </header>
                </BackgroundLines>
            </MaxWidthWrapper>
        </section>
    );
}

export default Welcome;
