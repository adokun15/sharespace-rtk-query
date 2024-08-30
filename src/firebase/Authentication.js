import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./init";
import { CreateDocumentWithUID } from "./CreateDocument";

export async function LogoutUser() {
  await auth
    .signOut()
    .then(() => {
      localStorage.removeItem("user");
    })
    .catch(() => {
      throw new Error("An Error Occured");
    });
}

export async function CreateUser({ email, password }) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    localStorage.setItem("user", res.user.uid);
    return res.user.uid;
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}

export async function LoginUser({ email, password }) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", res.user.uid);
    return res.user.uid;
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}
