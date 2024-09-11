import { deleteDoc, doc } from "firebase/firestore";
import { DbError } from "../utils/ErrorHandlers";
import { deleteObject } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import { db } from "./init";

export const DeleteADocument = async (path, doc_id) => {
  try {
    const docRef = doc(db, path, doc_id);
    await deleteDoc(docRef);
    return { data: "success" };
  } catch (e) {
    throw new DbError(e?.message);
  }
};

export const DeleteStoragePath = async (path) => {
  try {
    await deleteObject(path);
  } catch (e) {
    throw new DbError(e?.message);
  }
};

export const DeleteUser = async (User) => {
  try {
    await deleteUser(User);
  } catch (e) {
    throw new DbError(e?.message);
  }
};
