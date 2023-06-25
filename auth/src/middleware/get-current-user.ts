import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWTClaims } from "../types";
import { UnauthorizedError } from "../errors";

declare global {
    namespace Express {
        interface Request {
            currentUser?: JWTClaims | null
        }
    }
}

/**
 * 
 * @description - Middleware to get the currently logged-in user based on the JWT provided 
 */
export function getCurrentUser(req: Request, res: Response, next: NextFunction) {
     // Check if the jwt auth is provided
     const authTokenProvided = req.session?.jwt;
     if (!authTokenProvided) {
        throw new UnauthorizedError();
        // Assume the route on which this middleware is used doesn't require authentication
        // next();
     }
 
     // If provided, check if it is valid
     try {
        const payload = jwt.verify(authTokenProvided, process.env.JWT_KEY!) as JWTClaims
        req.currentUser = payload;
        next();
     } catch (error) {
        throw new UnauthorizedError();
        // req.currentUser = null
     }

    //  next();
}