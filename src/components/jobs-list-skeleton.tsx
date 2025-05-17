import { Skeleton } from "@/components/ui/skeleton"

export default function JobListingSkeleton() {
    return (
        <div className="my-12">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight text-center mb-12">Currently open positions</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border rounded-lg p-5 flex justify-between">
                        <div className="space-y-4 flex-1">
                            <Skeleton className="h-5 w-[180px]" />
                            <Skeleton className="h-4 w-[80px]" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-[90%]" />
                            </div>
                            <div className="flex items-center space-x-4 pt-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    )
}

