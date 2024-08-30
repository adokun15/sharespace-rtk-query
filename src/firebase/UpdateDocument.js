import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { DbError, UnAuthorizedError } from "../utils/ErrorHandlers";
import { db } from "./init";

export const RemoteADocumentArray = async (doc_id, path, updateDetail) => {
  // parentPath ---> field ---> []
  if (!doc_id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  let newItem = {};
  //Updated value
  newItem[updateDetail.key] = arrayRemove(updateDetail.newValue);

  const docRef = doc(db, path, doc_id);
  try {
    await updateDoc(docRef, newItem);
    return "Update successful!";
  } catch (e) {
    throw new DbError(`An Error Occured: ${e?.code || e?.message}`);
  }
};

//
export const UpdateADocumentArray = async (doc_id, path, updateDetail) => {
  // parentPath ---> field ---> []
  if (!doc_id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  //New object
  let newItem = {};

  //Updated value
  newItem[updateDetail.key] = arrayUnion(updateDetail.newValue);

  // eg, "user"/"pref"
  const docRef = doc(db, path, doc_id);

  try {
    await updateDoc(docRef, newItem);
    return "Update successful!";
  } catch (e) {
    throw new DbError(`An Error Occured: ${e?.code || e?.message}`);
  }
};

export const UpdateADocumentObject = async (doc_id, path, updateDetail) => {
  // parentPath ---> field ---> {}
  if (!doc_id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  const docRef = doc(db, path, doc_id);

  //Temporary field
  let newItem = {};

  newItem[updateDetail.key] = updateDetail.newValue;

  try {
    await updateDoc(docRef, newItem);
    return "Update successful!";
  } catch (e) {
    throw new DbError(`An Error Occured: ${e?.code || e?.message}`);
  }
};
