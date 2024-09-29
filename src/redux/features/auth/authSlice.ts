import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  name: string;
  iat: number;
  exp: number;
};
type TAuthInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthInitialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token =null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser , logout} = authSlice.actions;

export default authSlice.reducer;
