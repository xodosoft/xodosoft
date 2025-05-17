import JobListings from '@/components/job-list'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "Careers - Xodosoft",
    openGraph: {
        title: "Careers - Xodosoft",
        description:
            "Explore career opportunities at Xodosoft, a leading software agency offering innovation, growth, and a dynamic work culture. Join our diverse team and take your career to new heights in the tech industry!",
        url: "https://xodosoft.com/career/",
        siteName: "Xodosoft",
        type: "website",
    },
};

export default function Page() {
    return (
        <section className="bg-white px-4 md:px-6 lg:px-8 py-16 mt-[65px]">
            <div className='grid md:grid-cols-2 gap-8'>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    Meet the team work
                    <br />
                    behind our success
                </h1>
                <p className="text-gray-600 text-md leading-relaxed flex items-center">
                    Our team is driven by passion and innovation.
                    We tackle challenges with expertise, ensuring top-notch solutions
                    for our clients. Our talented professionals are dedicated, skilled,
                    and committed to excellence.
                </p>
            </div>
            <div className='relative h-auto lg:h-[500px] aspect-video lg:aspect-auto mt-8 overflow-hidden rounded-xl'>
                <Image src="/images/team.jpg" loading='eager' className='object-cover h-full w-full' alt='Team' fill />
            </div>
            <JobListings />
            <h1 className="mt-12 mb-8 text-4xl text-center font-bold text-gray-900 leading-tight">We’re always looking for talented individuals.</h1>
            <div
                className="w-full px-8 md:py-11 py-8 rounded-xl flex gap-8 flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-[#62BCEA] hover:bg-[#4AA9DC] transition-colors cursor-pointer"
            >
                <h1 className="text-white font-bold lg:text-5xl md:text-4xl text-3xl">
                    Ready to work with us?
                </h1>
                <Button className="group relative overflow-hidden rounded-full bg-white px-8 py-6 md:text-lg text-md text-[#62BCEA] transition-all hover:bg-gray-50">
                    <Link href="/career/apply">
                        <span className="relative flex items-center gap-2">
                            Apply Now
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </Button>
            </div>
        </section>
    )
}