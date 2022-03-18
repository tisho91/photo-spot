import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator'
import { createUser, getUserByToken, signIn, updateProfile } from '../services/users.service';
import { createToken } from '../utils/create-token';
import { ERROR } from '../common/constants/error-codes';
import { HttpError } from '../utils/http-error';

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await getUserByToken(req.params.userId);
        res.json({ user })
    } catch (error) {
        return next(error)
    }
}


export async function signup(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(ERROR.INVALID_EMAIL))
    }
    try {
        const user = await createUser(req.body);
        let { token, tokenExpirationDate } = createToken(user.id);
        res.status(201).json({ token, tokenExpirationDate })
    } catch (error) {
        return next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const user = await signIn(email, password)
        const { token, tokenExpirationDate } = createToken(user.id);
        res.status(201).json({ token, tokenExpirationDate })
    } catch (error) {
        return next(error)
    }

}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.userId;
        const name = req.body.name;
        // @ts-ignore
        const avatar = req.file.location;
        const user = await updateProfile(userId, name, avatar)
        res.status(201).json({ user })
    } catch (error) {
        return next(error)
    }
}

