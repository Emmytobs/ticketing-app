import { ValidationError } from "express-validator";

export abstract class BaseError extends Error {
    abstract statusCode: number
    
    constructor() {
        super()
        Object.setPrototypeOf(this, BaseError.prototype)
    }
    
    abstract serializeErrors(): Array<{ message: string, field?: string }>
}

export class DatabaseConnectionError extends BaseError {
    statusCode = 500
    reason = 'Error connecting to database'
    constructor() {
        super()

        // Used because we're extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}

export class RequestValidationError extends BaseError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super()

        // Used because we're extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            if (error.type === 'field') 
                return { message: error.msg, field: error.type }
            return { message: error.msg }
        });
    }
}

export class NotFoundError extends BaseError {
    statusCode = 404
    constructor() {
        super()

        // Used because we're extending a built-in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{
            message: 'Route not found',
        }]
    }
}

export class UnauthorizedError extends BaseError {
    statusCode = 401
    constructor() {
        super()

        // Used because we're extending a built-in class
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{
            message: 'Not authorized',
        }]
    }
}