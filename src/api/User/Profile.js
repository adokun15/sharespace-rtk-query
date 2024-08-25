import { collection, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/init";

export async function CreateProfile(uid, data) {
  //Collect Data return Success OR Not!
  await setDoc(collection(db, "profile", uid), {
    user_id: uid,
    ...data,
  });
}

export async function EditProfile(uid, data) {
  //Collect Data return New state and change DB Not!
  //Asynchorously Update User Document;
  //Dispatch new State if suceess or throw an Error
  await updateDoc(collection(db, "profile", uid), { ...data });
}

export async function GetProfile(uid) {
  await getDoc(collection(db, "profile", uid));
  //Collect Data return New state and provide DB Document!
  //Asynchorously Get User Document;
  //Dispatch new State if suceess or throw an Error
}

export function CreateProfilePicture() {
  return async (dispatch) => {
    //Collect form data;
    //invoke Firebase Storage Bucket
    //dispatch new State if Firebase Auth is SUCCESSFUL or Not!
  };
}
