import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, login, register, updateUserProfile } from '../services/auth';

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
            const response: any = await login(loginData);
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data.message });
            }
            const tokenExpirationDate = new Date(0);
            tokenExpirationDate.setUTCSeconds(data.tokenExpirationDate)
            return { ...data, tokenExpirationDate: tokenExpirationDate.toISOString() };
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const getCurrentUserDataRequest = createAsyncThunk(
    'auth/getUserData',
    async (data: void, thunkAPI) => {
        try {
            const response: any = await getCurrentUser();
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data.message.name });
            }
            return { ...data };
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)


export const sendRegisterRequest = createAsyncThunk(
    'auth/register',
    async (userData: any, thunkAPI) => {
        try {
            const response: any = await register(userData);
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data.message });
            }
            const tokenExpirationDate = new Date(0);
            tokenExpirationDate.setUTCSeconds(data.tokenExpirationDate)
            return { ...data, tokenExpirationDate: tokenExpirationDate.toISOString() };

        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)


export const sendUpdateProfileRequest = createAsyncThunk(
    'user/updateProfile',
    async ({ name, avatar }: any, thunkAPI) => {
        try {
            const response: any = await updateUserProfile(name, avatar);
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
        builder.addCase(sendLoginRequest.rejected, (state: any, action: any) => {
            return state;
        })
        builder.addCase(sendLoginRequest.fulfilled, (state: any, action: any) => {
            state.token = action.payload.token;
            state.tokenExpirationDate = action.payload.tokenExpirationDate;
            return state
        });
        builder.addCase(sendLoginRequest.pending, (state: any) => {
            return state;
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
