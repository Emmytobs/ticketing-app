import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt);

export class AuthService {
    static async hashPassword(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`
    }

    static async comparePasswords(plainTextPassword: string, storedHashedPassword: string) {
        const [hashedPart, salt] = storedHashedPassword.split('.');
        const buffer = (await scryptAsync(plainTextPassword, salt, 64)) as Buffer;
        return buffer.toString('hex') === hashedPart
    }
}