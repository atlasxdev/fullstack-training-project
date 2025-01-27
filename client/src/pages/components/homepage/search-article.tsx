import { Input } from "@/components/ui/input";
import AddArticleSheet from "./add-article-sheet";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useAxiosInstance } from "@/api/axios-instance";
import type { Articles } from "@/types";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { tailspin } from "ldrs";
import { AxiosError } from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SearchResult from "./search-result";
tailspin.register();

function SearchArticle() {
    const axiosInstance = useAxiosInstance();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(searchKeyword);
        }, 1000);

        return () => clearTimeout(handler);
    }, [searchKeyword]);

    const {
        data,
        isLoading,
        isFetched,
        error,
        isError,
        fetchNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["search", debouncedKeyword],
        queryFn: async ({ pageParam }) => {
            return await axiosInstance.get<Articles>(
                `/articles/search?keyword=${debouncedKeyword}&page=${pageParam}`
            );
        },
        enabled: debouncedKeyword != "",
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length + 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        function handleEvent(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleEvent);

        return () => document.removeEventListener("mousedown", handleEvent);
    }, []);

    return (
        <div ref={dropdownRef} className="flex items-center space-x-4">
            <div className="w-full relative">
                <SearchIcon className="absolute left-2.5 top-2 size-5" />
                <Input
                    className="pl-10 bg-background"
                    onFocus={() => setIsFocused(true)}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search an article"
                />
                {isLoading && (
                    <span className="absolute top-2 right-2">
                        <l-tailspin
                            size="20"
                            stroke="3"
                            speed="0.9"
                            color="#CC1B42"
                        ></l-tailspin>
                    </span>
                )}
                {isFetched && (
                    <Card
                        className={cn(
                            "animate-in fade-in-0 zoom-in-95 absolute -bottom-[330px] inset-x-0 h-80 w-3/4 mx-auto bg-background",
                            {
                                hidden: !isFocused,
                            }
                        )}
                    >
                        <ScrollArea className="h-full">
                            <SearchCount
                                length={
                                    data?.pages.flatMap(
                                        (page) => page.data.articles
                                    ).length ?? 0
                                }
                            />
                            <Separator />
                            <CardContent className="pt-6 flex flex-col gap-4 justify-center items-center">
                                {data?.pages.flatMap((page) =>
                                    page.data.articles.map((article) => (
                                        <SearchResult
                                            key={article.id}
                                            {...article}
                                        />
                                    ))
                                )}
                                {!isError && (
                                    <Button
                                        size={"sm"}
                                        disabled={isFetching}
                                        onClick={() => fetchNextPage()}
                                    >
                                        {isFetching
                                            ? "Loading..."
                                            : "Load more"}
                                    </Button>
                                )}
                                {error instanceof AxiosError && (
                                    <div className="pt-4 space-y-1">
                                        <img
                                            src="/no-articles.png"
                                            className="size-24 mx-auto"
                                        />
                                        <p className="text-sm font-semibold text-center -tracking-tighter">
                                            {error.response?.data}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </ScrollArea>
                    </Card>
                )}
            </div>
            <AddArticleSheet label="Add new article" />
        </div>
    );
}

function SearchCount({ length }: { length: number }) {
    return (
        <CardHeader>
            <CardDescription className="text-xs font-bold">
                Articles found: {length}
            </CardDescription>
        </CardHeader>
    );
}

export default SearchArticle;
