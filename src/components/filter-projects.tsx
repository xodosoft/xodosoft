"use client";

import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategory";

export default function FilterProjects() {

    const router = useRouter();

    const { categories, fetchCategories, isLoading } = useCategoryStore();

    useEffect(() => { fetchCategories() }, []);

    const handleChange = (selectedCategory: string) => {
        if (selectedCategory === "all") {
            router.push(`/dashboard/projects`);
        }
        else {
            router.push(`/dashboard/projects?categoryId=${selectedCategory}`);
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
                            <p>Filter projects by category</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Select onValueChange={handleChange} disabled={isLoading}>
                <SelectTrigger id="filter" className="w-[300px]">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {
                        categories.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>{name}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    );
}
