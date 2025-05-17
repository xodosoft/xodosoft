"use client";

import { useJobStore } from "@/store/useJobs";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function FilterApplications() {
    const { jobs } = useJobStore();
    const router = useRouter();

    const handleChange = (selectedJobId: string) => {
        if (selectedJobId === "all") {
            router.push(`/dashboard/applications`);
        }
        else {
            router.push(`/dashboard/applications?jobId=${selectedJobId}`);
        }
    };

    return (
        <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
                <Label htmlFor="filter">Filter</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Filter applications by specific job</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Select onValueChange={handleChange}>
                <SelectTrigger id="filter" className="w-[300px]">
                    <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {jobs.map(({ id, title }) => (
                        <SelectItem key={id} value={id}>{title}</SelectItem>
                    ))}
                    <SelectItem value="others">Others</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
