import { ApiSchema, Feature } from '@/types/APISchema';
import { readFileSync } from 'fs';
import { join } from 'path';

export function GET() {
    const scanner = JSON.parse(
        readFileSync(join(process.cwd(), 'endpoints.json'), 'utf-8'),
    ) as ApiSchema;

    const scanned: Record<string, Feature[]> = {};

    for (const service of scanner.services) {
        for (const feature of service.features) {
            if (!scanned[service.key]) {
                scanned[service.key] = [];
            }
            scanned[service.key].push(feature);
        }
    }

    const endpoints = Object.entries(scanned).map(([category, features]) => ({
        name: capitalize(category),
        children: features.map(feature => ({
            name: capitalize(feature.key),
            href: `/docs/${category}${feature.path}`,
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
