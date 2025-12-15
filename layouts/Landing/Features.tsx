import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, GitBranch, Globe, LucideIcon, Shield, Zap } from 'lucide-react';

const MAP = [
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

export default function MAPSection() {
    return (
        <section id="MAP" className="bg-background/50 py-20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Powerful API MAP"
                    description="Our open-source REST API provides everything you need for efficient integration"
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {MAP.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
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
