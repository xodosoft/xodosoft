"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
}

export default function StatisticsCounter() {
    return (
        <div className="py-16 px-4 md:px-6 lg:px-8 bg-[#62BCEA]">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-center text-4xl font-bold mb-12"
            >
                Our Impact
            </motion.h2>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                <CounterCard targetNumber={50} label="Projects Completed" icon="🚀" />
                <CounterCard targetNumber={30} label="Happy Clients" icon="😊" />
                <CounterCard targetNumber={99.8} label="Satisfaction Rate" icon="⭐" suffix="%" decimal={1} />
                <CounterCard targetNumber={3} label="Years Experience" icon="🏆" />
            </motion.div>
        </div>
    )
}

interface CounterCardProps {
    targetNumber: number
    label: string
    icon: string
    suffix?: string
    decimal?: number
}

function CounterCard({ targetNumber, label, icon, suffix = "", decimal = 0 }: CounterCardProps) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    useEffect(() => {
        if (isInView) {
            const duration = 2000 // 2 seconds
            const startTime = Date.now()

            const animateCount = () => {
                const now = Date.now()
                const progress = Math.min((now - startTime) / duration, 1)

                // Use easeOutExpo for a nice deceleration effect
                const easeOutExpo = (x: number): number => {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
                }

                const easedProgress = easeOutExpo(progress)
                setCount(easedProgress * targetNumber)

                if (progress < 1) {
                    requestAnimationFrame(animateCount)
                }
            }

            requestAnimationFrame(animateCount)
        }
    }, [isInView, targetNumber])

    const formatNumber = (num: number) => {
        return num.toFixed(decimal).padStart(2, "0")
    }

    return (
        <motion.div
            ref={ref}
            variants={item}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                },
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center transform-gpu cursor-pointer"
        >
            <motion.div
                className="text-4xl mb-4"
                whileHover={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.5 },
                }}
            >
                {icon}
            </motion.div>
            <motion.div
                className="text-5xl font-bold text-gray-800 mb-2 flex justify-center items-baseline"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <motion.span>{formatNumber(count)}</motion.span>
                {suffix && <span className="ml-1">{suffix}</span>}
            </motion.div>
            <motion.div
                className="text-gray-600 font-medium"
                whileHover={{ color: "#49C9F2" }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.div>
        </motion.div>
    )
}

