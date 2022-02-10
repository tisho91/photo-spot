import User from '../models/user.schema'
import { DocumentDefinition } from 'mongoose'
import { IUser } from '../models/user.model';
import { HttpError } from '../utils/http-error';
import { compare, hash } from 'bcryptjs'

export async function findUser(email: string) {
    try {
        return User.findOne({ email });
    } catch (error) {
        return (error)
    }
}

export async function createUser(input: DocumentDefinition<IUser>) {
    const { name, email, password } = input;
    const foundUser = await findUser(email)
    if (foundUser) {
        throw new HttpError('User exists', 422);
    }
    let hashedPassword = await hash(password, 12);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        spots: []
    });
    try {
        await user.save();
        return {
            id: user.id
        }
    } catch (error) {
        throw new HttpError('DB Error', 500);
    }

}

export async function signIn(email: string, password: string) {
    const user: any = await findUser(email);

    if (!user) {
        throw new HttpError('Invalid credentials', 402);
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
        throw new HttpError('Invalid credentials', 402);
    }
    try {
        return {
            id: user.id
        }
    } catch (error) {
        throw new HttpError('DB Error', 500);
    }
}

export async function getUserByToken(userId: string) {
    try {
        const user = await User.findById(userId, '-password')
        return user?.toObject({ getters: true })
    } catch (error) {
        throw error
    }
}

export async function updateProfile(userId: string, name: string, avatar: string) {
    try {
        const user = await User.findById(userId, '-password');
        if (!user) {
            throw new HttpError('Cannot edit bro', 401)
        }
        user.name = name;
        user.avatar = avatar;

        try {
            await user.save();
        } catch (error) {
            throw error
        }
        return user.toObject({ getters: true })
    } catch (error) {
        throw error
    }
}


