"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <motion.section
            className="bg-gray-50 px-4 md:px-6 lg:px-8 py-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Heading */}
            <motion.h2
                className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                About Us
            </motion.h2>

            <div className="grid gap-8 lg:grid-cols-2 relative">
                {/* Gradient Circle Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[#62BCEA]/30 to-white/5 blur-3xl" />

                {/* Animated Image */}
                <motion.div
                    className="relative overflow-hidden rounded-2xl lg:rounded-bl-[100px] h-auto lg:min-h-[500px] aspect-video lg:aspect-auto"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src='/images/about-section.jpg'
                        className="object-cover h-full w-full"
                        alt="About Xodosoft"
                        fill
                    />
                </motion.div>

                {/* Animated Text Content */}
                <motion.div
                    className="flex gap-6 flex-col items-start py-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <span className="text-xs font-semibold py-3 px-4 bg-gray-100 rounded-full">
                        🚀 Driving Innovation for Your Business Growth
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Transforming Ideas into <br /> Scalable Digital Solutions
                    </h1>

                    <motion.p
                        className="leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        In an era of rapid digital transformation, businesses must adapt swiftly to remain competitive. At Xodosoft, we specialize in helping organizations embrace change with confidence—delivering tailored IT solutions that power growth, efficiency, and innovation across diverse industries.
                    </motion.p>

                    <motion.p
                        className="leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Based in Karachi, our expert team crafts enterprise-grade software, scalable cloud platforms, and seamless digital experiences. From ERP systems to intelligent POS solutions, every product we build reflects our commitment to quality, performance, and forward-thinking design.
                    </motion.p>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Button className="group relative overflow-hidden rounded-full bg-[#62BCEA] mt-4 px-8 py-6 text-white transition-all hover:bg-[#4AA9DC]">
                            <Link href="/about">
                                <span className="relative flex items-center gap-2">
                                    More About Us
                                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Effects */}
            <div className="hidden lg:block z-10 rounded-full w-96 h-96 absolute -left-[5%] -bottom-[10%] bg-[#62BCEA] opacity-50"></div>
        </motion.section>
    );
}
