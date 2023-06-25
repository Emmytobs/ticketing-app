import mongoose from "mongoose";
import { AuthService } from "../services/auth-service";

interface UserCreationAttributes {
    email: string;
    password: string
}

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserCreationAttributes): UserDoc
}

export interface UserDoc extends mongoose.Document {
    email: string;
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret['_id'];
        delete ret['password'];
        delete ret['__v'];
      }  
    }
})

userSchema.statics.build = function(attr: UserCreationAttributes) {
    return new User(attr);
}
userSchema.pre('save', async function(done) {
    // Only hash password if it was modified. 
    // This is to avoid re-hashing an already hashed password
    if (this.isModified('password')) {
        const hashedPassword = await AuthService.hashPassword(this.get('password'))
        this.set('password', hashedPassword);
    }
    done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };