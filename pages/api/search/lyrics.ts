import type { NextApiRequest, NextApiResponse } from 'next';
import { JSONError, JSONErrorData, JSONSuccess } from '@/features/shared/lib/response';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET')
            return res.status(405).json(JSONError({ message: 'Method not allowed', code: 405 }));

        const { query, limit } = req.query;

        if (!query || typeof query !== 'string')
            return res.status(400).json(JSONErrorData('Query parameter is required'));

        const data = await lyrics(query);

        if (!data)
            return res
                .status(502)
                .json(JSONError({ message: 'Failed to fetch lyrics', code: 502 }));

        if (data.length === 0) return res.status(404).json(JSONErrorData('No lyrics found'));

        const parsedLimit =
            typeof limit === 'string' && !isNaN(Number(limit)) ? Math.max(1, Number(limit)) : 2;

        return res.status(200).json(JSONSuccess(data.slice(0, parsedLimit)));
    } catch (err) {
        console.error(err);

        return res.status(500).json(
            JSONError({
                message: err instanceof Error ? err.message : 'Internal server error',
                code: 500,
            }),
        );
    }
}

// source: https://builds.nekolabs.web.id/code/lyrics-search.js
// recode by Seaavey
async function lyrics(title: string): Promise<ILyrics[] | null> {
    try {
        const res = await axios.get<ILyrics[]>(
            `https://lrclib.net/api/search?q=${encodeURIComponent(title)}`,
            {
                headers: {
                    referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
                    'user-agent':
                        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                },
                timeout: 10_000, // 10 seconds
            },
        );

        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error('[lyrics]', error);
        return null;
    }
}

interface ILyrics {
    id: number;
    name: string;
    trackName: string;
    artistName: string;
    albumName: string;
    duration: number;
    instrumental: boolean;
    plainLyrics: string;
    syncedLyrics: string;
}
