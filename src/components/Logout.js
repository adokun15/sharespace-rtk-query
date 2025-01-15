import { useLogoutMutation } from "../store/Slices/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const LogoutXomponent = ({ refetch }) => {
  const [logout, { isLoading, reset }] = useLogoutMutation();
  const reroute = useNavigate();

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then((d) => {
        //alert user
        toast.success("Logged Out!");

        //Redirect
        reroute("/");

        window.location.reload();
      })
      .catch((e) => {
        //alert user
        toast.error("Logged Out Operation Failed!", {
          description: e?.message,
        });
      })
      .finally(reset);
  };
  return (
    <Button
      onClick={async () => {
        await handleLogout();
      }}
      variant="ghost"
    >
      {isLoading ? "..." : "Logout"}
    </Button>
  );
};
