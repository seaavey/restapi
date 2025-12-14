import DocsBody from '@/components/sections/Docs/Body';
import DocsHeader from '@/components/sections/Docs/Header';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const formatTitle = (value: string) =>
    value.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export async function generateMetadata(props: {
    params: Promise<{
        category: string;
        feature: string;
    }>;
}): Promise<Metadata> {
    const { category, feature } = await props.params;

    const categoryTitle = formatTitle(category);
    const featureTitle = formatTitle(feature);

    const title = `${featureTitle} - ${categoryTitle} | Seaavey APIs`;
    const description = `Documentation for ${featureTitle} in the ${categoryTitle} category on Seaavey APIs.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    };
}

export default async function DocsPage(props: {
    params: Promise<{
        category: string;
        feature: string;
    }>;
}) {
    const { category, feature } = await props.params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/check?feature=${feature}`, {
        method: 'HEAD',
        cache: 'no-store',
    });

    const hasFeature = res.ok;

    if (!hasFeature) {
        return notFound();
    }

    return (
        <div className="flex flex-col space-y-4">
            <DocsHeader feature={feature} category={category} />
            <DocsBody category={category} feature={feature} />
        </div>
    );
}
