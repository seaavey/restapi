import { PINTEREST_REGEX, TIKTOK_REGEX, URL_REGEX } from '@/lib/constants/regex';

export function isURL(url: string): boolean {
    return URL_REGEX.test(url);
}

export function isTikTokURL(url: string): boolean {
    return TIKTOK_REGEX.test(url);
}

export function isPinterestURL(url: string): boolean {
    return PINTEREST_REGEX.test(url);
}
