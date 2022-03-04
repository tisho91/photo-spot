import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpService from '../services/http.service';
import createFormData from '../utils/createFormData';

let tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
let token = localStorage.getItem('token');

if (tokenExpirationDate) {
    const tokenExpiration = new Date(tokenExpirationDate);
    if (tokenExpiration < new Date()) {
        token = null;
        tokenExpirationDate = null;
    }
}


const initialState = {
    token,
    tokenExpirationDate,
    user: {}
};


export const sendLoginRequest = createAsyncThunk(
    'auth/login',
    async (loginData: any, thunkAPI) => {
        try {
            const response: any = await httpService.post('/users/login', loginData);
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getCurrentUserDataRequest = createAsyncThunk(
    'auth/getUserData',
    async (data: void, thunkAPI) => {
        try {
            const response: any = await httpService.get('/users/me');
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const sendRegisterRequest = createAsyncThunk(
    'auth/register',
    async (userData: any, thunkAPI) => {
        try {
            const response: any = await httpService.post('/users/signup', userData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const sendUpdateProfileRequest = createAsyncThunk(
    'user/updateProfile',
    async (data: any, thunkAPI) => {
        try {
            const response: any = await httpService.patch('/users/me', createFormData(data));
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.user = {};
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(sendLoginRequest.fulfilled, (state: any, action: any) => {
            state.token = action.payload.token;
            state.tokenExpirationDate = action.payload.tokenExpirationDate;
            return state
        });
        builder.addCase(sendRegisterRequest.fulfilled, (state: any, action: any) => {
            state.token = action.payload.token;
            state.tokenExpirationDate = action.payload.tokenExpirationDate;
            return state
        });
        builder.addCase(getCurrentUserDataRequest.fulfilled, (state: any, action: any) => {
            state.user = action.payload.user;
            return state;
        });
        builder.addCase(sendUpdateProfileRequest.fulfilled, (state: any, action: any) => {
            state.user = action.payload.user;
            return state;
        })
    }
});

export const authSelector = (state: any) => state.auth;
export const userSelector = (state: any) => state.auth.user;
const { actions } = authSlice
export const { logout } = actions;
export default authSlice.reducer;
