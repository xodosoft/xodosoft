'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { useServiceStore } from '@/store/useServices';
import { useRouter } from 'next/navigation';

export default function SingleSlideCarousel() {

    const [carouselKey, setCarouselKey] = useState(0);

    const { services } = useServiceStore();
    const router = useRouter();

    useEffect(() => {
        if (services.length > 0) {
            setCarouselKey(prev => prev + 1);
        }
    }, [services]);

    function handleClick(id: string) {
        router.push(`/services/${id}`);
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { axis: 'x', align: 'center', containScroll: 'trimSnaps' },
        [Autoplay({ delay: 3000, stopOnInteraction: false }), WheelGesturesPlugin({ forceWheelAxis: 'y' })],
    );
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="w-full">
            {/* Embla Carousel Wrapper */}
            <div key={carouselKey} className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {services.map(({ id, title, image, description }) => (
                        <Card key={id} className="embla__slide flex-none w-full shadow-none rounded-xl border-2 p-4 bg-white hover:bg-[#f8f9fa] cursor-pointer transition-colors me-2" onClick={() => handleClick(id)}>
                            <CardHeader className="relative aspect-video lg:h-80 lg:aspect-auto rounded-lg overflow-hidden">
                                <Image
                                    className="hover:scale-105 transition duration-300 object-cover"
                                    src={image}
                                    alt={title}
                                    fill
                                />
                            </CardHeader>
                            <CardContent className="px-0 pt-4">
                                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                                <CardDescription className="pt-2 text-md text-gray-600">{description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full border border-[#62BCEA] transition-all ${index === selectedIndex ? 'bg-[#62BCEA]' : 'bg-white'}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};
