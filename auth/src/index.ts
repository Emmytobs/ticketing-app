import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const startApp = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env var is undefined')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connnected to DB')
    } catch (error) {
        console.log('Error connecting to DB', error)
    }

    app.listen(3000, () => console.log('Listening on port 3000!'))
}

startApp();
