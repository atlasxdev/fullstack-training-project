import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTheme } from "@/components/theme-provider";
import { BackgroundLines } from "@/components/ui/background-lines";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FadeIn from "@/components/ui/fade-in";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";

import { Link } from "react-router";

function Welcome() {
    const { theme } = useTheme();

    return (
        <section className="flex-1 flex flex-col py-8 items-center justify-center">
            <MaxWidthWrapper>
                <BackgroundLines className="flex items-center justify-center w-full">
                    <header className="flex items-center justify-center flex-col mx-auto w-3/4 space-y-6">
                        <h1 className="text-balance text-center max-w-prose font-bold text-4xl md:text-5xl lg:text-6xl -tracking-tighter">
                            Manage Your Articles in One Place
                        </h1>
                        <p className="text-sm md:text-base font-medium text-balance w-full md:w-2/4 text-center -tracking-tighter">
                            Track, maintain, and streamline every aspect of your
                            content with ArticleHub.
                        </p>
                        <Link
                            to={"/sign-up"}
                            className={buttonVariants({
                                variant: "default",
                                size: "lg",
                            })}
                        >
                            Get started now
                        </Link>
                    </header>
                </BackgroundLines>
                <FadeIn>
                    <Card className="border-4">
                        <CardContent className="p-4">
                            <img
                                className="border rounded-lg object-contain"
                                alt="sample image"
                                src={
                                    theme == "dark"
                                        ? "/sample-dark.png"
                                        : "/sample.png"
                                }
                            />
                        </CardContent>
                    </Card>
                </FadeIn>
            </MaxWidthWrapper>

            <FadeIn>
                <MaxWidthWrapper className="py-14 md:py-20 md:max-h-[768px] md:h-screen flex flex-col justify-center items-center space-y-8">
                    <p className="text-2xl md:w-2/4 md:text-4xl text-center leading-snug font-bold -tracking-tighter text-balance">
                        Struggling to Organize Your Writing Projects?
                    </p>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Card className="border-destructive backdrop-blur-md bg-destructive/10">
                            <CardHeader>
                                <CardTitle className="text-center text-xl md:text-2xl font-bold -tracking-tighter">
                                    Without ArticleHub
                                </CardTitle>
                                <CardDescription />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Waste time searching for drafts and
                                        notes
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />

                                    <p>
                                        Juggle between multiple tools and tabs
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>Lose track of article deadlines</p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Overwhelmed by disorganized research and
                                        scattered ideas
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Struggle to recall or locate your next
                                        writing task
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter />
                        </Card>
                        <Card className=" border-green-400 backdrop-blur-md bg-green-400/10">
                            <CardHeader>
                                <CardTitle className="text-center text-xl md:text-2xl font-bold -tracking-tighter">
                                    With ArticleHub
                                </CardTitle>
                                <CardDescription />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Manage all your articles in one
                                        intuitive dashboard
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />

                                    <p>
                                        Collaborate seamlessly with co-authors
                                        and editors
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Stay on top of deadlines with integrated
                                        scheduling
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Keep research, drafts, and notes in one
                                        place for easy access
                                    </p>
                                </div>
                                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Stay motivated with visible progress and
                                        structured workflows
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter />
                        </Card>
                    </div>
                </MaxWidthWrapper>
            </FadeIn>
        </section>
    );
}

export default Welcome;
