"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type Job = {
    id: string;
    title: string;
    status: "ACTIVE" | "INACTIVE";
    location: string;
    salaryMin: number;
    salaryMax: number;
    jobType: "REMOTE" | "FULL_TIME" | "PART_TIME";
    createdAt: string;
};

const formattedDate = (rawDate: string) => {
    const date = new Date(rawDate);
    const now = new Date();

    const isCurrentYear = date.getFullYear() === now.getFullYear();

    return date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: isCurrentYear ? undefined : "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Link href={`/dashboard/jobs/${row.original.id}`} className="text-blue-500 hover:underline">
                {row.original.title}
            </Link>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            const formattedStatus =
                status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); // Proper case

            return (
                <Badge className="font-light" variant={status === "ACTIVE" ? "default" : "destructive"}>
                    {formattedStatus}
                </Badge>
            );
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Location
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "salaryMin",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Min Salary
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "salaryMax",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Max Salary
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "jobType",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Job Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const jobType = row.original.jobType;
            const formattedJobType = jobType
                .split("_")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
            return <Badge className="font-light" variant="outline">{formattedJobType}</Badge>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <span>{formattedDate(row.original.createdAt)}</span>;
        },
    }
];
