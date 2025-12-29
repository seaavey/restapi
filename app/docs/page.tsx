'use client';

import { Button } from '@/features/shared/components/ui/button';

export default function DocsPage() {
    return (
        <div className="flex w-full flex-1 items-center justify-center">
            <section className="w-full">
                <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
                    <div className="flex flex-col items-center space-y-6 text-center">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            Documentation
                        </h1>
                        <p className="text-muted-foreground max-w-[680px] text-base sm:text-lg md:text-xl">
                            Comprehensive guides and references to help you get started with Seaavey
                            APIs and make the most of our services.
                        </p>

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Button className="w-full sm:w-auto">Get Started</Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                                API Reference
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
