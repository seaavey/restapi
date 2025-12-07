'use client';

import { Button } from '@/components/ui/button';

export default function DocsHero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Documentation
                    </h1>
                    <p className="text-muted-foreground max-w-[700px] text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Comprehensive guides and references to help you get started with Seaavey
                        APIs and make the most of our services.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button>Get Started</Button>
                        <Button variant="outline">API Reference</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
