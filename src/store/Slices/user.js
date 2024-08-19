import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      profilePicUrl: null,
      profile: {},
      preference: {},
      chats: {},
    },
    isLoading: null,
    isError: null,
  },

  reducers: {
    errorHandler() {},

    loaderHandler(state, action) {
      state.isLoading = action.payload;
    },

    UserProfileUpload() {},

    //Fetching Data
    GetUserData(state, action) {},
    GetUserProflie(state, action) {},
    GetUserPreference(state, action) {},

    //edit / update
    EditUserProfile(state, action) {},
    EditUserData(state, action) {},
    EditUserPreference(state, action) {},

    //Create
    SetUserData(state, action) {
      // console.log(action?.payload);
      state.user.firstName = action.payload.name?.split(" ")[0];
    }, //Login or signup
    SetUserProfile(state, action) {},
    SetUserPreference(state, action) {},

    GetAllChats(state, action) {},
    UpdateChats(state, action) {},
  },
});

export const userAction = userSlice.actions;

export default userSlice;

//api - thunk
