import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/init";

export async function CreateUser({ email, password }) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return {
      token: res._tokenResponse.refreshToken,
      email: res._tokenResponse.email,
      id: res.user.uid,
      expiration: res._tokenResponse.expiresIn,
    };
  } catch (e) {
    throw new Error(e?.code || e?.message || "Unable to create a new Account!");
  }
}

export async function LoginUser({ email, password }) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return {
      token: res._tokenResponse.refreshToken,
      email: res._tokenResponse.email,
      id: res.user.uid,
      expiration: res._tokenResponse.expiresIn,
    };
  } catch (e) {
    throw new Error(
      e?.code || e?.message || "Unable to login. An error occured!"
    );
  }
}
