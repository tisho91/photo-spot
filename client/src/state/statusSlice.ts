import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setLoadingStatus: (state, action: any) => {
            state.isLoading = action.payload;
            return state;
        }
    },
})


export const statusSelector = (state: any) => state.status;
export default statusSlice.reducer;
