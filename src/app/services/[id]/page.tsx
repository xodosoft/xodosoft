import WhyChooseUs from "@/components/choose-us"
import { Metadata } from "next"
import HeroCarousel from "@/components/hero-carousel"
import ServiceDetails from "@/components/service-details"

export const metadata: Metadata = {
    title: 'Services - Xodosoft'
}

const carouselItems = [
    {
        id: 1,
        image: "/images/carousel/01.jpg",
        heading: "Elevate Your Business",
        subHeading: "With Our Expert Services",
    },
    {
        id: 2,
        image: "/images/carousel/02.jpg",
        heading: "Build Smarter, Scale Faster",
        subHeading: "With Our Tech Expertise",
    },
    {
        id: 3,
        image: "/images/carousel/03.jpg",
        heading: "Software That Delivers Results",
        subHeading: "You Can Measure",
    },
]

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <section className="mt-[65px] pb-16">
            <HeroCarousel items={carouselItems} />
            <ServiceDetails serviceId={id} />
            <div className="px-4 md:px-6 lg:px-8">
                <WhyChooseUs />
            </div>
        </section>
    )
}