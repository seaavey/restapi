import { Capitalize } from '@/features/shared/lib/utils';

export default function DocsHeader({ feature, category }: { feature: string; category: string }) {
    return (
        <div className="items-center space-y-2 text-center">
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-6xl">
                {Capitalize(feature) + ' - ' + Capitalize(category)}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Documentation for <strong>{feature}</strong> in the <strong>{category}</strong>{' '}
                category on Seaavey APIs.
            </p>
        </div>
    );
}
