import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SERVER } from '../configuration/environment';

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers.access_token;
    // console.log('req.headers is', token);
    token = token.replace(/\"/g, "");
    if (token) {
        const headerType = token.split(' ')[0];
        const tokenValue = token.split(' ')[1];
        // console.log('headerType is', headerType);
        // console.log('tokenValue is', tokenValue);
        if (headerType === 'Bearer') {
            try {
                const userInfo: any = await jwt.verify(tokenValue, SERVER.JWT_PUBLIC_KEY);
                if (userInfo) {
                    req.app.locals['userId'] = userInfo.userId; /* for creating global variable for all project */
                    next();
                } else {
                    return res.status(401).json({
                        success: false,
                        statusCode: 499,
                        message: 'session expire'
                    });
                }
            } catch (err) {
                console.error(err);
                return res.status(401).json({
                    success: false,
                    statusCode: 499,
                    message: 'unauthrized user',
                    extendedMessage: err.message
                })
            }
        }
    } else {
        return res.status(401).json({
            success: false,
            statusCode: 499,
            message: 'unauthrized user',
        })
    }
}

