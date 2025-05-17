"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
    { icon: "/expertise.svg", title: "Deep Industry Focus", description: "From textile ERP to fast-paced retail and restaurant POS systems, our platforms are purpose-built for industry-specific challenges and scalability." },
    { icon: "/attention.svg", title: "End-to-End Digital Expertise", description: "Whether its enterprise software, mobile apps, e-commerce, or UI/UX, we bring holistic, future-ready solutions under one roof." },
    { icon: "/communication.svg", title: "Cloud-First Performance-Driven", description: "Our platforms are cloud-optimized and engineered for speed, security, and real-time intelligence—helping your business run smarter, faster, and with precision." },
    { icon: "/service.svg", title: "A Partner You Can Trust", description: "Beyond development, we stand by your side—with dedicated support, seamless integrations, and a long-term view on growth and innovation." }
];

export default function WhyChooseUs() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl text-center mb-8">
                Why Choose Xodosoft
            </h1>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
                {features.map(({ icon, title, description }, index) => (
                    <motion.div
                        key={title}
                        className="relative p-6 bg-[#62BCEA] text-white rounded-xl cursor-pointer shadow-md"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="bg-white rounded-full p-3 shadow-md mr-4 flex items-center justify-center h-16 w-16">
                                <Image
                                    src={icon || "/placeholder.svg"}
                                    alt={title}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-semibold tracking-wider text-white">{title}</h3>
                        </div>
                        <p className="leading-relaxed">{description}</p>
                    </motion.div>
                ))}
            </div>
        </div >
    );
}
