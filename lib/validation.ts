import { TIKTOK_REGEX, URL_REGEX } from '@/constants/regex';

export function isURL(url: string): boolean {
    return URL_REGEX.test(url);
}

export function isTikTokURL(url: string): boolean {
    return TIKTOK_REGEX.test(url);
}
