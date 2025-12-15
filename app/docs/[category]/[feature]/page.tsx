import DocsBody from '@/layouts/Docs/Body';
import DocsHeader from '@/layouts/Docs/Header';
import { Feature } from '@/types/APISchema';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const formatTitle = (value: string) =>
    value.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string; feature: string }>;
}): Promise<Metadata> {
    const { category, feature } = await params;

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

async function getService(feature: string): Promise<{
    ok: boolean;
    data: Feature;
} | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/check/${feature}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function DocsPage({
    params,
}: {
    params: Promise<{ category: string; feature: string }>;
}) {
    const { category, feature } = await params;

    const service = await getService(feature);

    if (!service) {
        notFound();
    }

    return (
        <div className="flex flex-col space-y-4">
            <DocsHeader feature={service.data.key} category={category} />
            <DocsBody data={service.data} category={category} />
        </div>
    );
}
