// This file is probably unnecessary because the logic can be implemented in another middleware

// import { Request, Response, NextFunction } from 'express';
// import { UnauthorizedError } from "../errors";

// function requireAuth(req: Request, res: Response, next: NextFunction) {
//     if (!req.currentUser) {
//         throw new UnauthorizedError()
//     }

//     next();
// }