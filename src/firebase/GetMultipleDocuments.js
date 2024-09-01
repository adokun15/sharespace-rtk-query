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
      const userInfo = user?.data() || null;
      matches.push({ ...userInfo, uid: user?.id });

      //if (user?.exists() && userInfo?.isAvailable) {
      // const matches = userInfo?.filter((match) => match?.profile?.id !== id);
      //  return { ...matches, uid: user?.id };
      // }
    });
    return matches;
  } catch (e) {
    throw new DbError(e?.code || e?.message || "Something went wrong");
  }
};
