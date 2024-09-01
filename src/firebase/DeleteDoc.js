import { deleteDoc } from "firebase/firestore";
import { DbError } from "../utils/ErrorHandlers";
import { deleteObject } from "firebase/storage";
import { deleteUser } from "firebase/auth";

export const DeleteADocument = async (path) => {
  try {
    await deleteDoc(path);
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
