const HttpError = require('../utils/http-error')
import { verify } from 'jsonwebtoken';


export function authGuard(req: any, res: any, next: any) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new HttpError('Auth failed', 401))
        }
        const privateKey = process.env.JWT_PRIVATE_KEY as string;
        const decodedToken: any = verify(token, privateKey)
        req.userData = { userId: decodedToken.userId }
        next();
    } catch (error) {
        return next(error)
    }


}
