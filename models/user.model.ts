//Define our about us schema
import * as mongoose from 'mongoose'
import { USER_ROLES, USER_GENDER } from '../configuration/app.constant';

export interface UserDocument extends mongoose.Document {
    _id: string;
    name?: string;
    password?: string;
    email?: string;
    phoneNo?: string;
    gender?: string;
    role?: string;
    dob?: Date;
    isActive?: Boolean;
    about?: string;
    createdAt?: Date;
}

const UserSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    phoneNo: { type: String, unique: true },
    about: { type: String, default: '' },
    role: {
        type: String,
        enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
        default: USER_ROLES.USER
    },
    gender: {
        type: String,
        enum: [
            USER_GENDER.MALE,
            USER_GENDER.FEMALE,
            USER_GENDER.OTHER,
        ],
    },
    isActive: { type: Boolean, 'default': true },
    dob: { type: Date },
    createdAt: { type: Date, 'default': Date.now },
});

export const UserModel: mongoose.Model<UserDocument> =
    mongoose.model<UserDocument>('users', UserSchema, 'users');
