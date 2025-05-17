import { QuoteForm } from "@/components/quote-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Get a Quote - Xodosoft",
    description:
        "Contact Xodosoft to get a customized quote for your software, web, or app development project. We offer tailored digital solutions to match your business goals.",
    openGraph: {
        title: "Get a Quote - Xodosoft",
        description:
            "Contact Xodosoft to get a customized quote for your software, web, or app development project. We offer tailored digital solutions to match your business goals.",
        url: "https://xodosoft.com/get-quote",
        siteName: "Xodosoft",
        type: "website",
    },
};

export default function Page() {
    return (
        <section className="px-4 md:px-6 lg:px-8 py-16 mt-[65px]">
            <div className="mb-8">
                <h1 className="text-4xl mb-3 font-extrabold text-gray-900 leading-tight">
                    Request a Quote Today!
                </h1>
                <p>Have a project in mind? Get a customized solution tailored to your needs—let’s bring your ideas to life!</p>
            </div>
            <QuoteForm />
        </section >
    )
}