'use client';

import { Button } from '@/components/ui/button';
import { Github, Twitter, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-background border-border/30 border-t py-12">
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
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        API Status
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Changelog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-medium">Project</h4>
                            <ul className="text-foreground/70 space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        API Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="mb-4 font-medium">Connect</h4>
                        <div className="mb-6 flex space-x-4">
                            <a
                                href="#"
                                className="bg-primary/5 border-border/30 text-foreground/70 hover:text-primary rounded-full border p-2 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-primary/5 border-border/30 text-foreground/70 hover:text-primary rounded-full border p-2 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-primary/5 border-border/30 text-foreground/70 hover:text-primary rounded-full border p-2 transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
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
                        className="text-foreground/70 hover:text-primary hover:bg-primary/5 flex h-auto items-center p-2"
                    >
                        Back to top
                        <ArrowUp className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
