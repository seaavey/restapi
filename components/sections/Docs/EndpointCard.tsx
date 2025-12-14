import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { ParameterTable } from './ParameterTable';

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

interface EndpointCardProps {
    section: DocSection;
}

export function EndpointCard({ section }: EndpointCardProps) {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="bg-muted rounded px-2 py-1 font-mono text-sm">
                        {section.method}
                    </span>
                    <span className="text-muted-foreground font-normal">{section.endpoint}</span>
                </CardTitle>
                <CardDescription>API Endpoint Information</CardDescription>
            </CardHeader>
            <CardContent>
                {section.parameters && <ParameterTable parameters={section.parameters} />}

                {section.exampleRequest && (
                    <div className="mb-6">
                        <h3 className="mb-3 text-lg font-medium">Example Request</h3>
                        <CodeBlock language="json">{section.exampleRequest}</CodeBlock>
                    </div>
                )}

                {section.exampleResponse && (
                    <div>
                        <h3 className="mb-3 text-lg font-medium">Example Response</h3>
                        <CodeBlock language="json">{section.exampleResponse}</CodeBlock>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
