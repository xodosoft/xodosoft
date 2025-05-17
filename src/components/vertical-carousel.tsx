'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { useServiceStore } from '@/store/useServices';
import { useRouter } from 'next/navigation';

export default function VerticalCarousel() {

    const [carouselKey, setCarouselKey] = useState(0);

    const { services } = useServiceStore();
    const router = useRouter();

    function handleClick(id: string) {
        router.push(`/services/${id}`);
    }

    useEffect(() => {
        if (services.length > 0) {
            setCarouselKey(prev => prev + 1);
        }
    }, [services]);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { axis: 'y' },
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
        <div className="flex items-center">
            <div key={carouselKey} className="embla w-full h-[575px] overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex flex-col h-full">
                    {services.map(({ id, title, image, description }) => (
                        <Card key={id} className='embla__slide shadow-none flex-none mb-4 rounded-xl border-2 p-4 bg-white cursor-pointer hover:bg-[#f8f9fa] transition-colors' onClick={() => handleClick(id)}>
                            <CardHeader className="relative aspect-video lg:h-80 lg:aspect-auto rounded-lg overflow-hidden">
                                <Image
                                    className="hover:scale-105 transition duration-300 object-cover"
                                    src={image}
                                    alt={title}
                                    fill
                                />
                            </CardHeader>
                            <CardContent className='px-0 py-4'>
                                <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
                                <CardDescription className='pt-2 text-md text-gray-600'>{description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center ml-4 space-y-2">
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
