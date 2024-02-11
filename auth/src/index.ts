import mongoose from 'mongoose';
import { app } from './app';

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
