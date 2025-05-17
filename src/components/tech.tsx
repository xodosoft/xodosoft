"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const technologies: Record<string, { name: string; icon: string }[]> = {
    Frontend: [
        { name: "ReactJS", icon: "/images/technologies/reactjs.svg" },
        { name: "VueJS", icon: "/images/technologies/vue.svg" },
        { name: "AngularJS", icon: "/images/technologies/angular.svg" },
        { name: "JavaScript", icon: "/images/technologies/javascript.svg" },
        { name: "CSS3", icon: "/images/technologies/css.svg" },
        { name: "HTML5", icon: "/images/technologies/html.svg" },
    ],
    Backend: [
        { name: "Node.js", icon: "/images/technologies/nodejs.svg" },
        { name: "Express.js", icon: "/images/technologies/express.svg" },
        { name: "Java", icon: "/images/technologies/java.svg" },
        { name: "PHP", icon: "/images/technologies/php.svg" },
        { name: "Python", icon: "/images/technologies/python.svg" },
        { name: ".Net", icon: "/images/technologies/dotnet.svg" },
    ],
    Framework: [
        { name: "Laravel", icon: "/images/technologies/laravel.svg" },
        { name: "NextJS", icon: "/images/technologies/nextjs.svg" },
        { name: "Django", icon: "/images/technologies/django.svg" },
        { name: "Flutter", icon: "/images/technologies/flutter.svg" },
    ],
    Database: [
        { name: "MongoDB", icon: "/images/technologies/mongodb.svg" },
        { name: "MySQL", icon: "/images/technologies/mysql.svg" },
        { name: "SQLite", icon: "/images/technologies/sqllite.svg" },
        { name: "SQL Server", icon: "/images/technologies/microsoftsqlserver.svg" },
        { name: "PostgreSQL", icon: "/images/technologies/postgresql.svg" },
        { name: "Firebase", icon: "/images/technologies/firebase.svg" },
    ],
    Cloud: [
        { name: "AWS", icon: "/images/technologies/aws.svg" },
        { name: "Azure", icon: "/images/technologies/azure.svg" },
    ],
    Ecommerce: [
        { name: "Shopify", icon: "/images/technologies/shopify.svg" },
        { name: "Magento", icon: "/images/technologies/magento.svg" },
        { name: "WooCommerce", icon: "/images/technologies/woocommerce.svg" },
    ],
    CMS: [
        { name: "WordPress", icon: "/images/technologies/wordpress.svg" },
        { name: "Joomla", icon: "/images/technologies/joomla.svg" },
    ],
};

const categories = Object.keys(technologies);

export default function TechSection() {
    const [selected, setSelected] = useState<string>(categories[0]);

    return (
        <section className="text-center bg-white px-4 md:px-6 lg:px-8 py-16">
            {/* Title Animation */}
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl"
            >
                Technologies and Platforms We Use
            </motion.h2>

            {/* Categories Buttons */}
            <motion.div
                className="pt-8 pb-12 flex flex-wrap justify-center gap-6 md:gap-12"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1, y: 0,
                        transition: { staggerChildren: 0.1, duration: 0.5 },
                    },
                }}
            >
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelected(category)}
                        className={`font-medium transition ${selected === category ? "text-[#62BCEA]" : "text-gray-600"}`}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {/* Tech Cards with Staggered Animation */}
            <motion.div
                key={selected}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                        opacity: 1, scale: 1,
                        transition: { staggerChildren: 0.1, duration: 0.4 },
                    },
                }}
                className="flex flex-wrap justify-center gap-6 md:gap-12"
            >
                {technologies[selected].map((tech) => (
                    <motion.div
                        key={tech.name}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="cursor-default hover:shadow-xl transition-all w-32 h-24 border rounded-md shadow flex flex-col items-center justify-center"
                    >
                        <Image src={tech.icon} alt={tech.name} width={40} height={40} className="mb-2" />
                        <span className="text-sm font-medium">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
