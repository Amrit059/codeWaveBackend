import * as jwt from 'jsonwebtoken';
import { APP_CONSTANTS } from './configuration/app.constant';
import { SERVER } from './configuration/environment';
import { UserDocument } from './models/user.model';

export function createJsonWebToken(userInfo): string {
    const tokenData: { timeStamp: Date, userInfo: UserDocument, exp?: Number } = {
        timeStamp: new Date,
        userInfo: userInfo,
        exp: APP_CONSTANTS.JWT_EXP_TIME
    }
    const token = jwt.sign(tokenData, SERVER.JWT_PUBLIC_KEY);
    return token;
}