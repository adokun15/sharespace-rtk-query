import { api } from "../api";
import { DbError } from "../../utils/ErrorHandlers";
import { UploadImageHelper } from "../../firebase/Storage";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";

const UploadImageSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    UploadImage: builder.mutation({
      async queryFn({ file, uid }) {
        //  return { data: null };
        try {
          const filePath = `users/${uid}/profile/${file?.name}`;
          const url = await UploadImageHelper(filePath, file);

          await UpdateADocumentObject(uid, filePath, {
            key: "photourl",
            newValue: url,
          });
          return { data: "Upload Success" };
        } catch (err) {
          throw new DbError(err?.message);
        }
      },
    }),
    invalidateTags: (result, err, arg) => [{ type: "user", id: arg.uid }],
  }),
});

export const { useUploadImageMutation } = UploadImageSlice;
