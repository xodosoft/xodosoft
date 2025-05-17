import AboutPageContent from '@/components/about-page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us - Xodosoft",
    openGraph: {
        title: "About Us - Xodosoft",
        description:
            "Discover Xodosoft — a visionary software agency driven by innovation, expertise, and a passion for redefining the digital landscape. We craft bespoke solutions, invest in cutting-edge technology, and empower businesses worldwide with impactful software, web, and app development services.",
        url: "https://xodosoft.com/about/",
        siteName: "Xodosoft",
        type: "website",
    },
};

export default function Page() {
    return (
        <section className='mt-[65px]'>

            {/* main content */}
            <AboutPageContent />

        </section >
    )
}