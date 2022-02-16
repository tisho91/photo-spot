import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNewSpot, getAllSpots } from '../services/spots'

const initialState = {
    spots: []
};

export const createNewSpotRequest = createAsyncThunk(
    'spots/createNewSpot',
    async (formData: any, thunkAPI) => {
        try {
            const response: any = await createNewSpot(formData)
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
        builder.addCase(createNewSpotRequest.fulfilled, (state: any, action: any) => {
            console.log(action.payload)
            // state.spots = action.payload.spots;
            return state;
        })
        builder.addCase(createNewSpotRequest.rejected, (state: any, action: any) => {
            console.log(action.payload)
            // state.spots = action.payload.spots;
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
