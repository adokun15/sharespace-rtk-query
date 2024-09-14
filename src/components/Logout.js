import { useLogoutMutation } from "../store/Slices/user";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

export const Logout = ({ closeMobileModal }) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const logoutHandler = async () =>
    await logout()
      .unwrap()
      .then((data) => {
        if (data === "logged_out") {
          navigate("/");
          closeMobileModal && closeMobileModal();
        }
      })
      .catch((e) => console.log(e.message));

  return (
    <Button
      trigger={async () => {
        await logoutHandler();
      }}
      outline={true}
    >
      {isLoading ? "..." : "Logout"}
    </Button>
  );
};
