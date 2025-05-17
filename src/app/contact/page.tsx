import Contact from '@/components/contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Us - Xodosoft",
    openGraph: {
        title: "Contact Us - Xodosoft",
        description:
            "Get in touch with Xodosoft — your trusted partner for software development, web and app solutions, branding, and digital marketing. Need more information? Call us at 021-35305947 or email xodosoft@gmail.com. Visit our office at Suite # 09, Mezzanine Floor, Marine Galleria Apartments, Plot # G-19 Kehkashan, Clifton Block 9, Karachi. Let's build something innovative together!.",
        url: "https://xodosoft.com/contact/",
        siteName: "Xodosoft",
        type: "website",
    },
};

export default function Page() {
    return (
        <section className="bg-[#62BCEA] text-white px-4 md:px-6 lg:px-8 py-16 mt-[65px]">
            <Contact />
        </section>
    )
}

