"use client"

import * as React from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
    images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [api, setApi] = React.useState<CarouselApi>()

    // Handle thumbnail click
    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index)
        api?.scrollTo(index)
    }

    // Update current index when carousel changes
    React.useEffect(() => {
        if (!api) return

        const handleSelect = () => {
            setCurrentIndex(api.selectedScrollSnap())
        }

        api.on("select", handleSelect)

        return () => {
            api.off("select", handleSelect)
            // Return void explicitly
            return undefined
        }
    }, [api])

    if (!images || images.length === 0) {
        return <div className="text-center py-10">No images available</div>
    }

    return (
        <div className="w-full space-y-4">
            {/* Main Carousel */}
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={"Product Image"}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-[#62BCEA] border-0 text-white" />
                <CarouselNext className="right-2 bg-[#62BCEA] border-0 text-white" />
            </Carousel>

            {/* Thumbnails */}
            <ScrollArea className="w-full">
                <div className="flex space-x-3 py-1 mb-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn("relative min-w-[100px] h-16 overflow-hidden rounded transition-all")}
                        >
                            <div
                                className={cn(
                                    "absolute top-0 start-0 w-full h-full bg-gray-900 z-10",
                                    currentIndex === index ? "opacity-0" : "opacity-25",
                                )}
                            ></div>
                            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
