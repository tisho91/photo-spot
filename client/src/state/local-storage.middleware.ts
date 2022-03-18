import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const localStorageMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => async (action: any) => {
  if ([ LOGIN_FULFILLED_ACTION, REGISTER_FULFILLED_ACTION ].includes(action.type)) {
    localStorage.setItem('token', action.payload.token);
    localStorage.setItem('tokenExpirationDate', action.payload.tokenExpirationDate);
  }

  if (action.type === LOGOUT_ACTION) {
    localStorage.clear();
  }
  return next(action)
}

export const LOGOUT_ACTION = 'user/logout'
export const LOGIN_FULFILLED_ACTION = 'user/login/fulfilled'
export const REGISTER_FULFILLED_ACTION = 'user/register/fulfilled'

