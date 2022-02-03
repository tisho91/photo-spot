export const customMiddleware = (store: any) => (next: any) => async (action: any) => {
    if ([ LOGIN_FULFILLED_ACTION, REGISTER_FULFILLED_ACTION ].includes(action.type)) {
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('uid', action.payload.uid);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('tokenExpirationDate', action.payload.tokenExpirationDate);
    }

    if (action.type === LOGOUT_OUT_ACTION) {
        localStorage.clear();
    }
    return next(action)
}

export const LOGOUT_OUT_ACTION = 'auth/logout/fulfilled'
export const LOGIN_FULFILLED_ACTION = 'auth/login/fulfilled'
export const REGISTER_FULFILLED_ACTION = 'auth/register/fulfilled'