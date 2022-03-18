import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import appSlice from './appSlice';
import { localStorageMiddleware, } from './local-storage.middleware';
import { errorHandlerMiddleware } from './error-handler.middleware';
import spotsReducer from './spotSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    spots: spotsReducer
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(localStorageMiddleware, errorHandlerMiddleware),
});

export default store;

