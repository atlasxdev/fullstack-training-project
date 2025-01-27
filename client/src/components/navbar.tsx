import { Link, NavLink } from "react-router";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { BookOpenIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import supabase from "@/supabase";

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
                    <Link to={"/"}>
                        <div className="flex items-center justify-center gap-2">
                            <img
                                alt="app logo"
                                src="/article-hub.png"
                                className="size-10"
                            />
                            <span className="font-bold">
                                Article<span className="text-primary">Hub</span>
                            </span>
                        </div>
                    </Link>
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
    const { session } = useSession();

    async function signOut() {
        try {
            await supabase.auth.signOut({
                scope: "global",
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="sticky top-0 z-20 backdrop-blur-md border-b">
            <MaxWidthWrapper>
                <div className="w-full flex items-center justify-between py-4">
                    <div className="flex items-center justify-center gap-10">
                        <Link
                            to={"/home"}
                            className="flex items-center justify-center gap-4"
                        >
                            <img
                                alt="app logo"
                                className="size-8"
                                src="/article-hub.png"
                            />
                            <span className="text-sm">/</span>
                            <div className="flex items-center gap-2">
                                <p className="text-sm -tracking-tighter">
                                    {" "}
                                    {session?.user.user_metadata.username}
                                </p>
                            </div>
                        </Link>
                        <div className="flex items-center justify-center gap-6">
                            <NavLink
                                to={"/home"}
                                className={({
                                    isActive,
                                    isPending,
                                    isTransitioning,
                                }) =>
                                    cn(
                                        "relative flex items-center justify-center gap-2 dark:text-muted-foreground",
                                        {
                                            "opacity-70":
                                                isPending || isTransitioning,
                                            "[&_*]:text-primary [&_*]:dark:text-white  after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary after:dark:bg-white after:-bottom-6 after:rounded-full":
                                                isActive,
                                        }
                                    )
                                }
                            >
                                <BookOpenIcon className="size-5" />
                                <p className="text-sm -tracking-tighter">
                                    Your Articles
                                </p>
                            </NavLink>
                            <NavLink
                                to={"/account-settings"}
                                className={({
                                    isActive,
                                    isPending,
                                    isTransitioning,
                                }) =>
                                    cn(
                                        "relative flex items-center justify-center gap-2 dark:text-muted-foreground",
                                        {
                                            "opacity-70":
                                                isPending || isTransitioning,
                                            "[&_*]:text-primary [&_*]:dark:text-white  after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary after:dark:bg-white after:-bottom-6 after:rounded-full":
                                                isActive,
                                        }
                                    )
                                }
                            >
                                <SettingsIcon className="size-5" />
                                <p className="text-sm -tracking-tighter">
                                    Account Settings
                                </p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <ModeToggle />
                        <Button
                            onClick={signOut}
                            className="gap-2"
                            variant={"destructive"}
                            size="sm"
                        >
                            Logout
                            <LogOutIcon className="size-5" />
                        </Button>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default Navbar;
