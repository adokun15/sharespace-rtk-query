import { doc, getDoc } from "firebase/firestore";
import { db } from "./init";
import {
  DbError,
  NotFoundError,
  UnAuthorizedError,
} from "../utils/ErrorHandlers";

export const getDocument = async (id, path = "users") => {
  if (!id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  const docRef = doc(db, path, id);
  try {
    const docData = await getDoc(docRef);

    if (docData.exists()) {
      return { ...docData.data(), id: docData.id };
    } else {
      throw new NotFoundError("Not Found!");
    }
  } catch (e) {
    console.log(e);
    throw new DbError(e?.code || e?.message || "Something went wrong");
  }
};
