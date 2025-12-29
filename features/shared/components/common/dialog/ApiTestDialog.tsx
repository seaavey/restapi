'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/features/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/features/shared/components/ui/dialog';
import { Input } from '@/features/shared/components/ui/input';
import { Badge } from '@/features/shared/components/ui/badge';
import { Feature } from '@/features/api/types/api';
import { CodeBlock } from '@/features/shared/components/ui/code-block';
import { FileDropzone } from '@/features/shared/components/ui/file-dropzone';

export default function ApiTestDialog({
    feature,
    category,
}: {
    feature: Feature;
    category: string;
}) {
    const [params, setParams] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<Record<string, File | null>>({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Record<string, unknown> | null>(null);
    const [status, setStatus] = useState<number | null>(null);

    const hasFileParam = feature.queryParameters?.some(p => p.type === 'file') ?? false;

    const hasMissingRequired =
        feature.queryParameters?.some(p => {
            if (!p.required) return false;
            if (p.type === 'file') return !files[p.name];
            return !params[p.name]?.trim();
        }) ?? false;

    const isEmpty =
        !Object.keys(params).length && !Object.keys(files).length && !response && !status;

    const buildUrl = () => {
        const query = new URLSearchParams(params).toString();
        return `${process.env.NEXT_PUBLIC_API_URL}/api/${category}${feature.path}${
            query ? `?${query}` : ''
        }`;
    };

    /* ================= ACTIONS ================= */

    const sendRequest = async () => {
        setLoading(true);
        setResponse(null);
        setStatus(null);

        const request = async () => {
            let body: BodyInit | undefined;
            const url = buildUrl();

            if (hasFileParam) {
                const formData = new FormData();

                Object.entries(params).forEach(([key, value]) => {
                    if (value) formData.append(key, value);
                });

                Object.entries(files).forEach(([key, file]) => {
                    if (file) formData.append(key, file);
                });

                body = formData;
            }

            const res = await fetch(url, {
                method: body ? 'POST' : 'GET',
                body,
            });

            setStatus(res.status);

            const data = await res.json();
            setResponse(data);

            if (!res.ok) {
                throw new Error(data.message || 'Request failed');
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
        setFiles({});
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
                        feature.queryParameters.map(param => (
                            <div key={param.name} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{param.name}</span>
                                    {param.required && (
                                        <Badge variant="destructive">required</Badge>
                                    )}
                                </div>
                                {param.type === 'file' ? (
                                    <FileDropzone
                                        file={files[param.name] ?? null}
                                        required={param.required}
                                        onChange={file =>
                                            setFiles(prev => ({
                                                ...prev,
                                                [param.name]: file,
                                            }))
                                        }
                                    />
                                ) : (
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
                                )}
                            </div>
                        ))
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

                    {status && <Badge variant="secondary">Status: {status}</Badge>}

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
