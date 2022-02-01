import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { logOut } from '../services/firebase';
import { login, register } from '../services/auth';
import { stat } from 'fs';

const uid = localStorage.getItem('uid')
const token = localStorage.getItem('token')

const initialState = {
    uid,
    token: '',
    email: '',
    tokenExpirationDate: null
};


export const sendLoginRequest = createAsyncThunk(
    'auth/login',
    async (loginData: any, thunkAPI) => {
        try {
            const response: any = await login(loginData);
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data.message });
            }
            return { ...data };
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const sendLogoutRequest = createAsyncThunk(
    'auth/logout',
    async (data, thunkAPI) => {
        try {
            return '';
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const sendRegisterRequest = createAsyncThunk(
    'auth/register',
    async (userData: any, thunkAPI) => {
        try {
            const response: any = await register(userData);
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data.message });
            }
            return { ...data };
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(sendLoginRequest.rejected, (state: any, action: any) => {
            console.log(action)
            state.isLoading = false;
            return state;
        })
        builder.addCase(sendLoginRequest.fulfilled, (state: any, action: any) => {
            state.uid = action.payload.userId;
            state.isLoading = false;
            state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();;
            return state
        });
        builder.addCase(sendLoginRequest.pending, (state: any) => {
            state.isLoading = true;
            return state;
        });
        builder.addCase(sendRegisterRequest.fulfilled, (state: any, action: any) => {
            state.uid = action.payload.userId;
            state.email = action.payload.email
            state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
            state.token = action.payload.token;
            return state
        });
        builder.addCase(sendLogoutRequest.fulfilled, (state: any, action: any) => {
            state.uid = ''
            return state;
        });
    }
});

export const authSelector = (state: any) => state.auth;
export default authSlice.reducer;
