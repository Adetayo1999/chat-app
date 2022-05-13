import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    sidebarModal: false,
  },
  reducers: {
    toggle(state) {
      state.sidebarModal = !state.sidebarModal;
    },
  },
});

export const { toggle } = modalsSlice.actions;

export default modalsSlice.reducer;
