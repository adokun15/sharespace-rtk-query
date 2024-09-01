import { DbError } from "../utils/ErrorHandlers";
import { storage } from "./init";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const UploadImageHelper = async (url, file) => {
  //refDetail: url, file,

  const storageRef = ref(storage, url);
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

      return downloadableUrl;
    }
  );
};
