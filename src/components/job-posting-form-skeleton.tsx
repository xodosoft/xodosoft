import { Skeleton } from "@/components/ui/skeleton"

export default function JobFormSkeleton() {
    return (
        <div className="max-w-3xl py-8">
            {/* Title */}
            <Skeleton className="h-9 w-36 mb-6" />

            <div className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-4 w-72 mt-1" />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-[100px] w-full rounded-md" />
                    <Skeleton className="h-4 w-80 mt-1" />
                </div>

                {/* Detailed Job Description */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-44 mb-2" />

                    {/* Rich text editor toolbar */}
                    <div className="border rounded-t-md p-2 flex items-center space-x-2">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton key={i} className="h-6 w-6" />
                        ))}
                    </div>

                    {/* Rich text editor content */}
                    <div className="border border-t-0 rounded-b-md p-4 space-y-4">
                        {/* Heading */}
                        <Skeleton className="h-6 w-32 mb-3" />

                        {/* Bullet points */}
                        <div className="space-y-4 pl-5">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="flex items-start">
                                    <Skeleton className="h-2 w-2 rounded-full mt-2 mr-2" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-4 w-48 mt-1" />
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                {/* Job Type and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20 mb-2" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-16 mb-2" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </div>
        </div>
    )
}

