import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

function Navbar() {
    const user = false;

    if (!user) {
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
                        <img
                            src="/article-hub.png"
                            className="size-10 object-cover"
                        />
                        <span className="font-bold">
                            Article<span className="text-primary">Hub</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant={"ghost"}>Login</Button>
                        <Button>Get started now</Button>
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
