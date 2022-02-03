import { sign } from 'jsonwebtoken';

export const createToken = (userId: string): string => {
    const privateKey = process.env.JWT_PRIVATE_KEY as string;
    return sign(
        { userId },
        privateKey,
        { expiresIn: '1d' }
    )
}
