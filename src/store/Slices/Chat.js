import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  initialState: {
    chat: {},
    issLoading: null,
    isError: null,
  },
  name: "chat",
  reducers: {
    getSingleChat(state, action) {},
    updateSingleChat(state, action) {},
    deleteSingleChat(state, action) {},
  },
});

export const ChatAction = ChatSlice.actions;
