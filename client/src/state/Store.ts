import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { customMiddleware } from './customMiddleware';
import spotsReducer from './spotSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        spots: spotsReducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(customMiddleware),
});

export default store;

