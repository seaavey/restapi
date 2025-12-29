import { Skeleton } from '@/features/shared/components/ui/skeleton';

export function SidebarSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="ml-4 h-3 w-3/5" />
                </div>
            ))}
        </div>
    );
}
