"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Layers, Monitor } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = "Empowering Your Business with Innovative Tech Solutions";
const words = text.split(" ");

export default function Hero() {

    const [iconSize, setIconSize] = useState(48);

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 640) {
                setIconSize(32); // Mobile
            } else if (window.innerWidth < 1024) {
                setIconSize(40); // Tablet
            } else {
                setIconSize(48); // Desktop
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const [sectionClass, setSectionClass] = useState("items-center");

    useEffect(() => {
        const updateClass = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (width < 768) {
                setSectionClass("items-center");
            } else if (height < 700) {
                setSectionClass("items-end pb-[15vh]");
            } else {
                setSectionClass("items-center");
            }
        };

        updateClass(); // Initial check
        window.addEventListener("resize", updateClass);

        return () => window.removeEventListener("resize", updateClass);
    }, []);

    const items = [
        {
            icon: <Monitor className="text-white" size={iconSize} />,
            className: "top-[15%] left-[10%] lg:top-[14%] lg:left-[8%] w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]",
            delay: 0,
        },
        {
            icon: <Cpu className="text-white" size={iconSize} />,
            className: "top-[12%] right-[8%] lg:top-[16%] lg:right-[12%] w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]",
            delay: 0.2,
        },
        {
            icon: <Layers className="text-white" size={iconSize} />,
            className: "bottom-[12%] left-6 lg:bottom-[15%] lg:left-8 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
            delay: 0.4,
        },
        {
            icon: <Code className="text-white" size={iconSize} />,
            className: "bottom-[25%] right-[8%] lg:bottom-[30%] lg:right-[6%] w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]",
            delay: 0.6,
        },
    ];

    // Framer Motion Variants for Staggered Animations
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
        }),
    };

    return (
        <section
            className={`relative min-h-dvh overflow-hidden flex justify-center ${sectionClass}`}
        >

            {/* Background Gradients */}
            <div className="absolute w-full h-full -z-10 bottom-0 bg-gradient-to-b from-[#ffffff] via-[#d8ecf8] to-[#62BCEA]"></div>

            {/* Dot Pattern */}
            <div
                className="absolute w-full h-1/2 -z-10 bottom-0 bg-[radial-gradient(white_2px,transparent_2px)] opacity-50"
                style={{ backgroundSize: "40px 40px" }}
            ></div>

            <div className="text-center px-4 md:px-6 pt-16 sm:pt-0">

                {/* Animated Heading */}
                <h1 className="font-bold md:text-[5vw] text-4xl" style={{ lineHeight: "normal" }}>
                    {words.map((word, index) => (
                        <motion.span
                            key={index}
                            className={`${word === "Empowering" || word === "Solutions"
                                ? "bg-gradient-to-t from-[#62BCEA] to-[#b8e4f2] font-bold text-transparent bg-clip-text"
                                : "text-[#475C7B]"
                                } inline-block`}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                        >
                            {word}{"\u00A0"}
                            {word === "Business" && <br />}
                        </motion.span>
                    ))}
                </h1>

                {/* Animated Paragraph */}
                <motion.p
                    className="mx-auto mt-6 max-w-lg md:text-lg text-md text-[#475C7B]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                    We bring your ideas to life with cutting-edge technology, ensuring seamless and effective solutions.
                </motion.p>

                {/* Flip-down Button Animation */}
                <motion.div
                    className="mt-8 flex items-center justify-center gap-4"
                    initial={{ opacity: 0, rotateX: -90, transformOrigin: "top" }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0.13, 0.23, 1], delay: 0.8 }}
                >
                    <Button className="group relative overflow-hidden rounded-full bg-[#62BCEA] px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-[#4AA9DC]">
                        <Link href="/get-quote">
                            <span className="relative flex items-center gap-2">
                                Get Started
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Animated Icons */}
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: item.delay,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`md:flex hidden absolute items-center justify-center rounded-2xl bg-gradient-to-t from-[#62BCEA] to-[#62BCEA] ${item.className}`}
                >
                    {item.icon}
                </motion.div>
            ))}

        </section>
    );
}
