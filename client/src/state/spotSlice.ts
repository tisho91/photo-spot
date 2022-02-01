import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllSpots } from '../services/spots'

const initialState = {
    spots: []
};

export const getAllSpotsRequest = createAsyncThunk(
    'spots/getAllSpots',
    async (data: void, thunkAPI) => {
        try {
            const response: any = await getAllSpots()
            const data = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: data });
            }
            return data;
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
        builder.addCase(getAllSpotsRequest.rejected, (state: any, action: any) => {
            console.log(action)
            return state;
        })
        builder.addCase(getAllSpotsRequest.fulfilled, (state: any, action: any) => {
            state.spots = action.payload.spots;
            return state;
        })
    }
})

export const spotsSelector = (state: any) => state.spots;
export default spotSlice.reducer;
