"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "Can you integrate your software with existing systems?",
        answer: "Yes, we offer seamless integration with third-party tools, APIs, legacy systems, and other platforms to ensure unified data flow and smooth operational continuity.",
    },
    {
        question: "Do you offer support and maintenance?",
        answer: "Absolutely. We offer ongoing support, performance monitoring, bug fixes, and system updates post-deployment. Clients can choose from monthly or annual maintenance plans.",
    },
    {
        question: "How do you ensure the security of our data and information?",
        answer: "At Xodosoft, we ensure data security through encryption, access controls with MFA, secure development practices, regular audits, and strict confidentiality policies—protecting your data from development to deployment and beyond.",
    },
    {
        question: "Do you provide training or documentation for your solutions?",
        answer: "Yes, we provide comprehensive training and documentation, including tailored onsite or online sessions for users, technical training for IT teams, and video tutorials on request. Our team also offers ongoing support to ensure your team feels confident and fully equipped to use the solution from day one.",
    },
    {
        question: "Do you offer flexible payment plans or financing options?",
        answer: "Yes, we offer flexible payment options to suit your needs, including milestone-based payments, monthly installments, custom financing, and subscription models. Our goal is to make it easier for you to get started without compromising on quality or timelines.",
    }
];

export function FaqSection() {
    return (
        <section className="bg-gray-50 px-4 md:px-6 lg:px-8 py-16">
            <div className="mx-auto grid gap-8 md:grid-cols-2">
                {/* Left Section */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl"
                    >
                        Frequently Asked <br /> Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-600"
                    >
                        Can’t find the answer you’re looking for? <br />
                        Let’s talk!{" "}
                        <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                            Get in touch
                        </Link>.
                    </motion.p>
                </div>

                {/* Right Section - Accordion */}
                <div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map(({ question, answer }, index) => (
                            <motion.div
                                key={question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <AccordionItem
                                    value={question}
                                    className="bg-white p-2 rounded-xl shadow-md transition-transform transform hover:scale-[1.02]"
                                >
                                    <AccordionTrigger className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                        <div className="flex gap-3 items-center">
                                            <HelpCircle className="h-5 w-5 text-blue-500" />
                                            {question}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 leading-relaxed px-8">
                                        {answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
