import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/max-width-wrapper";

function Loading() {
    return (
        <section className="py-8">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between mb-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16 " />
                        </div>
                        <Separator />
                        <div className="py-4 ">
                            <Skeleton className="mx-auto h-6 w-3/4" />
                        </div>
                        <Separator className="mt-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-5/6 " />
                            <Skeleton className="h-4 w-3/4 " />
                        </div>
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </section>
    );
}

export default Loading;
