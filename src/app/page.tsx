import AboutSection from "@/components/about-us";
import CallToAction from "@/components/call-to-action";
import ContactFormSection from "@/components/contact-form-section";
import { FaqSection } from "@/components/faqs";
import Hero from "@/components/hero-section";
import PricingCards from "@/components/pricing";
import ProductShowcase from "@/components/product-showcase";
import ServicesSection from "@/components/services";
import StatisticsCounter from "@/components/statistics-counter";
import TechSection from "@/components/tech";
import TestimonialSlider from "@/components/testimonial";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Xodosoft"
};

export default function Page() {
  return (
    <>
      {/* hero section */}
      <Hero />

      {/* technologies */}
      <TechSection />

      {/* about us section */}
      <AboutSection />

      {/* statistics counter */}
      <StatisticsCounter />

      {/* services */}
      <ServicesSection />

      {/* pricing */}
      <PricingCards />

      {/* products */}
      <ProductShowcase />

      {/* call to action */}
      <CallToAction text="Ready to work with us?" />

      {/* faqs */}
      <FaqSection />

      {/* testimonials */}
      <TestimonialSlider />

      {/* contant form */}
      <ContactFormSection />
    </>
  )
}