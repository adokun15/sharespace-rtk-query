import { getDocument } from "../../firebase/GetDocument";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";

const PreferenceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPreference: builder.query({
      //get user preference

      async queryFn(id) {
        //Get Preference
        try {
          const data = await getDocument(id);
          return { data: { ...data?.preference, isAvail: data?.isAvailable } };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      providesTags: (result, error, id) => [{ type: "preference", id }],
    }),
    //user preference: {}
    EditPreference: builder.mutation({
      async queryFn({ updateItemValue, id }) {
        try {
          const obj = await UpdateADocumentObject(id, "users", {
            key: "preference",
            newValue: updateItemValue,
          });
          return { data: obj };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "preference", id: arg.doc_id },
      ],
    }),

    toggleAvailability: builder.mutation({
      async queryFn({ uid, prevState }) {
        try {
          await UpdateADocumentObject(uid, "users", {
            key: "isAvailable",
            newValue: !prevState,
          });
          return { data: "done" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "preference", id: arg.uid },
      ],
    }),
  }),
});

export const {
  useToggleAvailabilityMutation,

  useEditPreferenceMutation,
  useGetPreferenceQuery,
} = PreferenceSlice;
