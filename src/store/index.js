import { configureStore } from "@reduxjs/toolkit";

//import userSlice from "./Slices/user";
//import { ChatSlice } from "./Slices/Chat";
//import { MatchUpSlice } from "./Slices/matches";
import { ModalSlice } from "./Slices/modal";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

//Reducers
const store = configureStore({
  reducer: {
    modal: ModalSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDm) => gDm().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
