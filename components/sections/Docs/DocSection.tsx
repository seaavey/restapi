import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EndpointCard } from './EndpointCard';

interface DocSection {
    title: string;
    description: string;
    endpoint: string;
    method: string;
    parameters?: Array<{
        name: string;
        type: string;
        required: boolean;
        description: string;
    }>;
    exampleRequest?: string;
    exampleResponse?: string;
}

interface DocSectionProps {
    section: DocSection;
    index: number;
    totalSections: number;
}

export function DocSection({ section, index, totalSections }: DocSectionProps) {
    return (
        <div className="mb-12">
            <div className="mb-4 flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <Badge variant="secondary">{section.method}</Badge>
            </div>

            <p className="mb-6 text-base">{section.description}</p>

            <EndpointCard section={section} />

            {index < totalSections - 1 && <Separator className="my-8" />}
        </div>
    );
}
