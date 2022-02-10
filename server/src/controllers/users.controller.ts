import { validationResult } from 'express-validator'
import { HttpError } from '../utils/http-error'
import { createUser, getUserByToken, signIn, updateProfile } from '../services/users.service';
import { createToken } from '../utils/create-token';

export async function getCurrentUser(req: any, res: any, next: any) {
    try {
        const user = await getUserByToken(req.params.userId);
        res.json({ user })
    } catch (error) {
        return next(error)
    }
}

export async function signup(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid email input', 402))
    }
    try {
        const user = await createUser(req.body);
        let token = createToken(user.id);
        res.status(201).json({ token })
    } catch (error) {
        return next(error)
    }
}

export async function login(req: any, res: any, next: any) {
    const { email, password } = req.body;
    try {
        const user = await signIn(email, password)
        const token = createToken(user.id);
        res.status(201).json({ token })
    } catch (error) {
        return next(error)
    }

}


// TODO - change this to edit user and add avatar
export async function updateUserProfile(req: any, res: any, next: any) {
    try {
        const userId = req.params.userId;
        const name = req.body.name;
        const avatar = req.file.location;
        const user = await updateProfile(userId, name, avatar)
        res.status(201).json({ user })
    } catch (error) {
        return next(error)
    }
}

