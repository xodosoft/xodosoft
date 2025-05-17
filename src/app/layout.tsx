import { Lexend } from 'next/font/google'
import type { Metadata } from 'next'
import "./globals.css";
import { Toaster } from "sonner";
import ClientLayout from "@/components/client-layout";

const lexend = Lexend({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800",],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Xodosoft - Web, App & Custom Software Development Agency",
  description:
    "Xodosoft is a full-service digital agency offering web and app development, custom software solutions, UI/UX design, branding, SEO, graphic design, and more. Let's build your next big idea.",
  keywords: [
    "Xodosoft",
    "software development",
    "web development",
    "app development",
    "UI/UX design",
    "custom software",
    "branding",
    "SEO services",
    "graphic design",
    "video animation",
    "social media marketing",
  ],
  openGraph: {
    title: "Xodosoft - Software Development & Creative Agency",
    description:
      "Full-service digital agency delivering custom software, websites, mobile apps, branding, and marketing solutions.",
    url: "https://xodosoft.com/",
    siteName: "Xodosoft",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={lexend.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster
          toastOptions={{
            style: {
              fontFamily: 'Lexend, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
