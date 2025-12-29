'use client';

import { useEffect } from 'react';
import { Button } from '@/features/shared/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="bg-muted flex min-h-screen flex-col items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 text-center">
                <div className="text-destructive text-9xl font-bold">!</div>
                <h1 className="text-3xl font-bold">Something went wrong!</h1>
                <p className="text-muted-foreground">
                    An unexpected error occurred. Please try again.
                </p>
                <div className="flex flex-col justify-center gap-2 pt-4 sm:flex-row">
                    <Button
                        variant="outline"
                        onClick={() => {
                            reset();
                        }}
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    );
}
