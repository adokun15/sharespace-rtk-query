import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  initialState: {
    modal: {
      HomeNavigationPopOver: false,
      FindRoommatePopOver: false,
      SingleChatPopOver: false,
      EditPreferencePopOver: { isOpened: false, mode: null },
      EditProfilePopOver: { isOpened: false, mode: null },
    },
    isLoading: null,
    isError: null,
  },
  name: "modal",

  reducers: {
    toggleFindRoommatePopover(state) {
      state.modal.FindRoommatePopOver = !state.modal.FindRoommatePopOver;
    },
    toggleHomeNavigationPopOver(state) {
      state.modal.HomeNavigationPopOver = !state.modal.HomeNavigationPopOver;
    },
    toggleSingleChatPopOver(state) {
      state.modal.SingleChatPopOver = !state.modal.SingleChatPopOver;
    },
    toggleEditPreferencePopOver(state, action) {
      // EditPreferencePopOver
      state.modal.EditPreferencePopOver.isOpened =
        !state.modal.EditPreferencePopOver.isOpened;
      state.modal.EditPreferencePopOver.mode = action.payload.mode;
    },
    toggleEditProfilePopOver(state, action) {
      //Toggle visibility
      state.modal.EditProfilePopOver.isOpened =
        !state.modal.EditProfilePopOver.isOpened;
      //Provide modal
      state.modal.EditProfilePopOver.mode = action.payload.mode;
    },
  },
});

export const ModalAction = ModalSlice.actions;
