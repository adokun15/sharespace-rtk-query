import { api } from "../api";
import { DbError, UnAuthorizedError } from "../../utils/ErrorHandlers";
import { db, storage } from "../../firebase/init";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
const UploadImageSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    UploadImageInAchat: builder.mutation({}),
    UploadImage: builder.mutation({
      async queryFn({ file, uid }) {
        //  return { data: null };
        try {
          if (!uid) {
            throw new UnAuthorizedError("UNAUTHORIZED ACCESS!");
          }

          const filePath = `users/${uid}/${file?.name}`;

          const storageRef = ref(storage, filePath);

          const upload = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(upload.ref);

          await updateDoc(doc(db, "users", uid), { photo: url });
          return { data: "Successfully stored!" };

          // return { data: null };
        } catch (err) {
          throw new DbError(err?.message);
        }
      },
    }),
    invalidateTags: ["user"],
  }),
});

export const { useUploadImageMutation } = UploadImageSlice;
