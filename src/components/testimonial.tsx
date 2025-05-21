"use client";

import { useEffect } from "react";
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Furqan Ahmed",
        role: "Managing Director, Ahmed Corporation",
        image: "/images/testimonials/01.jpg",
        rating: 4.5,
        comment:
            "Xodosoft's tailored ERP transformed our textile operations. Excellent industry insight and seamless support throughout.",
    },
    {
        name: "Ali Khan",
        role: "Manager, Nisar Mart",
        image: "/images/testimonials/06.jpg",
        rating: 4.5,
        comment:
            "Xodosoft’s POS transformed our retail operations—fast, reliable, and user-friendly, exceeding all expectations.",
    },
    {
        name: "Mansha Malik",
        role: "Director, Malik & Brothers",
        image: "/images/testimonials/02.jpg",
        rating: 4,
        comment:
            "Xodosoft's logistics solution improved our workflows. Their expertise and commitment delivered truly impressive results.",
    },
    {
        name: "Sara Khan",
        role: "Director, Bling Development UAE",
        image: "/images/testimonials/03.jpg",
        rating: 5,
        comment:
            "Xodosoft delivered a sleek, high-performance website that perfectly reflects our brand and exceeded expectations.",
    },
    {
        name: "Muhammed Rizwan",
        role: "Manager, Indus Towel",
        image: "/images/testimonials/04.jpg",
        rating: 4.8,
        comment:
            "Xodosoft’s customized ERP fit our textile needs perfectly. Their expertise and professionalism were truly outstanding.",
    },
    {
        name: "Anas Jawed",
        role: "Director, SME Powers, UK",
        image: "/images/testimonials/05.jpg",
        rating: 3.8,
        comment:
            "Xodosoft crafted a strong brand identity and sleek website, perfectly capturing our vision with expert precision.",
    },
];


const Rating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) => {
            const index = i + 1;
            return (
                <span key={i}>
                    {index <= Math.floor(rating) ? (
                        <Star className="w-5 h-5" fill="currentColor" />
                    ) : rating > i && rating < index + 1 ? (
                        <StarHalf className="w-5 h-5" fill="currentColor" />
                    ) : (
                        <StarOutline className="text-gray-300 w-5 h-5" />
                    )}
                </span>
            );
        })}
    </div>
);

export default function TestimonialSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: "auto",
        breakpoints: {
            "(min-width: 640px)": { slidesToScroll: 2 },
            "(min-width: 1024px)": { slidesToScroll: 3 },
        },
    });

    useEffect(() => {
        if (!emblaApi) return;
        const play = () => emblaApi.scrollNext();
        const interval = setInterval(play, 10000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <section className="bg-[#62BCEA] px-4 md:px-6 py-16">
            {/* Title Animation */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl"
            >
                What Our Clients Say
            </motion.h2>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-none w-full sm:w-1/2 lg:w-1/3 flex me-4" // Add `flex` here
                        >
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-left border border-gray-200 dark:border-gray-700 flex-1 flex flex-col"> {/* Add `flex-1` and `flex-col` here */}
                                <Rating rating={testimonial.rating} />

                                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm italic flex-1"> {/* Add `flex-1` here */}
                                    {testimonial.comment}
                                </p>

                                <div className="mt-5 flex items-center gap-3">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full border border-gray-300"
                                    />
                                    <div>
                                        <h3 className="text-sm font-semibold">{testimonial.name}</h3>
                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
