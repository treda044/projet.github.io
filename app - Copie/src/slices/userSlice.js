import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

export const {
  loginAction,
  logoutAction
} = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
