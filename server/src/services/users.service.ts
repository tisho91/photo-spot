import User from '../models/user.schema'
import { DocumentDefinition } from 'mongoose'
import { IUser } from '../models/user.model';
import { compare, hash } from 'bcryptjs'
import { ERROR } from '../common/constants/error-codes';

export async function findUser(email: string) {
    try {
        return User.findOne({ email });
    } catch (error) {
        return new Error(ERROR.USER_NOT_FOUND)
    }
}

export async function createUser(input: DocumentDefinition<IUser>) {
    const { name, email, password } = input;
    const foundUser = await findUser(email)
    if (foundUser) {
        throw new Error(ERROR.USER_ALREADY_EXISTS);
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
        throw new Error(ERROR.DATABASE_ERROR);

    }

}

export async function signIn(email: string, password: string) {
    const user: any = await findUser(email);

    if (!user) {
        throw new Error(ERROR.IVALID_CREDENTIALS);
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
        throw new Error(ERROR.IVALID_CREDENTIALS);

    }
    try {
        return {
            id: user.id
        }
    } catch (error) {
        throw new Error(ERROR.DATABASE_ERROR);
    }
}

export async function getUserByToken(userId: string) {
    try {
        const user = await User.findById(userId, '-password')
        return user?.toObject({ getters: true })
    } catch (error) {
        throw new Error(ERROR.CANNOT_FIND_USER)
    }
}

export async function updateProfile(userId: string, name: string, avatar: string) {
    try {
        const user = await User.findById(userId, '-password');
        if (!user) {
            throw new Error(ERROR.CANNOT_EDIT_USER)
        }
        user.name = name;
        user.avatar = avatar;

        try {
            await user.save();
        } catch (error) {
            throw new Error(ERROR.CANNOT_EDIT_USER)
        }
        return user.toObject({ getters: true })
    } catch (error) {
        throw new Error(ERROR.CANNOT_EDIT_USER)
    }
}


