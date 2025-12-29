import axios, { AxiosError } from 'axios';

export interface JSONSuccessResponse<T> {
    success: true;
    message: string | null;
    data: T;
}

export interface JSONErrorResponse {
    success: false;
    message: string;
    code: number;
    data: unknown;
}

export function JSONSuccess<T>(data: T, message: string | null = null): JSONSuccessResponse<T> {
    return {
        success: true,
        message,
        data,
    };
}

export function JSONErrorData(message: string) {
    return {
        success: false,
        message,
    };
}

export function JSONError(error: unknown): JSONErrorResponse {
    if (axios.isAxiosError(error)) {
        const axErr = error as AxiosError<unknown>;

        const responseData: unknown = axErr.response?.data;

        let message: string = axErr.message;

        if (isObject(responseData)) {
            const msg = (responseData as Record<string, unknown>)['message'];
            if (typeof msg === 'string') {
                message = msg;
            }
        }

        return {
            success: false,
            message,
            code: axErr.response?.status ?? 500,
            data: responseData ?? null,
        };
    }

    if (error instanceof Error) {
        return {
            success: false,
            message: error.message,
            code: 500,
            data: null,
        };
    }

    return {
        success: false,
        message: 'Unknown error',
        code: 500,
        data: null,
    };
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
