import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }
    console.log('Something went wrong');
    res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    });
}