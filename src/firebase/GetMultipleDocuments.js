import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./init";
import { DbError, UnAuthorizedError } from "../utils/ErrorHandlers";

export const getMultipleMatches = async (id) => {
  if (!id) {
    throw new UnAuthorizedError("UnAuthorized Access!");
  }

  const docRef = query(collection(db, "users"));

  try {
    let matches = [];
    const allUsers = await getDocs(docRef);
    allUsers.forEach((user) => {
      if (user?.exists()) {
        matches.push({ ...user?.data() });
      }
    });

    if (matches) {
      matches = matches.filter((match) => match?.profile?.user_id !== id);
    }
    return matches;
  } catch (e) {
    throw new DbError(e?.code || e?.message || "Something went wrong");
  }
};
