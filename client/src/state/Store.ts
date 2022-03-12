import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { localStorageMiddleware, } from './local-storage.middleware';
import { errorHandlerMiddleware } from './error-handler.middleware';
import spotsReducer from './spotSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        spots: spotsReducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(localStorageMiddleware, errorHandlerMiddleware),
});

export default store;

