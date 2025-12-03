'use client';

import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
            <div className="absolute inset-0 z-0">
                <div className="bg-primary/5 absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl"></div>
                <div className="bg-secondary/5 absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Powerful API {''}
                    <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
                        Platform for
                    </span>{' '}
                    Modern Applications
                </h1>

                <p className="text-foreground/80 mx-auto mb-10 max-w-2xl text-lg md:text-xl">
                    Powerful REST API for file downloads, cloud operations, and seamless
                    integration. Completely free and open-source for developers and users.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="group w-1/4 rounded-full px-8 py-5 text-base transition-all"
                    >
                        <ArrowRight className="mr-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                        Try it
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-5 text-base"
                    >
                        View Documentation
                    </Button>
                </div>
            </div>
        </section>
    );
}
