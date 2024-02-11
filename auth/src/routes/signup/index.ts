import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../../repo';
import { EmailAlreadyExistsError } from './errors';
import { User } from '../../models/user';
import { SignUpDTO } from './dto';
import { JWTClaims } from '../../../../common/src/types'; 
import { validateRequestBody } from '@/common/middleware';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
        body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be 4 - 20 characters long'),

    ],
    validateRequestBody,
    async (req: Request, res: Response) => {
        const { email, password } = req.body as SignUpDTO;

        const emailExists = !!(await getUserByEmail(email));
        if (emailExists) {
            throw new EmailAlreadyExistsError();
        }

        // If all good, create the user document and save it in the DB
        const newUser = User.build({ email, password });
        await newUser.save();

        // Generate a JWT for the user
        const { id, email: newUserEmail } = newUser;
        const jwtClaims: JWTClaims = {
            id,
            email: newUserEmail
        }
        // We are correctly handling when JWT_KEY is undefined.
        const userJwt = jwt.sign(jwtClaims, process.env.JWT_KEY!);

        // Store the jwt on the request object
        // Cookie session will automatically set the jwt as a cookie on the user's browser (using the Set-Cookie header, perhaps)
        req.session = {
            jwt: userJwt
        }

        res.status(201).json(newUser);
    }
)

export { router as signUpRouter };