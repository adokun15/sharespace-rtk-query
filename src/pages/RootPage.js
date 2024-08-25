import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import NavigationModal from "../components/NavigationModal";
import { useState } from "react";
//import { GetUser } from "../api/User/AuthMiddleWare";
/*import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init";
import { userAction } from "../store/Slices/user";
*/ export default function RootPage() {
  const [controlledModalState, setControlledState] = useState(false);
  const navigateAuth = useNavigate();

  //const dispatch = useDispatch();
  /*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        dispatch(
          userAction.SetUserData({
            user_id: user.uid,
            email: user.email,
            username: user?.displayName,
            profile_pic: user.photoURL,
            email_verified: user.emailVerified,
          })
        );
      } else {
        dispatch(
          userAction.SetUserData({
            user_id: null,
            email: null,
            username: null,
            profile_pic: null,
            email_verified: null,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
*/
  const toAuth = () => {
    navigateAuth("/auth");
  };

  const updateFunc = () => setControlledState((prevState) => !prevState);
  return (
    <div className="relative overscroll-none">
      <MainNavigation toAuth={toAuth} updateModal={updateFunc} />
      <NavigationModal
        isOpened={controlledModalState}
        updateModal={updateFunc}
        toAuth={toAuth}
      />

      <Outlet />
    </div>
  );
}
