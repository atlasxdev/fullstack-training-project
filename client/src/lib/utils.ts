import sanitizeHtml from "sanitize-html";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function wait(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
}

export function sanitizeArticleContent(content: string) {
    return sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["span", "div"]),
        allowedAttributes: {
            "*": ["style", "class"],
        },
    });
}
