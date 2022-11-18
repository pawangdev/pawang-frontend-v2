import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value
    },
    closeSidebar: (state) => {
      state.value = false
    },
  }
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
