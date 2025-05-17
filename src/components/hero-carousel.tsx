"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CarouselProps = {
    items: {
        id: string | number
        image: string
        heading: string
        subHeading: string
    }[]
    autoPlayInterval?: number
    aspectRatio?: string
}

export default function HeroCarousel({
    items,
    autoPlayInterval = 5000,
    aspectRatio = "aspect-[16/12] md:aspect-[16/9] lg:aspect-[24/9]",
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, [items.length])

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    }, [items.length])

    // Auto play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(goToNext, autoPlayInterval)
        return () => clearInterval(interval)
    }, [goToNext, isAutoPlaying, autoPlayInterval])

    // Pause auto play on hover
    const pauseAutoPlay = () => setIsAutoPlaying(false)
    const resumeAutoPlay = () => setIsAutoPlaying(true)

    return (
        <div className="relative w-full overflow-hidden" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay}>
            <div className={cn("relative w-full", aspectRatio)}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "absolute inset-0 w-full transition-opacity duration-500",
                            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
                        )}
                    >
                        <div
                            className={cn("relative h-full w-full", aspectRatio)}
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="h-full w-full bg-black/40 flex flex-col justify-end">
                                <div className="w-full text-white px-4 md:px-16 py-8 md:py-16">
                                    <h2 className="mb-2 text-lg lg:text-2xl font-medium">{item.heading}</h2>
                                    <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-5xl">{item.subHeading}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "h-2 w-2 rounded-full transition-all",
                            index === currentIndex ? "bg-white w-4" : "bg-white/50",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

