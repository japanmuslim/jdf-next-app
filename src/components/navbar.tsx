import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { FaBars } from 'react-icons/fa6';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Icon from './icon';
import { useRouter } from 'next/router';

const navItems: NavItemsProps[] = [
  { links: 'Home', href: '/' },
  { links: 'Tafseer Video', href: '/tafseer' },
  { links: 'Dua', href: '/dua' },
  { links: 'Islamic Books', href: '/islamic-books' },
  { links: 'Article', href: '/article' },
  // { links: "Q&A", href: "/q&a" },
  // { links: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { pathname } = useRouter();

  const [scroll, setScroll] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // console.log(pathname.startsWith('/article'));

  const handleActive = (href: string) => {
    if (pathname === href) {
      return 'border-b-2 border-white pb-2';
    }

    if (href === '/article' && pathname.startsWith('/article')) {
      return 'border-b-2 border-white pb-2';
    }

    return '';
  };

  return (
    <nav
      className={cn(
        'dark:bg-background fixed z-[99] top-0 left-0 w-full',
        scroll && '!bg-[#343434] shadow-lg',
        !scroll &&
          (pathname === '/tafseer' ||
            pathname === '/dua' ||
            pathname.startsWith('/article')) &&
          'md:bg-gradient-to-b from-black to-transparent bg-primary',
        pathname.startsWith('/article') && scroll
          ? 'bg-[#343434] shadow-lg'
          : 'md:bg-transparent bg-[#343434] !block',
      )}
    >
      <div className="container flex justify-between items-center py-6">
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-105 duration-300 transition-all"
        >
          <Icon className="md:h-14 md:w-14 h-10 w-10" />
          <div>
            <h4 className="text-white lg:text-xl md:text-xl text-lg font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-normal">
              Japan Dahwa
            </h4>
            <h4 className="text-white lg:text-2xl md:text-2xl text-xl font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-wider">
              Foundation
            </h4>
          </div>
        </Link>
        <ul className="lg:flex items-center space-x-6 hidden">
          {navItems.map((item) => (
            <li key={item.links}>
              <Link
                href={item.href}
                className={`hover:text-gray-300 ${handleActive(item.href)}`}
              >
                {item.links}
              </Link>
            </li>
          ))}
          <li>
            <Button
              variant="outline"
              className={`bg-transparent text-white rounded-full ${pathname === '/quiz' ? 'bg-white text-primary' : ''}`}
              asChild
            >
              <Link href="/quiz">Take a Quiz</Link>
            </Button>
          </li>
        </ul>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="mt-2">
              <FaBars className="text-background text-lg" />
            </SheetTrigger>
            <SheetContent className="bg-primary border-none text-background z-[999]">
              <SheetHeader>
                <SheetTitle className="flex items-center text-start text-background mb-6 gap-2">
                  <Icon className="md:h-14 md:w-14 h-10 w-10" />
                  <div>
                    <h4 className="text-white lg:text-xl md:text-xl text-lg font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-normal">
                      Japan Dahwa
                    </h4>
                    <h4 className="text-white lg:text-2xl md:text-2xl text-xl font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-wider">
                      Foundation
                    </h4>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <ul className="flex flex-col space-y-4 text-start text-background">
                    {navItems.map((item) => (
                      <li key={item.links}>
                        <Link
                          href={item.href}
                          className={`hover:text-gray-300 ${handleActive(item.href)}`}
                        >
                          {item.links}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Button
                        variant="outline"
                        className="bg-transparent rounded-full w-full mt-4"
                        asChild
                      >
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
  );
};

export default memo(Navbar);
