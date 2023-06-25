import { User, UserDoc } from "../models/user";

export const getUserByEmail = async (email: string): Promise<UserDoc | null> => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error();
    }
}