'use client';

import Navbar from '@/components/sections/Landing/Navbar';
import Footer from '@/components/sections/Landing/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
    ArrowRight,
    Mail,
    Globe,
    Zap,
    Shield,
    Code,
    Database,
    GitBranch,
    Lock,
    LucideIcon,
} from 'lucide-react';

const FEATURES = [
    {
        icon: Code,
        title: 'RESTful Design',
        description: 'Clean, intuitive endpoints following REST principles for easy integration',
        badge: 'Standard',
    },
    {
        icon: Zap,
        title: 'High Performance',
        description: 'Optimized API endpoints for maximum performance and minimal response time',
        badge: 'Fast',
    },
    {
        icon: Shield,
        title: 'Secure Access',
        description: 'Secure by design with authentication and encryption for all requests',
        badge: 'Secure',
    },
    {
        icon: Database,
        title: 'Reliable Storage',
        description: 'Persistent and reliable data storage with high availability',
        badge: 'Reliable',
    },
    {
        icon: Globe,
        title: 'Global Access',
        description: 'Accessible from anywhere with optimized response times',
        badge: 'Global',
    },
    {
        icon: GitBranch,
        title: 'Open Source',
        description: 'Completely open source with transparent development and community support',
        badge: 'FOSS',
    },
];

const VALUES = [
    {
        icon: Zap,
        title: 'Performance',
        description: 'Optimized endpoints for maximum performance and minimal response time',
    },
    {
        icon: Lock,
        title: 'Security',
        description: 'Secure by design with authentication and encryption for all requests',
    },
    {
        icon: Globe,
        title: 'Accessibility',
        description: 'Simple and intuitive API endpoints accessible from anywhere',
    },
];

function HeroSection() {
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

                <HeroActions />
            </div>
        </section>
    );
}

function BackgroundBlur() {
    return (
        <div className="absolute inset-0 z-0">
            <div className="bg-primary/5 absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-secondary/5 absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl" />
        </div>
    );
}

function HeroActions() {
    return (
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
    );
}

function FeaturesSection() {
    return (
        <section id="features" className="bg-background/50 py-20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Powerful API Features"
                    description="Our open-source REST API provides everything you need for efficient integration"
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
    badge,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    badge: string;
}) {
    return (
        <Card className="border-border/30 bg-card/30 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
                <div className="mb-3 flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                        <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </div>

                <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
                    {badge}
                </Badge>
            </CardHeader>

            <CardContent>
                <p className="text-foreground/70">{description}</p>
            </CardContent>
        </Card>
    );
}

function AboutSection() {
    return (
        <section id="about" className="bg-background py-20">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <Badge className="bg-primary/10 text-primary mb-4">About Our API</Badge>
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        Open-Source REST API Platform
                    </h2>
                    <p className="text-foreground/80 mx-auto max-w-2xl text-lg">
                        A free and open-source REST API for developers, built with modern
                        technologies and best practices.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {VALUES.map((value, index) => (
                        <ValueCard key={index} {...value} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ValueCard({
    icon: Icon,
    title,
    description,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-card/30 border-border/30 hover:border-primary/50 rounded-xl border p-6 transition-all">
            <Icon className="text-primary mb-4 h-6 w-6" />
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-foreground/70">{description}</p>
        </div>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="bg-background py-20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Contact Us"
                    description="Have questions about our REST API? Reach out to us via email."
                />

                <div className="mx-auto max-w-2xl">
                    <div className="bg-card/30 border-border/30 rounded-2xl border p-8 text-center">
                        <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                            <Mail className="text-primary h-8 w-8" />
                        </div>

                        <h3 className="mb-2 text-xl font-semibold">Get in Touch</h3>
                        <p className="text-foreground/80 mb-6">
                            For support, questions, or feedback about our API, send us an email.
                        </p>

                        <a
                            href="mailto:support@seavvey.web.id"
                            className="text-primary text-lg font-medium hover:underline"
                        >
                            support@seavvey.web.id
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="text-foreground/80 mx-auto max-w-2xl text-lg">{description}</p>
        </div>
    );
}

export default function HomePage() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
