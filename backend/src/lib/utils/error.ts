import { PostgrestError } from "@supabase/supabase-js";
import { StatusCodes } from "http-status-codes";
import { HTTPException } from "hono/http-exception";
import type { ZodError } from "zod";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type ErrorName =
    | "Unauthorized" // 401: The user is not authenticated
    | "Bad_Request" // 400: The request is malformed or invalid
    | "Forbidden" // 403: The user is authenticated but does not have access rights
    | "Not_Found" // 404: The requested resource could not be found
    | "Conflict" // 409: There is a conflict with the current state of the resource
    | "Unprocessable_Entity" // 422: The server understands the content type, but the request was invalid
    | "Too_Many_Requests" // 429: The user has sent too many requests in a given amount of time
    | "Internal_Server_Error" // 500: A generic error occurred on the server
    | "Bad_Gateway" // 502: The server was acting as a gateway or proxy and received an invalid response
    | "Service_Unavailable" // 503: The server is not ready to handle the request
    | "Gateway_Timeout"; // 504: The server was acting as a gateway or proxy and did not receive a response in time

export class BadRequestError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, { message });
        this.name = "BadRequestError";
    }
}

export class UnauthorizedError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, { message });
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.FORBIDDEN, { message });
        this.name = "ForbiddenError";
    }
}

export class NotFoundError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, { message });
        this.name = "NotFoundError";
    }
}

export class ConflictError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.CONFLICT, { message });
        this.name = "ConflictError";
    }
}

export class UnprocessableEntityError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.UNPROCESSABLE_ENTITY, { message });
        this.name = "UnprocessableEntityError";
    }
}

export class TooManyRequestsError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.TOO_MANY_REQUESTS, { message });
        this.name = "TooManyRequestsError";
    }
}

export class InternalServerError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, { message });
        this.name = "InternalServerError";
    }
}

export class BadGatewayError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.BAD_GATEWAY, { message });
        this.name = "BadGatewayError";
    }
}

export class ServiceUnavailableError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.SERVICE_UNAVAILABLE, { message });
        this.name = "ServiceUnavailableError";
    }
}

export class GatewayTimeoutError extends HTTPException {
    constructor(message: string) {
        super(StatusCodes.GATEWAY_TIMEOUT, { message });
        this.name = "GatewayTimeoutError";
    }
}

export class ZodErrorResponse extends Error {
    status: number;
    errors: Array<{ path: string; message: string }>;

    constructor(error: ZodError) {
        const formattedErrors = error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        }));
        super("Validation Error");
        this.name = error.name;
        this.status = StatusCodes.UNPROCESSABLE_ENTITY;
        this.errors = formattedErrors;
    }
}

export function createErrorResponse<TError extends Error>(error: TError) {
    if (error instanceof ZodErrorResponse) {
        return {
            statusCode: error.status,
            error: {
                name: error.name,
                message: error.message,
                details: error.errors,
            },
        };
    }

    if (error instanceof PostgrestError) {
        return {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            error: {
                name: error.name,
                message: error.message,
            },
        };
    }

    if (error instanceof HTTPException) {
        return new HTTPException(error.status, { ...error });
    }

    return new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, { ...error });
}
