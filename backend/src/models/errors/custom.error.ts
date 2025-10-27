import type { ContentfulStatusCode } from "hono/utils/http-status";

export class CustomError {
    code: ContentfulStatusCode
    value: any

    constructor(value: any, status?: ContentfulStatusCode) {
        this.value = value;
        this.code = status || 500;
    }
}