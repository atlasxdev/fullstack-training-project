import { Link } from "react-router";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "@/hooks/use-session";

function Navbar() {
    const { session } = useSession();

    if (!session) {
        return <PublicNavbar />;
    }
    return <UserNavbar />;
}

function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-10 inset-x-0 border-b backdrop-blur-md">
            <MaxWidthWrapper>
                <div className="py-4 md:py-6 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <img src="/article-hub.png" className="size-10" />
                        <span className="font-bold">
                            Article<span className="text-primary">Hub</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            to={"/sign-in"}
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            Login
                        </Link>
                        <Link
                            to={"/sign-up"}
                            className={buttonVariants({
                                variant: "default",
                                size: "sm",
                            })}
                        >
                            Get started now
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

function UserNavbar() {
    return (
        <nav className="sticky top-0 z-10 inset-x-0 border-b backdrop-blur-md">
            <MaxWidthWrapper>
                <div className="py-4 md:py-6 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src="/article-hub.png"
                            className="size-10 object-cover"
                        />
                        <span className="font-bold">
                            Article<span className="text-primary">Hub</span>
                        </span>
                    </div>
                    <Button>Get started now</Button>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default Navbar;
