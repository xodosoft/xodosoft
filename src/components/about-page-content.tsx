"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Search, Rocket, Flame, Handshake, Lightbulb, Trophy } from "lucide-react";
import { ValueCard } from "./value-card";
import WhyChooseUs from "./choose-us";

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const content = [
    {
        icon: <Search size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Boundless Innovation",
        description: "We reimagine what's possible to shape the future of technology.",
    },
    {
        icon: <Rocket size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Relentless Customer Focus",
        description: "Every solution begins with listening, understanding, and delivering measurable impact.",
    },
    {
        icon: <Flame size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Integrity at Every Step",
        description: "We lead with trust, transparency, and uncompromising ethical standards.",
    },
    {
        icon: <Handshake size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Engineering with Purpose",
        description: "Our code drives clarity, performance, and business transformation.",
    },
    {
        icon: <Lightbulb size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Empowering Collaboration",
        description: "We cultivate shared intelligence to build smarter, faster, and better-together.",
    },
    {
        icon: <Trophy size={48} className="text-[#62BCEA] mx-auto mb-4" />,
        title: "Excellence as a Standard",
        description: "From UI to infrastructure, we pursue perfection in every detail.",
    },
]


export default function AboutPageContent() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 px-4 md:px-6 lg:px-8 items-center">
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h6
                        className="text-[#62BCEA] pb-2 text-lg font-bolder"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        About Us
                    </motion.h6>

                    <motion.h1
                        className="text-4xl font-extrabold text-gray-900 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Want To Know
                        <span className="block text-gray-400">About Xodosoft</span>
                    </motion.h1>

                    <motion.p
                        className="text-md text-gray-600 my-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Welcome to Xodosoft, where innovation powers possibility and every idea finds its digital expression! As a next-generation software company, Xodosoft is purpose-built to help businesses navigate the path of digital transformation with speed and confidence. From scalable cloud platforms to enterprise-grade systems and immersive digital experiences, we design and develop powerful solutions that reshape industries—from manufacturing and e-commerce to retail, hospitality, and beyond.
                    </motion.p>

                    <motion.p
                        className="text-md text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        At Xodosoft, problem-solving is in our DNA. Whether we&#39;re building intelligent, cloud-based POS platforms for dynamic retail operations or engineering custom ERP systems for the textile industry, our work is defined by purpose, performance, and scalability.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="relative h-auto lg:h-[500px] aspect-video lg:aspect-auto shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <Image
                        src="/images/about2.jpg"
                        alt="About Us"
                        className="rounded-xl object-cover w-full h-full"
                        fill
                    />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16 px-4 md:px-6 lg:px-8 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-4xl cursor-pointer font-extrabold flex gap-2 items-center text-gray-800 leading-tight group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Our Vision
                        <ArrowUpRight
                            size={32}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </motion.h1>

                    <motion.p
                        className="text-md text-gray-600 mt-4 leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        To be a global leader in innovative software solutions, empowering businesses to thrive in a rapidly evolving digital landscape. We envision a future where technology seamlessly transforms challenges into opportunities, driving sustainable growth and lasting impact.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="relative h-auto lg:h-[300px] aspect-video lg:aspect-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >

                    <Image
                        src="/images/vision.jpg"
                        alt="About Us"
                        className="rounded-xl object-cover h-full w-full"
                        fill
                    />
                </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16 px-4 md:px-6 lg:px-8 items-start">
                <motion.div
                    className="relative h-auto lg:h-[300px] aspect-video lg:aspect-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >

                    <Image
                        src="/images/mission.webp"
                        alt="About Us"
                        className="rounded-xl object-cover h-full w-full"
                        fill
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-4xl cursor-pointer font-extrabold flex gap-2 items-center text-gray-800 leading-tight group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Our Mission
                        <ArrowUpRight
                            size={32}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </motion.h1>

                    <motion.p
                        className="text-md text-gray-600 mt-4 leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        At Xodosoft, our mission is to deliver cutting-edge, scalable software and digital experiences that enable organizations to operate with agility, efficiency, and intelligence. We are committed to continuous innovation, investing in talent and technology to solve complex business challenges, elevate user experiences, and create enduring value for our clients worldwide.
                    </motion.p>
                </motion.div>
            </div>

            <div className="text-center bg-[#62BCEA] text-white py-16 px-4 md:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-8">Our Core Values</h2>
                    <p className="md:max-w-3xl mx-auto leading-relaxed">
                        At Xodosoft, our values are the foundation of everything we create, build, and deliver. These six guiding principles define who we are—and how we drive meaningful outcomes for every client, every time.
                    </p>
                </div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {content.map(({ icon, title, description }) => (
                        <motion.div key={title} variants={cardVariants} className="flex">
                            <ValueCard icon={icon} title={title} description={description} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="px-4 md:px-6 lg:px-8 py-16">
                <WhyChooseUs />
            </div>
        </>
    )
}
