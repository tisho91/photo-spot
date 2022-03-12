import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpService } from '../common/services';
import { createFormData, getTokenData } from '../common/utils';


const initialState = {
    auth: { ...getTokenData() },
    data: {}
};


export const sendLoginRequest = createAsyncThunk(
    'user/login',
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
    'user/getUserData',
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
    'user/register',
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


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.auth.token = null
            state.auth.tokenExpirationDate = null
            state.data = {};
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(sendLoginRequest.fulfilled, (state: any, action: any) => {
            state.auth.token = action.payload.token;
            state.auth.tokenExpirationDate = action.payload.tokenExpirationDate;
            return state
        });
        builder.addCase(sendRegisterRequest.fulfilled, (state: any, action: any) => {
            state.auth.token = action.payload.token;
            state.auth.tokenExpirationDate = action.payload.tokenExpirationDate;
            return state
        });
        builder.addCase(getCurrentUserDataRequest.fulfilled, (state: any, action: any) => {
            state.data = action.payload.user;
            return state;
        });
        builder.addCase(sendUpdateProfileRequest.fulfilled, (state: any, action: any) => {
            state.user = action.payload.user;
            return state;
        })
    }
});

export const authSelector = (state: any) => state.user.auth;
export const userSelector = (state: any) => state.user.data;
const { actions } = userSlice
export const { logout } = actions;
export default userSlice.reducer;
