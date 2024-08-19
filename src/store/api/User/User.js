//import { userAction } from "../../Slices/user";

export function CreateUser({ email, name, password }) {
  return async (dispatch) => {
    //Collect credential, check for error;
    //invoke Firebase Authentication
    //use Firebase createUserWithEmailAndPassord()
    //dispatch user if Firebase Auth is SUCCESSFUL or Not!
  };
}

export function LoginUser() {
  return async (dispatch) => {
    //Collect credential, check for error;
    //invoke Firebase Authentication
    //use Firebase signInUserWithEmailAndPassord()
    //dispatch user if Firebase Auth is SUCCESSFUL or Not!
  };
}

export function CreateProfilePicture() {
  return async (dispatch) => {
    //Collect form data;
    //invoke Firebase Storage Bucket
    //dispatch new State if Firebase Auth is SUCCESSFUL or Not!
  };
}
