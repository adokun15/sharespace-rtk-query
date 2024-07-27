import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import NavigationModal from "../components/NavigationModal";
import { useState } from "react";

export default function RootPage() {
  const [controlledModalState, setControlledState] = useState(false);

  const updateFunc = () => setControlledState((prevState) => !prevState);

  return (
    <div className="relative">
      <MainNavigation updateModal={updateFunc} />
      <NavigationModal
        isOpened={controlledModalState}
        updateModal={updateFunc}
      />
      <Outlet />
    </div>
  );
}
