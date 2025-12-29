'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/features/shared/components/ui/button';
import { Github, Twitter, Mail, ArrowUp } from 'lucide-react';

const socialClass =
    'rounded-full border border-border/30 bg-primary/5 p-2 text-foreground/70 transition-colors hover:text-primary';

function Footer() {
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <footer className="border-border/30 bg-background border-t py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Seaavey</h3>
                        <p className="text-foreground/70 text-sm">
                            Free and open-source REST API for education and personal projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="mb-4 font-medium">Product</h4>
                            <ul className="text-foreground/70 space-y-2 text-sm">
                                <li>
                                    <Link href="/features" className="hover:text-primary">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs" className="hover:text-primary">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/status" className="hover:text-primary">
                                        API Status
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/changelog" className="hover:text-primary">
                                        Changelog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-medium">Project</h4>
                            <ul className="text-foreground/70 space-y-2 text-sm">
                                <li>
                                    <Link href="/about" className="hover:text-primary">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs" className="hover:text-primary">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://github.com/seaavey" target="_blank">
                                        GitHub
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/seaavey"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/status" className="hover:text-primary">
                                        API Status
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="mb-4 font-medium">Connect</h4>
                        <div className="mb-6 flex space-x-4">
                            <Link
                                href="https://github.com/seaavey"
                                target="_blank"
                                aria-label="GitHub"
                                className={socialClass}
                            >
                                <Github className="h-5 w-5" />
                            </Link>

                            <Link
                                href="https://twitter.com/seaavey"
                                target="_blank"
                                aria-label="Twitter"
                                className={socialClass}
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>

                            <Link
                                href="mailto:contact@seaavey.site"
                                aria-label="Email"
                                className={socialClass}
                            >
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-border/20 mt-12 flex flex-col items-center gap-4 border-t pt-8">
                    <p className="text-foreground/70 text-center text-sm">
                        © {new Date().getFullYear()} Seaavey. All rights reserved.
                    </p>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToTop}
                        className="text-foreground/70 hover:bg-primary/5 hover:text-primary flex h-auto items-center p-2"
                        aria-label="Back to top"
                    >
                        Back to top
                        <ArrowUp className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);
