"use client";

import { useCategoryStore } from "@/store/useCategory";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Project {
    id: string;
    title: string;
    image: string;
    description: string;
}

export default function ProductShowcase() {
    const { categories, fetchCategories } = useCategoryStore();
    const [selected, setSelected] = useState<{ id: string | null; name: string }>({ id: null, name: "All" });
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Fetch categories once on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch products when selected category changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let url = '/api/projects';
                if (selected.id) {
                    url += `?categoryId=${selected.id}`;
                }
                const response = await axios.get(url);
                setProjects(response.data);
            } catch (error) {
                console.error(error);
                if (axios.isAxiosError(error) && error.response?.data) {
                    toast.error(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selected]);

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8">
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl text-center"
            >
                Our Products
            </motion.h2>

            {/* Category Buttons */}
            <motion.div
                className="py-8 flex flex-wrap justify-center gap-6 md:gap-12"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.1, duration: 0.5 },
                    },
                }}
            >
                {/* All button */}
                <motion.button
                    onClick={() => setSelected({ id: null, name: "All" })}
                    className={`font-medium transition ${selected.id === null ? "text-[#62BCEA]" : "text-gray-600"}`}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                    All
                </motion.button>

                {categories
                    .filter((c) => c.projects.length > 0)
                    .map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setSelected(category)}
                            className={`font-medium transition ${selected?.id === category.id ? "text-[#62BCEA]" : "text-gray-600"
                                }`}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
            </motion.div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading || !projects
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <Card key={idx} className="rounded-xl shadow-md p-4">
                            <Skeleton className="h-52 w-full rounded-md mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-5/6 mb-3" />
                            <Skeleton className="h-4 w-1/2" />
                        </Card>
                    ))
                    : projects.map(({ id, title, image, description }) => (
                        <Card
                            key={id}
                            onClick={() => router.push(`/projects/${id}`)}
                            className={cn(
                                "group border-0 overflow-hidden rounded-xl transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer",
                                "bg-white hover:translate-y-[-4px]"
                            )}
                        >
                            <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={image || "/placeholder.svg?height=208&width=400"}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#62BCEA]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <CardHeader className="p-5 pb-2 border-l-4 border-[#62BCEA]">
                                <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
                            </CardHeader>

                            <CardContent className="p-5 pt-2">
                                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                            </CardContent>

                            <CardFooter className="p-5 pt-0 flex justify-between items-center">
                                <a href={`/projects/${id}`}>
                                    <Button size={"sm"} className="bg-[#62BCEA] hover:bg-[#4AA9DC]">Show more...</Button>
                                </a>
                                <div className="h-1.5 w-1.5 rounded-full bg-[#62BCEA]" ></div>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </section>
    );
}
