import { userAction } from "../../Slices/user";

export function GetUser() {
  // Get currently loggedIn User;
  return async (dispatch) => {
    dispatch(
      userAction?.SetUserData({
        userId: 10100,
        email: "currentlySignedEmail@gmail.com",
      })
    );
  };
}
