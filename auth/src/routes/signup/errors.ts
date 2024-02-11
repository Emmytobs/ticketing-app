import { BaseError } from "@/common/errors";

export class EmailAlreadyExistsError extends BaseError {
    statusCode = 400;

    constructor() {
        super()
        Object.setPrototypeOf(this, EmailAlreadyExistsError.prototype);
    }

    serializeErrors() {
        return [
            { message: 'Email already in use' }
        ]
    }
}