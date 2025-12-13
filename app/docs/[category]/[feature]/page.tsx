import DocsBody from '@/components/sections/Docs/Body';
import DocsHeader from '@/components/sections/Docs/Header';
import { Metadata } from 'next';

const formatTitle = (value: string) =>
    value.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export async function generateMetadata(props: {
    params: Promise<{
        category: string;
        feature: string;
    }>;
}): Promise<Metadata> {
    const params = await props.params;

    const category = formatTitle(params.category);
    const feature = formatTitle(params.feature);

    const title = `${feature} - ${category} | Seaavey APIs`;
    const description = `Documentation for ${feature} in the ${category} category on Seaavey APIs.`;

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
    const params = await props.params;
    return (
        <div className="flex flex-col space-y-4">
            <DocsHeader feature={params.feature} category={params.category} />
            <DocsBody />
        </div>
    );
}
