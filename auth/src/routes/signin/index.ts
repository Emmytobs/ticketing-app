import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { SignInDTO } from './dto';
import * as authRepo from '../../repo'
import { IncorrectCredentialsError } from './errors';
import { AuthService } from '../../services/auth-service';
import { JWTClaims } from '../../../../common/src/types';
import { body } from 'express-validator';
import { validateRequestBody } from '@/common/middleware';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
        body('password')
        .trim()
        .notEmpty()
        .withMessage('Please provide a password')

    ],
    validateRequestBody,
    async (req: Request, res: Response) => {
        const { email, password } = req.body as SignInDTO;

        // Check if user exists with email
        const existingUser = await authRepo.getUserByEmail(email);
        if (!existingUser) {
            throw new IncorrectCredentialsError();
        }

        const passwordsMatch = await AuthService.comparePasswords(password, existingUser.password);
        if (!passwordsMatch) {
            throw new IncorrectCredentialsError();
        }

        const jwtClaims: JWTClaims = {
            id: existingUser._id,
            email: existingUser.email
        }

        const userJwt = jwt.sign(jwtClaims, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        }

        res.status(200).json(existingUser);
    }
)

export { router as signInRouter };