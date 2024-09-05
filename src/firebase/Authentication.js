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
    //Create a user Entity
    const res = await createUserWithEmailAndPassword(auth, email, password);
    //Create a user Database
    await CreateDocumentWithUID(
      "users",
      {
        email: res?.user?.email,
        photourl: "",
        spaces: [],
        profile: {},
        preference: {},
        username: null,
        isAvailable: true,
      },
      res.user?.uid
    );
    await CreateDocumentWithUID(
      "notices",
      {
        notifications: [],
      },
      res.user?.uid
    );
    return res.user.uid;
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}

export async function LoginUser({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "dashboard";
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}
