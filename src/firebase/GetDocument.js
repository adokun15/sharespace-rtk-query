import { doc, getDoc } from "firebase/firestore";
import { db } from "./init";
import {
  DbError,
  NotFoundError,
  UnAuthorizedError,
} from "../utils/ErrorHandlers";

export const getDocument = async (id, path = "user") => {
  if (!id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  const docRef = doc(db, path, id);

  await getDoc(docRef)
    .then((docData) => {
      if (docData.exists()) {
        return { ...docData.data(), id: docData.id };
      } else {
        throw new NotFoundError("Not Found!");
      }
    })
    .catch((e) => {
      throw new DbError(e?.code || e?.message || "Something went wrong");
    });
};
