import { NextResponse } from 'next/server';

type ApiParameter = {
    name: string;
    type: string;
    required: boolean;
    description?: string;
};

type ApiResponse<T> = {
    ok: boolean;
    feature: string;
    data: T;
    meta: {
        method: string;
        timestamp: string;
    };
};

export async function GET(req: Request, props: { params: Promise<{ feature: string }> }) {
    const params = await props.params;
    const { feature } = params;

    const response: ApiResponse<{
        parameters: ApiParameter[];
        description: string;
        example: Record<string, unknown>;
    }> = {
        ok: true,
        feature,
        data: {
            parameters: [
                {
                    name: 'url',
                    type: 'string',
                    required: true,
                    description: 'Target URL to be checked',
                },
            ],
            description: `Check whether a URL is valid and accessible using the "${feature}" feature.`,
            example: {
                url: 'https://api.seaavey.web.id',
            },
        },
        meta: {
            method: 'GET',
            timestamp: new Date().toISOString(),
        },
    };

    return NextResponse.json(response, {
        status: 200,
        headers: {
            'Powered-By': 'Seaavey APIs',
            'Content-Type': 'application/json',
        },
    });
}
