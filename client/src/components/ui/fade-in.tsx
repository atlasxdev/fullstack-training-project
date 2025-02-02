import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useIntersectionObserver } from "usehooks-ts";

function FadeIn({ children }: { children: ReactNode }) {
    const [ref, isIntersecting] = useIntersectionObserver({
        freezeOnceVisible: true,
    });

    return (
        <section
            ref={ref}
            className={cn(
                "transition-all ease-out opacity-0 translate-y-36 duration-1000",
                {
                    "opacity-100 translate-y-0": isIntersecting,
                }
            )}
        >
            {children}
        </section>
    );
}

export default FadeIn;
