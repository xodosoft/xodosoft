import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceFormSkeleton() {
    return (
        <div className="w-full max-w-4xl">
            {/* Page Title */}
            <Skeleton className="h-10 w-48 mb-8" />

            <div className="space-y-8">
                {/* Title Field */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-16 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Service Image */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24 mb-2" />

                    {/* Rich text editor toolbar */}
                    <div className="border rounded-t-md p-2 flex items-center space-x-2">
                        {[...Array(10)].map((_, i) => (
                            <Skeleton key={i} className="h-6 w-6" />
                        ))}
                    </div>

                    {/* Rich text editor content area */}
                    <Skeleton className="h-[200px] w-full border border-t-0 rounded-b-md" />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>
        </div>
    )
}

