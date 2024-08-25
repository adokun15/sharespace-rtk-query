import { CreateProfile, EditProfile, GetProfile } from "../../api/User/Profile";
import { api } from "../api";

const ProfileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      async queryFn(data) {
        try {
          await CreateProfile(data.user_id, { ...data });
          return { data: "Profile Create Successfully" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    editProfile: builder.mutation({
      async queryFn(data) {
        try {
          await EditProfile(data.uid, { ...data });
          return { data: "Profile Updated Successfully" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    getProfile: builder.query({
      async queryFn(id) {
        try {
          const userProfile = await GetProfile(id);
          return { data: userProfile };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useGetProfileMutation,
  useEditProfileMutation,
  useCreateProfileMutation,
} = ProfileSlice;
