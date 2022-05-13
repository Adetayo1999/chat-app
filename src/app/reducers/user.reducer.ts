import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    error: "",
  },
  reducers: {
    get: (state) => {
      state.loading = true;
      state.user = {};
      state.error = "";
    },
    success: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    failure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { get, success, failure } = userSlice.actions;

export default userSlice.reducer;
