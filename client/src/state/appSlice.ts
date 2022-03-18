import { createSlice } from '@reduxjs/toolkit';


interface AppReducer {
    isSideMenuOpen: boolean
}


const openSideMenuAction = (state: AppReducer): void => {
  state.isSideMenuOpen = true;
}
const closeSideMenuAction = (state: AppReducer): void => {
  state.isSideMenuOpen = false;
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isSideMenuOpen: false
  },
  reducers: {
    openSideMenu: openSideMenuAction,
    closeSideMenu: closeSideMenuAction
  }
})

export const appSelector = (state: any): any => state.app;
export const { openSideMenu, closeSideMenu } = appSlice.actions
export default appSlice.reducer;
