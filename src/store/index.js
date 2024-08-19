import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./Slices/user";
import { ChatSlice } from "./Slices/Chat";
import { MatchUpSlice } from "./Slices/matches";
import { ModalSlice } from "./Slices/modal";

//Reducers
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: ModalSlice.reducer,
    matches: MatchUpSlice.reducer,
    userChat: ChatSlice.reducer,
    //blog: blogSlice.reducer
  },
});

export default store;
