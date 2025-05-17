"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";

export type Project = {
    id: string;
    title: string;
    category: object;
    image: string;
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

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "image",
        header: () => <span>Image</span>,
        cell: ({ row }) => {
            const imageUrl = row.original.image;
            const title = row.original.title;

            return (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex items-center cursor-pointer">
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={70}
                                height={70}
                                className="rounded-md"
                            />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-2">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={300}
                            height={300}
                            className="rounded-md"
                        />
                    </HoverCardContent>
                </HoverCard>
            );
        },
    },
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
            <Link href={`/dashboard/projects/${row.original.id}`} className="text-blue-500 hover:underline">
                {row.original.title}
            </Link>
        ),
    },
    {
        accessorKey: "category.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
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
