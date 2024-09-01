import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import NavigationModal from "../components/NavigationModal";
import { useState } from "react";
export default function RootPage() {
  const [controlledModalState, setControlledState] = useState(false);
  const navigateAuth = useNavigate();
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
