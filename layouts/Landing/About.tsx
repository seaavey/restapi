import { Badge, Globe, Lock, LucideIcon, Zap } from 'lucide-react';

const MAP = [
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

export default function AboutSection() {
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
                    {MAP.map((value, index) => (
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
