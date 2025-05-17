"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";

export default function ContactFormSection() {
    return (
        <section className="bg-white px-4 md:px-6 lg:px-8 py-16">

            {/* Heading Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
                <p className="text-gray-600 mt-2">Have a question or want to work together? Drop us a message!</p>
            </motion.div>

            <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-2">

                {/* Google Map with Slide-in Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.072015929785!2d67.0362873!3d24.827210700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d006f504e5b%3A0x2e5a1e8f9b44c7dd!2sXodosoft!5e0!3m2!1sen!2s!4v1747467730073!5m2!1sen!2s"
                        className="w-full h-full min-h-[400px]"
                        allowFullScreen
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>

                {/* Contact Form with Slide-in Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <ContactForm />
                </motion.div>

            </div>
        </section>
    )
}
