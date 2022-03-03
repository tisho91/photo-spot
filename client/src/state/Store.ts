import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { localStorageMiddleware, } from './local-storage.middleware';
import { errorHandlerMiddleware } from './error-handler.middleware';
import spotsReducer from './spotSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        spots: spotsReducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(localStorageMiddleware, errorHandlerMiddleware),
});

export default store;

