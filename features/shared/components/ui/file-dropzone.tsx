'use client';

import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/features/shared/lib/utils';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from './input';

interface FileDropzoneProps {
    file: File | null;
    onChange: (file: File | null) => void;
    required?: boolean;
}

export function FileDropzone({ file, onChange, required }: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => inputRef.current?.click();

    const handleFile = (f?: File) => {
        if (f) onChange(f);
    };

    return (
        <div className="space-y-2">
            <Input
                ref={inputRef}
                type="file"
                hidden
                onChange={e => handleFile(e.target.files?.[0])}
            />

            {!file ? (
                <div
                    onClick={openPicker}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className={cn(
                        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm transition',
                        'hover:bg-muted/50',
                    )}
                >
                    <Upload className="text-muted-foreground h-6 w-6" />
                    <p className="text-muted-foreground">Click or drag file here</p>
                    {required && <span className="text-destructive text-xs">* required</span>}
                </div>
            ) : (
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-muted-foreground text-xs">
                            {(file.size / 1024).toFixed(1)} KB
                        </span>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => onChange(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
