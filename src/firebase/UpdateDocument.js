import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { DbError, UnAuthorizedError } from "../utils/ErrorHandlers";
import { db } from "./init";
import { getDocument } from "./GetDocument";

export const FilterDocumentArray = async (doc_id, path, updateDetail) => {
  // parentPath ---> field ---> []

  if (!doc_id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }
  //Get current document
  const curenetDoc = await getDocument(doc_id, path);
  console.log(curenetDoc);

  //Get Key
  const currentList = [...curenetDoc?.spaces];
  console.log(currentList);

  //Filteer
  const newItem =
    currentList.length > 0
      ? currentList.filter((item) => item?.spaceId !== updateDetail.id)
      : [];

  console.log(newItem);

  //Updated value
  const docRef = doc(db, path, doc_id);

  try {
    await updateDoc(docRef, { spaces: newItem });
    return "Removed successful!";
  } catch (e) {
    console.log(e.message);
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
