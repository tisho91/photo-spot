import { JwtPayload, sign, verify } from 'jsonwebtoken';

export const createToken = (userId: string): any => {
    const privateKey = process.env.JWT_PRIVATE_KEY as string;
    const expiresIn = '1d'
    const token = sign(
        { userId },
        privateKey,
        { expiresIn }
    )
    const { exp } = (verify(token, privateKey) as JwtPayload);


    return {
        token,
        tokenExpirationDate: exp
    }
}
