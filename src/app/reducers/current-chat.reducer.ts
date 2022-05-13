import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  name: "current",
  initialState: {
    currentChat: {},
  },
  reducers: {
    set(state, action) {
      state.currentChat = action.payload;
    },
  },
});

export const { set } = currentChatSlice.actions;
export default currentChatSlice.reducer;
