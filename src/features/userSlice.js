import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userToken: sessionStorage.getItem("token") || null,
  isLogin: sessionStorage.getItem("token") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.access_token;
    },
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
