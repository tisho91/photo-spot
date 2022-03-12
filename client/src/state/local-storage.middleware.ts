import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => async (action: any) => {
    if ([ LOGIN_FULFILLED_ACTION, REGISTER_FULFILLED_ACTION ].includes(action.type)) {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('tokenExpirationDate', action.payload.tokenExpirationDate);
    }

    if (action.type === LOGOUT_OUT_ACTION) {
        localStorage.clear();
    }
    return next(action)
}

export const LOGOUT_OUT_ACTION = 'user/logout'
export const LOGIN_FULFILLED_ACTION = 'user/login/fulfilled'
export const REGISTER_FULFILLED_ACTION = 'user/register/fulfilled'
