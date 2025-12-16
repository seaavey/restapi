/**
 * Regex to match a URL
 * @example https://www.example.com/path?query=string#hash
 */
export const URL_REGEX = /https?:\/\/[^\s"'<>]+/g;

/**
 * Regex to match a TikTok URL or video ID
 * @example https://www.tiktok.com/@username/video/1234567890
 * @example https://vm.tiktok.com/1234567890
 * @example https://vt.tiktok.com/1234567890
 * @example https://tikwm.com/video/1234567890
 */
export const TIKTOK_REGEX =
    /^(https?:\/\/)?(www\.)?(tiktok\.com\/(@[\w.-]+\/video\/\d+|v\/\d+|embed\/\d+)|(?:vm|vt)\.tiktok\.com\/[\w-]+\/?|tikwm\.com\/video\/\d+)(?:[?#].*)?$/i;
