import BackgroundBlur from '@/components/background/blur';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center px-6 py-12"
        >
            <BackgroundBlur />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Powerful API{' '}
                    <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
                        Platform for
                    </span>{' '}
                    Modern Applications
                </h1>

                <p className="text-foreground/80 mx-auto mb-10 max-w-2xl text-lg md:text-xl">
                    Powerful REST API for file downloads, cloud operations, and seamless
                    integration. Completely free and open-source for developers and users.
                </p>

                <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        href="/docs"
                        className="group w-full rounded-full px-8 py-5 text-base sm:w-auto md:w-1/4"
                    >
                        <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        Try it
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        href="/docs"
                        className="w-full rounded-full px-8 py-5 text-base sm:w-auto md:w-1/4"
                    >
                        View Documentation
                    </Button>
                </div>
            </div>
        </section>
    );
}
