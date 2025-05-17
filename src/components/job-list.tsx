"use client";

import { useJobStore } from "@/store/useJobs";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

const JobListingSkeleton = () => (
    <div className="border rounded-lg p-5 flex justify-between">
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
);

export default function JobListings() {

    const router = useRouter();

    const { jobs, loading } = useJobStore();

    if (!loading && jobs.length === 0) {
        return null;
    }

    return (
        <div className="my-12">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight text-center mb-8">
                Currently open positions
            </h1>
            <div className="grid md:grid-cols-2 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <JobListingSkeleton key={index} />
                    ))
                ) : (
                    jobs.map((job, index) => (
                        <motion.div
                            onClick={() => router.push(`/career/${job.id}`)}
                            key={job.id}
                            className="group bg-white p-6 rounded-lg shadow-md border border-gray-200 cursor-pointer transition-all"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                <div className="rounded-full p-2 bg-[#62BCEA] text-white relative">
                                    <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:rotate-45" />
                                </div>
                            </div>
                            <p className="text-gray-600">
                                {job.jobType.replace("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                {job.description}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </div>
                                <Badge className="bg-[#62BCEA] font-normal">{job.salaryMin}k - {job.salaryMax}k</Badge>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}