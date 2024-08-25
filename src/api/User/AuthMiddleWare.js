import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/init";

//import { userAction } from "../../Slices/user";

export function GetUser() {
  // Get currently loggedIn User;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return {
        user_id: user.uid,
        email: user.email,
        username: user?.displayName,
        profile_pic: user.photoURL,
        email_verified: user.emailVerified,
      };
    } else {
      return null;
    }
  });
}
