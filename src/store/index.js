import { configureStore } from "@reduxjs/toolkit";
import { ModalSlice } from "./Slices/modal";
import { api, credit_api, roomate_api, user_api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

//Reducers
const store = configureStore({
  reducer: {
    modal: ModalSlice.reducer,
    [api.reducerPath]: api.reducer,
    [user_api.reducerPath]: user_api.reducer,
    [roomate_api.reducerPath]: roomate_api.reducer,
    [credit_api.reducerPath]: credit_api.reducer,
  },
  middleware: (gDm) =>
    gDm().concat(
      api.middleware,
      user_api.middleware,
      credit_api.middleware,
      roomate_api.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
