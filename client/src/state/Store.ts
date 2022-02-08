import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { customMiddleware } from './customMiddleware';
import statusReducer from './statusSlice';
import spotsReducer from './spotSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,

        status: statusReducer,
        spots: spotsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(customMiddleware, apiSlice.middleware),
});

export default store;

