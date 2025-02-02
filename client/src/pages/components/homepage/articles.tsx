import { useAxiosInstance } from "@/api/axios-instance";
import type { Articles } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import NoArticles from "./no-articles";
import Article from "./article";
import SearchArticle from "./search-article";
import { useIntersectionObserver } from "usehooks-ts";
import { tailspin } from "ldrs";
import { AxiosError } from "axios";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useTransition } from "react";
import EditorLoader from "./editor-loader";
tailspin.register();

function Articles() {
    const navigate = useNavigate();
    const [isNavigating, setTransition] = useTransition();
    const axiosInstance = useAxiosInstance();
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    });

    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["articles"],
        queryFn: async ({ pageParam }) => {
            return await axiosInstance.get<Articles>(
                `/articles?page=${pageParam}`
            );
        },
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length + 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    if (isIntersecting && !isError) {
        fetchNextPage();
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!data?.pages.flatMap((page) => page.data.articles).length) {
        return <NoArticles />;
    }

    if (isNavigating) {
        return <EditorLoader />;
    }

    function navigateToCreateArticle() {
        setTransition(() => {
            navigate("/create-article");
        });
    }

    return (
        <>
            <section className="space-y-8">
                <div className="flex items-center space-x-4">
                    <SearchArticle />
                    <Button onClick={() => navigateToCreateArticle()}>
                        New article
                    </Button>
                </div>
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.pages.flatMap((page) =>
                        page.data.articles.map((article) => (
                            <Article key={article.id} {...article} />
                        ))
                    )}
                </section>
                {isFetchingNextPage && (
                    <div className="w-max mx-auto">
                        <l-tailspin
                            size="40"
                            stroke="3"
                            speed="0.9"
                            color="#CC1B42"
                        ></l-tailspin>
                    </div>
                )}
                {error instanceof AxiosError && (
                    <p className="text-sm font-semibold text-center -tracking-tighter">
                        {error.response?.data}
                    </p>
                )}
            </section>
            <div ref={ref} className="size-5 mx-auto" />
        </>
    );
}

export default Articles;
