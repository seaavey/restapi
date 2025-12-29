import { JSONErrorData, JSONSuccess } from '@/features/shared/lib/response';
import { isPinterestURL, isURL } from '@/features/shared/lib/validation';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json(JSONErrorData('Method not allowed'));

    const { url } = req.query;

    if (!url || typeof url !== 'string')
        return res.status(400).json(JSONErrorData('URL parameter is required'));

    if (!isURL(url) || !isPinterestURL(url))
        return res.status(400).json(JSONErrorData('Invalid URL'));

    // scaper by https://builds.nekolabs.web.id/code/pinterest-downloader.js
    // recode by Seaavey
    const { data } = await axios.get<IResponse>(
        'https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/pins/info',
        {
            headers: {
                'content-type': 'application/json',
                referer:
                    'https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/',
                'x-rapidapi-host':
                    'pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com',
                'x-rapidapi-key': '0b54688e52msh9f5155a08141c69p1073e8jsnc51fa988e886',
            },
            params: {
                url: url,
            },
            timeout: 10_000, // 10 seconds
        },
    );

    if (!data) return res.status(500).json(JSONErrorData('Failed to fetch data'));

    if (data.http_status !== 200 || data.status !== 'success')
        return res.status(502).json(JSONErrorData('Failed to fetch data'));

    return res.status(200).json(JSONSuccess(data.data));
}

interface IResponse {
    http_status: number;
    status: 'success' | 'error';
    data: {
        id: string;
        title: string | null;
        description: string;
        category: string | null;
        privacy: string;
        section: string | null;
        type: string;
        media: {
            media_type: 'image' | 'video' | 'gif';
            items: Record<
                string,
                {
                    width: number;
                    height: number;
                    url: string;
                }
            >;
        };
        board_id: string;
        board_owner: {
            username: string;
        };
        pinner: {
            node_id: string;
            is_default_image: boolean;
            ads_only_profile_site: string | null;
            verified_identity: object | null;
            full_name: string;
            explicitly_followed_by_me: boolean;
            type: string;
            first_name: string;
            image_small_url: string;
            is_verified_merchant: boolean;
            follower_count: number;
            instagram_data: string | null;
            domain_url: string | null;
            username: string;
            indexed: boolean;
            id: string;
            followed_by_me: boolean;
            blocked_by_me: boolean;
            is_ads_only_profile: boolean;
            image_medium_url: string;
            domain_verified: boolean;
        };
        alt_text: string | null;
        dominant_color: string;
        thumbnails: Record<
            string,
            {
                width: number;
                height: number;
                url: string;
            }
        >;
        comment_count: number;
        repin_count: number;
        share_count: number;
        created_at: string;
    };
}
