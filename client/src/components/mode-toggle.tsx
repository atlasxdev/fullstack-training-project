import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-1.5" align="end">
                <DropdownMenuItem
                    className={cn("flex items-center justify-between", {
                        "bg-accent": theme == "light",
                    })}
                    onClick={() => setTheme("light")}
                >
                    Light
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn("flex items-center justify-between", {
                        "bg-accent": theme == "dark",
                    })}
                    onClick={() => setTheme("dark")}
                >
                    Dark
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn("flex items-center justify-between", {
                        "bg-accent": theme == "system",
                    })}
                    onClick={() => setTheme("system")}
                >
                    System
                    <Monitor className="h-[1.2rem] w-[1.2rem]" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
