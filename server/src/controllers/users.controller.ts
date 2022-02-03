import { validationResult } from 'express-validator'
import User from '../models/user.schema'
import { HttpError } from '../utils/http-error'
import { createUser, signIn } from '../services/users.service';
import { createToken } from '../utils/create-token';

// TODO - remove this functionallity
export async function getUsers(req: any, res: any, next: any) {
    let users
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(error)
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

export async function signup(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid email input', 402))
    }

    try {
        const user = await createUser(req.body);
        let token = createToken(user.userId);
        res.status(201).json({ ...user, token })
    } catch (error) {
        return next(error)
    }
}

export async function login(req: any, res: any, next: any) {
    const { email, password } = req.body;
    try {
        const user = await signIn(email, password)
        const token = createToken(user.userId);
        res.status(201).json({ ...user, token })
    } catch (error) {
        return next(error)
    }

}


// TODO - change this to edit user and add avatar
export async function uploadAvatar(req: any, res: any, next: any) {
    res.status(201).json({ avatar: req.file.location })
}

