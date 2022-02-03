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
            userId: user.id, email: user.email
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
            userId: user.id, email: user.email
        }
    } catch (error) {
        throw new HttpError('DB Error', 500);
    }
}


