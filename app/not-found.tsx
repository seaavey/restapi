'use client';

import { Button } from '@/features/shared/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="bg-muted flex min-h-screen flex-col items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 text-center">
                <div className="text-primary text-9xl font-bold">404</div>
                <h1 className="text-3xl font-bold">Page Not Found</h1>
                <p className="text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="pt-4">
                    <Button onClick={() => router.push('/')}>Go back home</Button>
                </div>
            </div>
        </div>
    );
}
