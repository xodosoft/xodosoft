import { Skeleton } from "@/components/ui/skeleton"

export default function UpdateProjectFormSkeleton() {
    return (
        <div className="w-full max-w-4xl">
            {/* Page Title */}
            <Skeleton className="h-10 w-48 mb-8" />

            <div className="space-y-8">
                {/* Project Title Field */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-4 w-64" /> {/* Character limit note */}
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-4 w-72" /> {/* Character limit note */}
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-[120px] w-full rounded-md" />
                    <Skeleton className="h-4 w-80" /> {/* Character limit note */}
                </div>

                {/* Detailed Project Description */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48 mb-2" />
                    {/* Rich text editor toolbar */}
                    <div className="border rounded-t-md p-2 flex items-center space-x-2">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton key={i} className="h-6 w-6" />
                        ))}
                    </div>
                    {/* Rich text editor content area */}
                    <Skeleton className="h-[200px] w-full border border-t-0 rounded-b-md" />
                    <Skeleton className="h-4 w-64" /> {/* Description note */}
                </div>

                {/* Project Images */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-28 mb-2" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-4 w-56" /> {/* Upload note */}
                </div>

                {/* Create Project Button */}
                <div className="pt-2">
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </div>
        </div>
    )
}

