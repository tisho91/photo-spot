import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpService } from '../common/services';
import { createFormData } from '../common/utils';
import { SpotData } from '../common/types';

const initialState = {
  spots: [],
};

export const createNewSpotRequest = createAsyncThunk(
  'spots/createNewSpot',
  async (data: SpotData, thunkAPI) => {
    try {
      const response = await httpService.post('/spots', createFormData(data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllSpotsRequest = createAsyncThunk(
  'spots/getAllSpots',
  async (data: void, thunkAPI) => {
    try {
      const response = await httpService.get('/spots');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const spotSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSpotsRequest.fulfilled, (state: any, action: any) => {
      state.spots = action.payload.spots;
      return state;
    });
  },
});

export const spotsSelector = (state: any): any => state.spots;
export const findSpotByIdSelector =
  (spotId: string) =>
    (state: any): any =>
      state.spots.spots.find((spot: any) => spot.id === spotId);
export default spotSlice.reducer;
