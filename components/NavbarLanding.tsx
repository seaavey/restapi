'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_LINKS = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('hero');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            },
        );

        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled ? 'py-2' : 'py-4'
            }`}
        >
            <nav
                className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-6 backdrop-blur-xl transition-all duration-300 ${
                    scrolled
                        ? 'bg-background/70 border-border/40 shadow-[0_4px_20px_rgba(0,0,0,0.12)]'
                        : 'bg-background/20 border-border/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
                }`}
            >
                <Link
                    href="/"
                    className={`text-xl font-semibold tracking-wide transition-all duration-300 ${
                        scrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'
                    }`}
                >
                    Seaavey
                </Link>

                <div className="hidden items-center space-x-8 md:flex">
                    {NAV_LINKS.map(link => (
                        <li
                            key={link.href}
                            className={`cursor-pointer list-none text-sm transition-colors duration-300 ${
                                activeSection === link.id
                                    ? 'text-primary font-medium'
                                    : 'text-foreground/70 hover:text-primary'
                            }`}
                            onClick={() => {
                                document.getElementById(link.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            {link.name}
                        </li>
                    ))}
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    <ThemeToggle />
                    <Button
                        className="bg-primary/90 hover:bg-primary rounded-md px-5 py-1.5 text-sm shadow-sm transition-all duration-300 hover:shadow-lg active:scale-[0.97]"
                        href="/docs"
                    >
                        Try It
                    </Button>
                </div>

                <button
                    className="text-foreground z-50 cursor-pointer md:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <div className="flex w-6 flex-col gap-[5px]">
                        <span className="bg-foreground h-0.5 w-full"></span>
                        <span className="bg-foreground h-0.5 w-full"></span>
                        <span className="bg-foreground h-0.5 w-full"></span>
                    </div>
                </button>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="bg-background/80 border-border/20 fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm border-l shadow-xl backdrop-blur-xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ ease: 'easeOut', duration: 0.3 }}
                        >
                            <div className="flex h-full flex-col">
                                <div className="border-border/20 flex items-center justify-between border-b p-5">
                                    <div className="text-foreground text-lg font-semibold">
                                        Seaavey
                                    </div>

                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-foreground"
                                    >
                                        <div className="flex w-6 cursor-pointer flex-col gap-[5px]">
                                            <span className="bg-foreground h-0.5 w-full translate-y-1 rotate-45"></span>
                                            <span className="bg-foreground h-0.5 w-full -translate-y-1 -rotate-45"></span>
                                        </div>
                                    </button>
                                </div>

                                <div className="flex flex-1 flex-col gap-1.5 p-5">
                                    {NAV_LINKS.map(link => (
                                        <li
                                            key={link.href}
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);

                                                setTimeout(() => {
                                                    document
                                                        .getElementById(link.id)
                                                        ?.scrollIntoView({
                                                            behavior: 'smooth',
                                                        });

                                                    setActiveSection(link.id);
                                                }, 250);
                                            }}
                                            className={`text-foreground/80 hover:text-primary border-border/10 cursor-pointer list-none border-b py-3 text-base transition-all duration-300 ${
                                                activeSection === link.id
                                                    ? 'text-primary font-medium'
                                                    : 'text-foreground/80 hover:text-primary'
                                            }`}
                                        >
                                            {link.name}
                                        </li>
                                    ))}
                                </div>

                                <div className="border-border/20 border-t p-5">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-primary hover:bg-primary/90 w-full rounded-md py-2.5 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        Try
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
