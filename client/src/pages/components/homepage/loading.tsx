import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex justify-between mb-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16 " />
                        </div>
                        <Separator />
                        <Skeleton className="mx-auto h-6 w-3/4" />
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
            ))}
        </section>
    );
}

export default Loading;
