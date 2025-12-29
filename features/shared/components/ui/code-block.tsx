'use client';

import { cn } from '@/features/shared/lib/utils';
import { Copy, Check } from 'lucide-react';
import { Button } from './button';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CodeBlockProps {
    children: string;
    language?: string;
    className?: string;
}

export function CodeBlock({ children, language = 'text', className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(children.trim());
        setCopied(true);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn('group relative', className)}>
            <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                <code className={`language-${language}`}>{children.trim()}</code>
            </pre>
            <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={copyToClipboard}
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    );
}
