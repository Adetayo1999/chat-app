import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    loading: false,
    data: [],
    error: "",
  },
  reducers: {
    get(state) {
      state.loading = true;
    },
    success(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    failure(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
    update(state, action) {
      state.data = action.payload;
    },
  },
});

export const { get, success, failure, update } = conversationSlice.actions;
export default conversationSlice.reducer;
