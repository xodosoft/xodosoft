"use client"

import { useState, useRef } from "react"

interface ValueCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
    const [isHovering, setIsHovering] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const [rotation, setRotation] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()

        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        // Reduced rotation amount for smaller cards
        const rotateY = (x / (rect.width / 2)) * 8
        const rotateX = -(y / (rect.height / 2)) * 8

        setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setRotation({ x: 0, y: 0 })
    }

    return (
        <div
            ref={cardRef}
            className="bg-white p-6 rounded-xl overflow-hidden transition-all duration-200 ease-out flex flex-col h-full w-full"
            style={{
                transform: isHovering
                    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
                    : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
                boxShadow: isHovering
                    ? `0 20px 40px rgba(0, 0, 0, 0.1), 
             ${-rotation.y / 2}px ${-rotation.x / 2}px 20px rgba(0, 0, 0, 0.05)`
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>

            {/* Subtle light reflection effect */}
            <div
                className="absolute inset-0 opacity-0 bg-white rounded-full blur-xl transition-opacity duration-200"
                style={{
                    opacity: isHovering ? 0.1 : 0,
                }}
            />
        </div>
    )
}

