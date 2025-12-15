import { ApiScanner } from '@/lib/scanner';
import { join } from 'path';

export function GET() {
    const scanner = new ApiScanner(join(process.cwd(), 'pages/api'));
    const scanned = scanner.scanAll();

    const endpoints = Object.entries(scanned).map(([category, features]) => ({
        name: capitalize(category),
        children: features.map(feature => ({
            name: capitalize(feature.path),
            href: `/docs/${category}/${feature.path}`,
        })),
    }));

    return Response.json(
        [
            { name: 'Introduction', href: '/docs' },
            {
                name: 'Endpoints',
                children: endpoints,
            },
        ],
        {
            status: 200,
            headers: {
                'Powered-By': 'Seaavey APIs',
            },
        },
    );
}

function capitalize(value: string) {
    return value.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
