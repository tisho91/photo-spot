import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../utils/http-error';



export function authGuard(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    let token;
    try {
        token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new HttpError('auth failed', 401))
        }
        const privateKey = process.env.JWT_PRIVATE_KEY as string;
        const decodedToken: any = verify(token, privateKey);
        req.params.userId = decodedToken.userId;
        next();
    } catch (error) {
        return next(error)
    }


}
