/* Root schema */
export interface ApiSchema {
    $schema: string;
    services: Service[];
}

/* Service */
export interface Service {
    key: string;
    path: string;
    description?: string;
    features: Feature[];
}

/* Feature / Endpoint */
export interface Feature {
    key: string;
    path: string;
    method: HttpMethod[];
    summary?: string;
    queryParameters?: QueryParameter[];
    responses: Responses;
}

/* HTTP Methods */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

/* Query Parameters */
export interface QueryParameter {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'file';
    required?: boolean;
    default?: unknown;
    enum?: string[];
}

/* Responses map (status code → response) */
export interface Responses {
    [statusCode: string]: ArrayResponse | ObjectResponse;
}

/* Array response */
export interface ArrayResponse {
    type: 'array';
    items: ObjectSchema;
}

/* Object response (future-proof) */
export interface ObjectResponse {
    type: 'object';
    properties: Record<string, PropertySchema>;
    required?: string[];
}

/* Object schema */
export interface ObjectSchema {
    type: 'object';
    properties: Record<string, PropertySchema>;
    required?: string[];
}

/* Property schema (recursive) */
export interface PropertySchema {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    properties?: Record<string, PropertySchema>;
    items?: PropertySchema;
    required?: string[];
}
