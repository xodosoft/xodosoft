"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type Application = {
    id: string;
    jobId: string | null;
    name: string;
    email: string;
    resume: string;
    coverLetter: string;
    phone: string;
    appliedAt: string;
};

export const formattedDate = (rawDate: string) => {
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

export const columns: ColumnDef<Application>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Full Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Link href={`/dashboard/applications/${row.original.id}`} className="text-blue-500 hover:underline">
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "applied At",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Applied At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <span>{formattedDate(row.original.appliedAt)}</span>;
        },
    }
];
