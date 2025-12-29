import { JSONErrorData, JSONSuccess } from '@/features/shared/lib/response';
import { isTikTokURL, isURL } from '@/features/shared/lib/validation';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json(JSONErrorData('Method not allowed'));
    }

    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json(JSONErrorData('URL parameter is required'));
    }

    if (!isURL(url) || !isTikTokURL(url)) {
        return res.status(400).json(JSONErrorData('Invalid URL'));
    }

    const body = `q=${encodeURIComponent(url)}&lang=en`;

    const result = await axios.post<{
        status: 'ok' | 'error';
        data: string | null;
    }>('https://tikdownloader.io/api/ajaxSearch', body, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Origin: 'https://tikdownloader.io',
            Referer: 'https://tikdownloader.io/',
        },
    });

    if (!result.data || result.data.status !== 'ok' || !result.data.data) {
        return res.status(502).json(JSONErrorData('Failed to fetch data'));
    }

    const $ = cheerio.load(result.data.data);

    const title = $('.video-data h3').first().text().trim() || null;
    const isSlide = $('.photo-list .download-box li').length > 0;

    let images: string[] = [];

    if (isSlide) {
        images = [];
        $('.photo-list .download-box li').each((_, el) => {
            const image = $(el).find('img').attr('src');
            if (image) images.push(image);
        });
    }

    return res.status(200).json(
        JSONSuccess({
            title,

            ...(isSlide
                ? { images }
                : {
                      audio: $('a:contains("Download MP3")').attr('href') || null,
                      video: $('#vid').attr('data-src') || null,
                  }),
        }),
    );
}
