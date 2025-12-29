'use client';

import { useEffect, useRef, useState } from 'react';

type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

export function useCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl = 1000 * 60 * 5, // 5 menit
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        const load = async () => {
            try {
                const raw = localStorage.getItem(key);

                if (raw) {
                    const cached: CacheEntry<T> = JSON.parse(raw);
                    const isExpired = Date.now() - cached.timestamp > ttl;

                    if (!isExpired) {
                        setData(cached.data);
                        setLoading(false);
                        return;
                    }
                }

                const fresh = await fetcher();
                setData(fresh);

                localStorage.setItem(
                    key,
                    JSON.stringify({
                        data: fresh,
                        timestamp: Date.now(),
                    }),
                );
            } catch (err) {
                console.error('useCache error:', err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [key, ttl, fetcher]);

    return { data, loading };
}
