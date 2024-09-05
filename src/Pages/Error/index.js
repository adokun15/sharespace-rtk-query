import { useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import NavigationModal from "../../components/NavigationModal";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorElement({ towhere = "" }) {
  const [controlledModalState, setControlledState] = useState(false);
  const navigateAuth = useNavigate();
  const toAuth = () => {
    navigateAuth("/auth");
  };
  const toHome = () => {
    navigateAuth("/");
  };

  const updateFunc = () => setControlledState((prevState) => !prevState);

  return (
    <div className="relative overscroll-none">
      {!towhere && (
        <>
          <MainNavigation toAuth={toAuth} updateModal={updateFunc} />
          <NavigationModal
            isOpened={controlledModalState}
            updateModal={updateFunc}
            toAuth={toAuth}
          />
        </>
      )}
      <p className="text-3xl text-center font-[800] mt-10">An Error Occured!</p>
      <Button
        elclass="m-auto block my-3"
        outline={true}
        trigger={() => (towhere ? towhere() : toHome())}
      >
        {towhere ? "Go to Dashboard" : "Go Home"}
      </Button>
    </div>
  );
}
