import { createSlice } from '@reduxjs/toolkit';


interface AppReducer {
    isSideMenuOpen: boolean
}


const toggleSideMenuAction = (state: AppReducer) => {
    state.isSideMenuOpen = !state.isSideMenuOpen;
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isSideMenuOpen: false
    },
    reducers: {
        toggleSideMenu: toggleSideMenuAction
    }
})

export const appSelector = (state: any) => state.app;
export const { toggleSideMenu } = appSlice.actions
export default appSlice.reducer;
