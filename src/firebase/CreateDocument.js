import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./init";
import { DbError } from "../utils/ErrorHandlers";

export const CreateDocumentWithAutoId = async (path, data) => {
  const ref = collection(db, path);

  await addDoc(ref, data)
    .then(() => "Creation Successful")
    .catch((e) => {
      throw new DbError(e?.code || e?.message || "Something went wrong");
    });
};

export const CreateDocumentWithUID = async (path, data, uid) => {
  const ref = doc(db, path, uid);

  await setDoc(ref, data)
    .then(() => "Creation Successful")
    .catch((e) => {
      throw new DbError(e?.code || e?.message || "Something went wrong");
    });
};
