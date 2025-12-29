import { notFound } from 'next/navigation';

export default async function DocsCategoryPage(props: { params: Promise<{ category: string[] }> }) {
    const params = await props.params;
    const path = params.category || [];

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/check?category=${path}`, {
        method: 'HEAD',
        cache: 'no-store',
    });

    if (!res.ok) {
        return notFound();
    }
    return (
        <div className="mx-auto flex max-w-4xl flex-col items-center p-6">
            {JSON.stringify(path)}
        </div>
    );
}
