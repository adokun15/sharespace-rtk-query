import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./init";
import { CreateDocumentWithUID } from "./CreateDocument";
import { lIVE_CLIENT_WEB_URL, LOCAL_CLIENT_WEB_URL } from "../lib/utils";

//import { CreateDocumentWithUID } from "./CreateDocument";

export async function ForgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${
        process.env.NODE_ENV === "development"
          ? LOCAL_CLIENT_WEB_URL
          : lIVE_CLIENT_WEB_URL
      }/auth`,
    });
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable send link. An error occured!"
    );
  }
}

export async function LogoutUser() {
  try {
    await auth.signOut();
    //Clear localstorage
    localStorage.removeItem("sharespace_token");

    return "logged_out";
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to logout. An error occured!"
    );
  }
}
export async function CreateUser({ name, email, password }) {
  try {
    //Create a user Entity
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName: name });

    //Credit -- 100 -- Beta USER!
    await CreateDocumentWithUID(
      "users",
      { credit: 100, userId: res?.user.uid },
      res?.user.uid
    );

    const token = await res.user.getIdToken();

    return token;
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}

export async function LoginUser({ email, password }) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const token = await res.user.getIdToken();

    return token;
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}
