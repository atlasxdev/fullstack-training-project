import { Link, NavLink } from "react-router";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import {
    BookOpenIcon,
    EllipsisVerticalIcon,
    LogOutIcon,
    SettingsIcon,
} from "lucide-react";
import supabase from "@/supabase";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
    const { session } = useSession();

    if (!session) {
        return <PublicNavbar />;
    }
    return <UserNavbar />;
}

function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-20 border-b backdrop-blur-md bg-background/70">
            <MaxWidthWrapper>
                <div className="py-4 md:py-6 flex items-center justify-between">
                    <Link to={"/"}>
                        <div className="flex items-center justify-center gap-2">
                            <img
                                alt="app logo"
                                src="/article-hub.png"
                                className="size-10"
                            />
                            <span className="hidden md:inline-block font-bold">
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
        <nav className="sticky top-0 z-20 backdrop-blur-md bg-background/70 border-b">
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
                            <span className="hidden md:inline-block text-sm">
                                /
                            </span>
                            <div className="hidden md:flex items-center gap-2">
                                <p className="text-sm -tracking-tighter">
                                    {session?.user.user_metadata.username}
                                </p>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center justify-center gap-6">
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
                    <div className="hidden md:flex items-center justify-center gap-4">
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
                    <div className="flex md:hidden items-center gap-2">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} size={"icon"}>
                                    <EllipsisVerticalIcon className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 mr-8">
                                <DropdownMenuItem className="px-4 py-3">
                                    <NavLink
                                        className="w-full cursor-pointer flex justify-between"
                                        to={"/home"}
                                    >
                                        <p className="text-sm -tracking-tighter">
                                            Your Articles
                                        </p>
                                        <BookOpenIcon className="size-4" />
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="px-4 py-3">
                                    <NavLink
                                        className="w-full cursor-pointer flex justify-between"
                                        to={"/account-settings"}
                                    >
                                        <p className="text-sm -tracking-tighter">
                                            Account Settings
                                        </p>
                                        <SettingsIcon className="size-4" />
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="focus:text-red-600 cursor-pointer flex justify-between text-destructive px-4 py-3"
                                    onClick={signOut}
                                >
                                    Logout
                                    <LogOutIcon />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default Navbar;
