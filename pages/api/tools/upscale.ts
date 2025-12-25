import { JSONErrorData } from '@/lib/response';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import axios, { AxiosResponse } from 'axios';

export const config = {
    api: {
        bodyParser: false,
    },
};

function parseForm(req: NextApiRequest): Promise<{ files: formidable.Files }> {
    const form = formidable({
        multiples: false,
        maxFileSize: 20 * 1024 * 1024,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, _fields, files) => {
            if (err) reject(err);
            else resolve({ files });
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!['GET', 'POST'].includes(req.method!)) {
        return res.status(405).json(JSONErrorData('Method not allowed'));
    }

    try {
        let buffer: Buffer;
        let mode: EnhanceMode = 'restore';

        if (typeof req.query.mode === 'string') {
            mode = req.query.mode as EnhanceMode;
        }

        if (req.method === 'GET') {
            const { url } = req.query;

            if (!url || typeof url !== 'string') {
                return res.status(400).json(JSONErrorData('URL parameter is required'));
            }

            const img = await axios.get<ArrayBuffer>(url, {
                responseType: 'arraybuffer',
            });

            buffer = Buffer.from(img.data);
        } else {
            const { files } = await parseForm(req);

            const uploaded = files.file as File | File[] | undefined;

            if (!uploaded) {
                return res.status(400).json(JSONErrorData('File is required'));
            }

            const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

            if (!file.filepath) {
                return res.status(400).json(JSONErrorData('Invalid uploaded file'));
            }

            buffer = fs.readFileSync(file.filepath);
        }

        const result = await Enhance(buffer, mode);

        return res.status(200).json({
            success: true,
            status: result.status,
            resultUrl: result.resultUrl,
            metrics: result.metrics,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json(JSONErrorData((err as Error).message));
    }
}

type EnhanceMode = 'fast' | 'ultra' | 'restore';

interface CreateTaskResponse {
    predictionId?: string;
}

interface EnhanceMetrics {
    predict_time: number;
    total_time: number;
}

interface EnhanceSucceeded {
    status: 'succeeded';
    resultUrl: string;
    metrics: EnhanceMetrics;
}

interface EnhanceProcessing {
    status: 'processing';
}

interface EnhanceFailed {
    status: 'failed';
    error?: string;
}

type EnhanceStatusResponse = EnhanceSucceeded | EnhanceProcessing | EnhanceFailed;

async function Enhance(buffer: Buffer, type: EnhanceMode = 'restore'): Promise<EnhanceSucceeded> {
    const base64 = buffer.toString('base64');

    const createResponse: AxiosResponse<CreateTaskResponse> = await axios.post(
        'https://photoenhancer.pro/api/enhance',
        {
            imageData: `data:image/jpeg;base64,${base64}`,
            mode: type,
            fileName: `${Date.now()}.jpg`,
        },

        {
            timeout: 20_000, // 20 seconds
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 13)',
                'Content-Type': 'application/json',
                origin: 'https://photoenhancer.pro',
                referer: 'https://photoenhancer.pro/',
            },
        },
    );

    const taskId = createResponse.data.predictionId;
    if (!taskId) throw new Error('Task ID tidak ditemukan');

    for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 3000));

        const statusResponse: AxiosResponse<EnhanceStatusResponse> = await axios.get(
            `https://photoenhancer.pro/api/status?id=${taskId}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 13)',
                    origin: 'https://photoenhancer.pro',
                    referer: 'https://photoenhancer.pro/',
                },
            },
        );

        const data = statusResponse.data;

        if (data.status === 'succeeded') {
            return data;
        }

        if (data.status === 'failed') {
            throw new Error(data.error ?? 'Enhance failed');
        }
    }

    throw new Error('Timeout: proses terlalu lama');
}
