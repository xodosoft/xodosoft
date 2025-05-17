"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import VerticalCarousel from "./vertical-carousel"
import { motion } from "framer-motion"
import HorizontalCarousel from "./horizontal-carousel"

export default function ServicesSection() {
    return (
        <section className="bg-white px-4 md:px-6 lg:px-8 py-16 overflow-hidden">
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Our Services
                </h2>
            </motion.div>

            <div className="grid lg:grid-cols-[3fr_2fr] grid-cols-1 gap-8">
                <div>
                    <motion.div
                        className="border-2 rounded-xl px-4 py-8 mb-4 flex relative overflow-hidden hover:bg-[#f8f9fa] transition-colors"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h1 className="text-2xl font-semibold mb-4">
                                Comprehensive ERP Solutions for Your Business Needs
                            </h1>
                            <p className="leading-relaxed md:w-[66%]">
                                We provide tailored <strong>ERP solutions</strong> designed to streamline operations across various industries.
                                Our software covers <strong>Textile Management, POS, Inventory Control, Accounting, and HR Management</strong>,
                                ensuring seamless business automation. Whether you need to optimize production, track sales, or manage finances,
                                our ERP systems enhance efficiency and scalability.
                            </p>
                        </div>
                        <Image
                            className="rounded-full hidden md:block w-[250px] h-[250px] object-cover absolute -end-[20px] -bottom-[50px]"
                            src='/images/services/erp.jpg'
                            alt='ERP softwares'
                            width={250}
                            height={250}
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <motion.div
                            className="border-2 rounded-xl px-4 py-8 sm:col-span-3 hover:bg-[#f8f9fa] transition-colors"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-semibold mb-4">Web Design & Development</h2>
                            <p className="leading-relaxed">
                                We craft stunning, user-friendly, and responsive websites that ensure optimal speed and seamless performance.
                                From corporate sites to e-commerce platforms, we deliver secure, scalable, and modern designs for an engaging user experience.
                            </p>
                        </motion.div>

                        <motion.div
                            className="border-2 rounded-xl px-4 py-8 sm:h-auto h-64 sm:col-span-2 flex gap-4 justify-center flex-col text-center items-center hover:bg-[#f8f9fa] transition-colors"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-semibold mb-4">Request a Quote Today</h2>
                            <Button className="group relative overflow-hidden rounded-full bg-[#62BCEA] px-6 py-6 text-md text-white transition-all hover:bg-[#4AA9DC]">
                                <Link href="/get-quote">
                                    <span className="relative flex items-center gap-2">
                                        Get Started
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                    viewport={{ once: true }}
                    className="hidden lg:block"
                >
                    <VerticalCarousel />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                    viewport={{ once: true }}
                    className="block lg:hidden"
                >
                    <HorizontalCarousel />
                </motion.div>
            </div>
        </section>
    )
}
