import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ISODateTimeString } from 'aws-sdk/clients/iotwireless';

export interface Token {
    token: string,
    tokenExpirationDate: ISODateTimeString;
}

export const createToken = (userId: string): Token => {
    const privateKey = process.env.JWT_PRIVATE_KEY as string;
    const expiresIn = '1d'
    const token = sign(
        { userId },
        privateKey,
        { expiresIn }
    )
    const { exp } = (verify(token, privateKey) as JwtPayload);
    const tokenExpirationDate = new Date(0);
    tokenExpirationDate.setUTCSeconds(exp as number)

    return {
        token,
        tokenExpirationDate: tokenExpirationDate.toISOString()
    }
}
