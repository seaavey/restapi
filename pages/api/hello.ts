import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello World' });
    } else if (req.method === 'POST') {
        const { name } = req.body;
        res.status(201).json({ message: `Hello ${name}` });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
