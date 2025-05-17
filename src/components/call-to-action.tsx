"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
    text: string,
}

export default function CallToAction({ text }: Props) {
    return (
        <section className="bg-white px-4 md:px-6 lg:px-8 pb-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full px-8 md:py-11 py-8 rounded-xl flex gap-8 flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-[#62BCEA] hover:bg-[#4AA9DC] transition-colors cursor-pointer"
            >
                <h1 className="text-white font-bold lg:text-5xl md:text-4xl text-3xl">
                    {text}
                </h1>
                <Button className="group relative overflow-hidden rounded-full bg-white px-8 py-6 md:text-lg text-md text-[#62BCEA] transition-all hover:bg-gray-50">
                    <Link href="/get-quote">
                        <span className="relative flex items-center gap-2">
                            Get Started
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </Button>
            </motion.div>
        </section>
    );
}
