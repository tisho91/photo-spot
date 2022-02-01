import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendLogoutRequest } from './authSlice';
import { uploadAvatar } from '../services/auth'

const initialState = {
    email: '',
    displayName: '',
    hasAvatar: false,
    avatar: '',
    userDataRequestComplete: false //TODO check if needed
}
// TODO decide between avatarUrl: string || hasAvatar:boolean

export const getUserDataRequest = createAsyncThunk(
    'user/getData',
    async (uid: any, thunkAPI) => {
        try {
            return {};
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const setUserData = createAsyncThunk(
    'user/setData',
    async (data: any, thunkAPI) => {
        try {
            return {}
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
export const setUserAvatar = createAsyncThunk(
    'user/setAvatar',
    async ({ avatar, uid }: any, thunkAPI) => {
        try {
            const response: any = await uploadAvatar(avatar);
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getUserDataRequest.fulfilled, (state: any, action: any) => {
            state.userDataRequestComplete = true
            state.displayName = action.payload?.displayName
            state.hasAvatar = action.payload?.hasAvatar
            state.avatarUrl = action.payload?.avatarUrl
            return state;
        });
        builder.addCase(setUserData.fulfilled, (state: any, action: any) => {
            state.email = action.payload?.email
            state.displayName = action.payload?.displayName
            state.hasAvatar = action.payload?.hasAvatar
            state.avatarUrl = action.payload?.avatarUrl
            return state;
        });
        builder.addCase(sendLogoutRequest.fulfilled, (state: any, action: any) => {
            return initialState;
        });
        builder.addCase(setUserData.rejected, (state: any, action: any) => {
            console.log('error', action.payload)
        });
        builder.addCase(setUserAvatar.fulfilled, (state: any, action: any) => {
            state.hasAvatar = !!action.payload
            state.avatar = action.payload.avatar
        });
        builder.addCase(setUserAvatar.rejected, (state: any, action: any) => {
            console.log('error', action.payload)
        });
    }
})
export const userSelector = (state: any) => state.user;
export default userSlice.reducer;
