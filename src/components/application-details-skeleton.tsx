import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function ApplicationSkeleton() {
    return (
        <div className="my-4 relative">
            <div className="absolute top-2 right-2 text-xs text-gray-500">
                <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">
                <div>
                    <Skeleton className="w-[100px] h-[100px] rounded-full" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                    <Skeleton className="h-6 w-[180px]" />
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Skeleton className="h-[18px] w-[18px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Skeleton className="h-[18px] w-[18px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
            <div>
                <Skeleton className="h-6 w-[120px] mb-2" />
                <Skeleton className="h-32 w-full rounded-md" />
            </div>
            <Separator className="my-4" />
            <div>
                <Skeleton className="h-6 w-[150px] mb-2" />
                <Skeleton className="h-[600px] w-full rounded-md" />
            </div>
            <div className="flex justify-between my-8">
                <Skeleton className="h-9 w-[150px] rounded-md" />
            </div>
        </div>
    )
}

