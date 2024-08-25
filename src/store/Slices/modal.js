import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  initialState: {
    modal: {
      SelectItemPopOver: {
        isOpened: false,
        items: [],
        selectedItem: null,
        formSelects: [],
      },
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
    toggleSelectItemPopOver(state, action) {
      state.modal.SelectItemPopOver.isOpened =
        !state.modal.SelectItemPopOver.isOpened;

      if (state.modal.SelectItemPopOver.isOpened) {
        //singleInput --- an array of option
        state.modal.SelectItemPopOver.items = action.payload;
      } else {
        state.modal.SelectItemPopOver.items = [];
      }
    },

    addSingleItemtoSelect(state, action) {
      //iNCREMENT TO SINGLE LIST

      const existingFormSelectIndex =
        state.modal.SelectItemPopOver.formSelects.findIndex(
          (item) => item.inputName === action.payload.inputName
        );

      const existingFormSelect =
        state.modal.SelectItemPopOver.formSelects[existingFormSelectIndex];

      if (existingFormSelect) {
        const FormSelect = {
          ...existingFormSelect,
          result: {
            name: action.payload.result.name,
            value: action.payload.result.value,
          },
        };

        state.modal.SelectItemPopOver.formSelects[existingFormSelectIndex] =
          FormSelect;
      } else {
        state.modal.SelectItemPopOver.formSelects =
          state.modal.SelectItemPopOver.formSelects.concat(action.payload);
      }
    },
    clearSelect(state) {
      state.modal.SelectItemPopOver.formSelects = [];
      state.modal.SelectItemPopOver.selectedItem = null;
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
