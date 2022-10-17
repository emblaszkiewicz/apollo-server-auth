import mongoose, { Schema } from 'mongoose';
import { TUser } from '../types/types.js';

const UserSchema: Schema<TUser> = new Schema ({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    token: { type: String },
});

export default mongoose.model('User', UserSchema);