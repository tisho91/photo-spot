import { isRejectedWithValue, Middleware, MiddlewareAPI, } from '@reduxjs/toolkit'

export const errorHandlerMiddleware: Middleware =
    // eslint-disable-next-line no-unused-vars
    (store: MiddlewareAPI) => (next) => async (action) => {
      if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!')
        console.warn(action.payload)
      }
      return next(action)
    }

