import { BaseError } from "../../errors";

export class IncorrectCredentialsError extends BaseError {
    statusCode = 401;

    constructor() {
        super()
        Object.setPrototypeOf(this, IncorrectCredentialsError.prototype);
    }

    serializeErrors() {
        return [
            { message: 'Email or password is incorrect' }
        ]
    }
}