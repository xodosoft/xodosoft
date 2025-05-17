"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { pricingPlans } from "@/utils/pricing-data"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

type PlanTab = "logo" | "informative-website" | "ecommerce-website" | "seo"

export default function PricingCards() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [selectedTab, setSelectedTab] = useState<PlanTab>("logo");
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    }

    const tabContentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.15,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    const tabs: PlanTab[] = ["logo", "informative-website", "ecommerce-website", "seo"]

    return (
        <section className="bg-gray-50 px-4 md:px-6 lg:px-8 py-16" id="pricing" ref={sectionRef}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-7xl mx-auto"
            >
                <motion.div className="text-center mb-6" variants={itemVariants}>
                    <h2 className="text-4xl font-bold mb-8">Suitable Plans</h2>
                </motion.div>

                <Tabs defaultValue="logo" className="w-full" onValueChange={(value) => setSelectedTab(value as PlanTab)}>
                    <motion.div variants={itemVariants}>
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto mb-6 lg:max-w-4xl mx-auto">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    className="data-[state=active]:bg-[#62BCEA] py-2 data-[state=active]:text-white whitespace-normal h-full transition-all duration-300"
                                    value={tab}
                                >
                                    {tab
                                        .split("-")
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </motion.div>

                    {tabs.map((tabValue) => (
                        <TabsContent key={tabValue} value={tabValue}>
                            <motion.div
                                key={selectedTab}
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Carousel>
                                    <CarouselContent className="-ml-2 md:-ml-4">
                                        {pricingPlans[tabValue].map((plan, index) => (
                                            <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
                                                <motion.div variants={cardVariants} custom={index}>
                                                    <Card className="h-full">
                                                        <CardHeader className="text-center pt-8">
                                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#475C7B] text-white flex items-center justify-center">
                                                                {plan.icon}
                                                            </div>
                                                            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                                        </CardHeader>
                                                        <h3 className="text-xl font-light mb-2 text-center bg-[#475C7B] text-white py-5 px-2 uppercase">
                                                            Call for Price
                                                        </h3>
                                                        <CardContent className="pt-6">
                                                            <ScrollArea className="h-72 pe-4">
                                                                <ul className="space-y-4">
                                                                    {plan.features.map((feature, i) => (
                                                                        <li key={i} className="flex items-start gap-2">
                                                                            <div className="w-2 h-2 rounded-full bg-[#62BCEA] flex-shrink-0 mt-2" />
                                                                            <span className="text-sm leading-relaxed">{feature}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </ScrollArea>
                                                        </CardContent>
                                                        <CardFooter className="pt-6">
                                                            <Button asChild className="w-full bg-[#62BCEA] hover:bg-[#62BCEA]/90">
                                                                <Link href={"/get-quote"}>Get Started</Link>
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </motion.div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>
        </section>
    )
}