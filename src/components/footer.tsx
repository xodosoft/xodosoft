"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterXLine } from "@remixicon/react";
import Link from "next/link";
import { useServiceStore } from "@/store/useServices";

export default function Footer() {

    const { services } = useServiceStore();

    return (
        <footer className="bg-white text-gray-900 border-t border-gray-200">
            <div className="px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <div className="h-16 relative">
                        <Link href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Xodosoft Logo"
                                width={130}
                                height={130}
                                className="absolute bottom-0"
                            />
                        </Link>
                    </div>
                    <p className=" text-sm leading-relaxed mt-0">
                        Xodosoft specializes in web and app development, software solutions, UI/UX design, and digital marketing. We create innovative solutions to help businesses grow and thrive online.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">Our Services</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                        {
                            services && services.map(({ id, title }) => (
                                <li key={title}>
                                    <Link className="text-primary transition-colors hover:text-muted-foreground" href={`/services/${id}`}>{title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">Useful Links</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                        <li>
                            <Link className="text-primary transition-colors hover:text-muted-foreground" href="/">Home</Link>
                        </li>
                        <li>
                            <Link className="text-primary transition-colors hover:text-muted-foreground" href="/about">About</Link>
                        </li>
                        <li>
                            <Link className="text-primary transition-colors hover:text-muted-foreground" href="/career">Career</Link>
                        </li>
                        <li>
                            <Link className="text-primary transition-colors hover:text-muted-foreground" href="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link className="text-primary transition-colors hover:text-muted-foreground" href="/get-quote">Get Quote</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">Contant Info</h3>
                    <ul className="mt-2 space-y-4 text-sm">
                        <li className="flex items-start">
                            <span>
                                <MapPin className="mt-1 mr-3" />
                            </span>
                            <span>
                                Suite # 09, Mezzaine Floor,<br /> Marine Galleria Apartments, Plot # G-19 Kehkashan <br /> Clifton Block 9 Karachi
                            </span>
                        </li>
                        <li className="flex items-center">
                            <Phone className="mr-3" />
                            <span>
                                <a href="tel:02135305947">021-35305947</a>
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span><Mail className="mr-3" /></span>
                            <span>
                                <a href="mailto:xodosoft@gmail.com">xodosoft@gmail.com</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="px-4 md:px-6 lg:px-8 py-3 border-t border-gray-200">
                <div className="flex gap-2 flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">Copyright &copy; {new Date().getFullYear()} Xodosoft.</p>
                    <div className="inline-flex flex-wrap gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="https://www.linkedin.com/company/xodosoft/" target="_blank">
                                <RiLinkedinFill size={16} />
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <Link href="https://www.facebook.com/people/Xodosoft-SMC-Private-Limited/61576297983139/" target="_blank">
                                <RiFacebookFill size={16} />
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <Link href="https://x.com/xodosoft" target="_blank">
                                <RiTwitterXLine size={16} />
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <Link href="https://www.instagram.com/xodosoft/" target="_blank">
                                <RiInstagramFill size={16} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
