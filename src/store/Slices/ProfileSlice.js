import { getDocument } from "../../firebase/GetDocument";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";

const ProfileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      async queryFn({ updateItemValue, id }) {
        try {
          const obj = await UpdateADocumentObject(id, "users", {
            key: "profile",
            newValue: updateItemValue,
          });
          return { data: obj };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "profile", id: arg.doc_id },
      ],
    }),

    getProfile: builder.query({
      //get user preference
      async queryFn(id) {
        //Get Preference
        await getDocument(id);
      },
      transformResponse: (res) => res?.preference,
      providesTags: (result, error, id) => [{ type: "profile", id }],
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = ProfileSlice;
