import { DbError } from "../utils/ErrorHandlers";
import { storage } from "./init";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UpdateADocumentObject } from "./UpdateDocument";

export const UploadImageHelper = async (uid, file, filePath, dbRoute) => {
  //refDetail: url, file,
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  //listening for changes...
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (err) => {
      throw new DbError(err?.message);
    },
    async () => {
      const downloadableUrl = await getDownloadURL(uploadTask.snapshot?.ref);
      try {
        await UpdateADocumentObject(uid, dbRoute, {
          key: "photourl",
          newValue: downloadableUrl,
        });
        return { data: "Upload delivered!" };
      } catch (e) {
        throw new DbError(e.message);
      }
    }
  );
};
