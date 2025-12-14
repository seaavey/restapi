import { Badge } from '@/components/ui/badge';

interface DocParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

interface ParameterTableProps {
    parameters: DocParameter[];
}

export function ParameterTable({ parameters }: ParameterTableProps) {
    if (!parameters || parameters.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium">Parameters</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Name</th>
                            <th className="py-2 text-left">Type</th>
                            <th className="py-2 text-left">Required</th>
                            <th className="py-2 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parameters.map((param, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="py-2 font-mono">{param.name}</td>
                                <td className="py-2">{param.type}</td>
                                <td className="py-2">
                                    {param.required ? (
                                        <Badge variant="destructive">Required</Badge>
                                    ) : (
                                        <Badge variant="outline">Optional</Badge>
                                    )}
                                </td>
                                <td className="py-2">{param.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
