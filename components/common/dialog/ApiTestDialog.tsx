'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Feature } from '@/types/APISchema';
import { CodeBlock } from '@/components/ui/code-block';

export default function ApiTestDialog({
    feature,
    category,
}: {
    feature: Feature;
    category: string;
}) {
    const [params, setParams] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Record<string, unknown> | null>(null);
    const [status, setStatus] = useState<number | null>(null);

    const isEmpty = !Object.keys(params).length && !response && !status;

    const hasMissingRequired =
        feature.queryParameters?.some(p => p.required && !params[p.name]?.trim()) ?? false;

    const buildUrl = () => {
        const query = new URLSearchParams(params).toString();
        return `${process.env.NEXT_PUBLIC_API_URL}/api/${category}${feature.path}${
            query ? `?${query}` : ''
        }`;
    };

    const sendRequest = async () => {
        setLoading(true);
        setResponse(null);
        setStatus(null);

        const request = async () => {
            const res = await fetch(buildUrl(), {
                method: feature.method[0],
            });

            setStatus(res.status);

            const data = await res.json();
            setResponse(data);

            if (!res.ok) {
                return Promise.reject(new Error(data.message));
            }

            return data;
        };

        try {
            await toast.promise(request(), {
                loading: 'Sending request...',
                success: 'Request success',
                error: err => err.message || 'Request failed',
            });
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        setParams({});
        setResponse(null);
        setStatus(null);
        toast.dismiss();
    };

    return (
        <Dialog onOpenChange={open => !open && clearAll()}>
            <DialogTrigger asChild>
                <Button variant="secondary">Test API</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Test API</DialogTitle>
                    <DialogDescription>Send a live request to this endpoint</DialogDescription>
                </DialogHeader>

                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                    <div className="flex flex-wrap items-center gap-2">
                        {feature.method.map(method => (
                            <Badge key={method}>{method}</Badge>
                        ))}
                        <span className="text-muted-foreground font-mono text-sm">
                            {feature.path}
                        </span>
                    </div>

                    {feature.queryParameters?.length ? (
                        <div className="space-y-3">
                            {feature.queryParameters.map(param => (
                                <div key={param.name} className="flex items-center gap-3">
                                    <Input
                                        placeholder={`${param.name} (${param.type})`}
                                        required={param.required}
                                        onChange={e =>
                                            setParams(prev => ({
                                                ...prev,
                                                [param.name]: e.target.value,
                                            }))
                                        }
                                    />
                                    {param.required && (
                                        <Badge variant="destructive">required</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">No query parameters</p>
                    )}

                    <div className="flex justify-between">
                        <Button variant="ghost" onClick={clearAll} disabled={loading || isEmpty}>
                            Clear
                        </Button>

                        <Button onClick={sendRequest} disabled={loading || hasMissingRequired}>
                            {loading ? 'Sending...' : 'Send Request'}
                        </Button>
                    </div>

                    {status && (
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">Status: {status}</Badge>
                        </div>
                    )}

                    {response && (
                        <CodeBlock className="max-h-[300px] overflow-auto rounded-md">
                            {JSON.stringify(response, null, 2)}
                        </CodeBlock>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
