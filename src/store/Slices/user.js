import { CreateUser, LoginUser } from "../../api/User/User";
import { api } from "../api";

const UserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const credential = await CreateUser({ email, password });
          return { data: credential };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const credential = await LoginUser({ email, password });
          return { data: credential };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    logout: builder.query({
      async queryFn() {},
    }),
    deleteAccount: builder.mutation({
      async queryFn() {},
    }),

    isLoggedIn: builder.mutation({
      async queryFn() {
        //gets profile, preference and user
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = UserSlice;

/*
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userId: null,
      email: null,
      profilePicUrl: null,
      username: null
     },
     profile: {},
     preference: {},
     spaces: {},
   
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
      state.user.lastName = action.payload.name?.split(" ")[1];
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
*/
