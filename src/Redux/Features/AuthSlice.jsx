import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      const { exp } = jwt_decode(token);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.token = token;
      state.exp = exp;
    },
    logOut: (state, action) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.exp = null;
    },
    CheckForExpiration: (state, action) => {
      const { token } = action.payload;
      if (jwt_decode(token).exp < Date.now() / 1000) {
        localStorage.clear();
        state.user = null;
        state.token = null;
        state.exp = null;
      }
    },
  },
});

export const selectAuth = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
