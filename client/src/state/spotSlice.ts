import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpService from '../services/http.service';
import createFormData from '../utils/createFormData';


const initialState = {
    spots: []
};

export const createNewSpotRequest = createAsyncThunk(
    'spots/createNewSpot',
    async (data: any, thunkAPI) => {
        try {
            const response: any = await httpService.post('/spots', createFormData(data));
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const getAllSpotsRequest = createAsyncThunk(
    'spots/getAllSpots',
    async (data: void, thunkAPI) => {
        try {
            const response: any = await httpService.get('/spots');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const spotSlice = createSlice({
    name: 'spots',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(createNewSpotRequest.fulfilled, (state: any, action: any) => {
            return state;
        })
        builder.addCase(createNewSpotRequest.rejected, (state: any, action: any) => {
            return state;
        })
        builder.addCase(getAllSpotsRequest.fulfilled, (state: any, action: any) => {
            state.spots = action.payload.spots;
            return state;
        })
    }
})

export const spotsSelector = (state: any) => state.spots;
export const findSpotByIdSelector = (spotId: string) => (state: any) => state.spots.spots.find((spot: any) => spot.id === spotId);
export default spotSlice.reducer;
