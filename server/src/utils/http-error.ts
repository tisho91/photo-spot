import { ERROR } from '../common/constants/error-codes';

export class HttpError extends Error {
    code: number;

    constructor(message: ERROR, errorCode = 500) {
        super(message);
        this.code = errorCode;
    }
}
