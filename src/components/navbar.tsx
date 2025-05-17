"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { AlignJustify, ArrowUpRight } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiLinkedinFill, RiFacebookFill, RiTwitterXLine, RiInstagramFill } from "@remixicon/react"
import { Separator } from "./ui/separator"
import { usePathname } from "next/navigation"
import { useServiceStore } from "@/store/useServices"
import React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCategoryStore } from "@/store/useCategory"

export function Navbar() {

    const { services } = useServiceStore();

    const { categories, fetchCategories } = useCategoryStore();

    const [scrolled, setScrolled] = useState(false);

    const path = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => { fetchCategories() }, [])

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
                scrolled ? "border-border" : "border-transparent",
            )}>

            <div className="flex h-16 items-center justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="md:hidden"
                            variant="outline"
                            size="icon"
                        >
                            <AlignJustify />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <SheetHeader className="text-left">
                            <SheetTitle>Main Menu</SheetTitle>
                        </SheetHeader>
                        <Separator />
                        <div className="flex flex-col flex-grow">
                            <nav className="space-y-4 mt-4">
                                <SheetClose asChild>
                                    <Link
                                        href="/"
                                        className={`block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent ${path === "/" ? "text-primary" : "text-muted-foreground"}`}
                                    >
                                        Home
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="/about"
                                        className={`block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent ${path === "/about" ? "text-primary" : "text-muted-foreground"}`}
                                    >
                                        About
                                    </Link>
                                </SheetClose>
                                <NavigationMenu orientation="vertical">
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className={`text-sm font-medium h-auto px-3 py-2 bg-transparent hover:bg-accent hover:text-primary justify-start ${path.includes("/services") ? "text-primary" : "text-muted-foreground"}`}>
                                                Services
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="min-w-64">
                                                <ul className="w-full p-2 space-y-2">
                                                    {services && services.map(({ id, title }) => (
                                                        <li key={title}>
                                                            <NavigationMenuLink asChild>
                                                                <SheetClose asChild>
                                                                    <a
                                                                        href={`/services/${id}`}
                                                                        className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
                                                                    >
                                                                        {title}
                                                                    </a>
                                                                </SheetClose>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                                <SheetClose asChild>
                                    <Link
                                        href="/career"
                                        className={`block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent ${path === "/career" ? "text-primary" : "text-muted-foreground"}`}
                                    >
                                        Career
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href="/contact"
                                        className={`block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent ${path === "/contact" ? "text-primary" : "text-muted-foreground"}`}
                                    >
                                        Contact
                                    </Link>
                                </SheetClose>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <span className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                                            Projects
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                            {
                                                categories && categories.filter((c) => c.projects.length > 0).map(({ id, name, projects }) => (
                                                    <DropdownMenuSub key={id}>
                                                        <DropdownMenuSubTrigger className="py-2">{name}</DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent className="w-56">
                                                                {projects.map(({ id, title }) => (
                                                                    <DropdownMenuItem asChild key={id}>
                                                                        <SheetClose asChild>
                                                                            <a href={`/projects/${id}`}>{title}</a>
                                                                        </SheetClose>
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                ))
                                            }
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </nav>
                        </div>
                        <SheetFooter className="mt-auto">
                            <div className="w-full">
                                <h5 className="text-sm font-medium mb-2">Follow Us:</h5>
                                <div className="flex justify-center gap-2">
                                    <Button variant="outline" size="icon" asChild>
                                        <Link
                                            href="https://www.linkedin.com/company/xodosoft/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <RiLinkedinFill size={16} />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <Link href="https://www.facebook.com/people/Xodosoft-SMC-Private-Limited/61576297983139/" target="_blank" rel="noopener noreferrer">
                                            <RiFacebookFill size={16} />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <Link
                                            href="https://x.com/xodosoft"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <RiTwitterXLine size={16} />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <Link
                                            href="https://www.instagram.com/xodosoft/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <RiInstagramFill size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={130}
                        height={130}
                    />
                </Link>

                <nav className="hidden md:flex items-center">
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                        About
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground h-auto px-3 py-2 bg-transparent">Services</NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-64">
                                    {
                                        services && services.map(({ id, title }) => (
                                            <NavigationMenuLink asChild key={title}>
                                                <a href={`/services/${id}`} className="group grid h-auto text-nowrap items-center justify-start gap-1 rounded-md bg-background py-2 px-4 hover:bg-accent">
                                                    <div className="text-sm font-medium mb-1">{title}</div>
                                                </a>
                                            </NavigationMenuLink>
                                        ))
                                    }
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                                Projects
                                <ArrowUpRight size={13} />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                {
                                    categories && categories.filter((c) => c.projects.length > 0).map(({ id, name, projects }) => (
                                        <DropdownMenuSub key={id}>
                                            <DropdownMenuSubTrigger className="py-2">{name}</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="w-56">
                                                    {projects.map(({ id, title }) => (
                                                        <DropdownMenuItem asChild key={id}>
                                                            <a href={`/projects/${id}`}>{title}</a>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    ))
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/career" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                        Career
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3">
                        Contact
                    </Link>
                </nav>

                <Button size="sm" className="bg-[#62BCEA] text-primary-foreground hover:bg-[#4AA9DC]">
                    <Link href="/get-quote">
                        Get Started
                    </Link>
                </Button>

            </div>
        </header>
    )
}

