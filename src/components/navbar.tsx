import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { FaBars } from 'react-icons/fa6'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Icon from './icon'

const navItems: NavItemsProps[] = [
    { links: "Home", href: "/" },
    { links: "Tafseer Video", href: "/tafseer" },
    { links: "Dua", href: "/dua" },
    { links: "Islamic Books", href: "/islamic-books" },
    { links: "Article", href: "/article" },
    { links: "Q&A", href: "/q&a" },
    { links: "Contact", href: "/contact" },
];

const Navbar = () => {

    const pathname = usePathname();

    const [scroll, setScroll] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <nav
            className={cn(
                'dark:bg-background fixed z-[999] top-0 left-0 w-full',
                scroll ? 'bg-[#343434] shadow-lg' : ''
            )}
        >
            <div className="container flex justify-between items-center py-6">
                <div className="flex items-center gap-3">
                    <Icon />
                    <div>
                        <h4 className="text-white lg:text-xl text-lg font-bold lg:leading-none leading-none">Japan Dahwa</h4>
                        <h4 className="text-white lg:text-2xl text-base font-bold lg:leading-none leading-none">Foundation</h4>
                    </div>
                </div>
                <ul className="lg:flex items-center space-x-6 hidden">
                    {navItems.map((item) => (
                        <li key={item.links}>
                            <Link
                                href={item.href}
                                className={`text-white hover:text-gray-300 ${pathname === item.href ? 'border-b-2 border-white pb-2' : ''}`}
                            >
                                {item.links}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Button variant="outline" className="bg-transparent text-white rounded-full" asChild>
                            <Link href="/quiz">Take a Quiz</Link>
                        </Button>
                    </li>
                </ul>
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <FaBars className="text-xl text-background" />
                        </SheetTrigger>
                        <SheetContent className="bg-primary border-none text-background z-[999]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center text-start text-background mb-6 gap-2">
                                    <Icon />
                                    <div>
                                        <h4 className="text-lg font-bold leading-none">Japan Dahwa</h4>
                                        <h4 className="text-base font-bold leading-none">Foundation</h4>
                                    </div>
                                </SheetTitle>
                                <SheetDescription>
                                    <ul className="flex flex-col space-y-6 text-start text-background">
                                        {navItems.map((item) => (
                                            <li key={item.links}>
                                                <Link
                                                    href={item.href}
                                                    className={`hover:text-gray-300 ${pathname === item.href ? 'border-b-2 border-background pb-2' : ''}`}
                                                >
                                                    {item.links}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Button variant="outline" className="bg-transparent rounded-full w-full" asChild>
                                                <Link href="/quiz">Take a Quiz</Link>
                                            </Button>
                                        </li>
                                    </ul>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default memo(Navbar)