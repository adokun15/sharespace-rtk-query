import { Link, useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "../store/Slices/user";
/*import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../components/ui/select";
*/ import { Button } from "../components/ui/button";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  DialogClose,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import DataError from "../components/DataError";
export default function SettingsComponent() {
  const reRoute = useNavigate();
  const {
    data: user,
    isLoading,
    refetch,
    isError,
    error: userError,
  } = useGetUserQuery();

  const [editUser, { isLoading: loading }] = useEditUserMutation();

  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  if (isLoading) {
    return (
      <>
        <Card>
          <Skeleton className="w-48 h-12" />
        </Card>
        <Card>
          <Skeleton className="w-48 h-12" />
        </Card>
      </>
    );
  }

  if (isError) {
    <DataError error={userError} refetch={refetch} />;
  }

  const deleteAccount = async () => {
    await deleteUser({
      name: user?.name,
      email: user?.email,
      photo: user?.photo,
    })
      .unwrap()
      .then(() => {
        //Clear Storage
        localStorage.removeItem("sharespace_token");

        //alert user: "changes made"
        toast.success("Account Deleted!", {
          description: "Thank you for using our service.",
        });

        setTimeout(() => {
          //redirect
          reRoute("/");

          //reloadd
          window.location.reload();
        }, 1500);
      })
      .catch(({ data }) => {
        toast.error(data?.status || "Something WENT wrong!", {
          description: data?.message,
          action: () => reRoute("/auth"),
          //Add a button to login if (401)
        });
      });
  };

  /*
  const roommateHandler = async (value) => {
    await editUser({ targetType: value })
      .unwrap()
      .then((d) => {
        console.log(d);
        //alert user: "changes made"
        toast.success("Roommate Type Changed!", {
          description: "Change will be applied in few minutes",
        });
      })
      .catch(({ data }) => {
        toast.error(data?.status || "Something WENT wrong!", {
          description: data?.message,
          //Add a button to login if (401)
        });
      });
  };
*/
  return (
    <main className="mb-4 space-y-4 font-poppins w-full ">
      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Upgrade to Pro</h3>
        <p className="text-muted">
          Get more by getting a pro account. No subscription. Just pay once.
        </p>
        <p className="italic">_Perks_</p>
        <ul className="list-disc pl-4">
          <li>Video Upload of Hostel</li>
          <li>Longer post time (Up to 2weeks)</li>
          <li>Advanced Filter to find roommate</li>
        </ul>
        <Button variant="primary" className="rounded">
          Pay NGN1200
        </Button>
      </div>

      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Support</h3>
        <p className="text-muted">Reach out to us, we are always available.</p>
        <Button variant="primary" className="rounded">
          Talk to Us
        </Button>
      </div>

      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Feedback</h3>
        <p className="text-muted">Let us know where to improve...</p>
        <Button variant="primary" className="rounded">
          Give thought
        </Button>
      </div>

      <Dialog>
        <div className=" border-4 space-y-3 py-4 px-2 rounded-xl">
          <h3>Delete Your Account permanent</h3>

          <DialogTrigger asChild>
            <Button
              variant="destructive"
              disabled={!user}
              className=" rounded-xl font-oswald"
            >
              <span>Delete</span>
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogTitle>Delete Account permanently</DialogTitle>
          <p>This action is irreversible and you will lose all your data</p>
          <Button variant="destructive" onClick={deleteAccount}>
            {deleting ? "deleting..." : "Delete Account"}
          </Button>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>

      <div className="text-center *:px-2 divide-x-2">
        <Link to="/terms" className=" text-purple-500 underline font-oswald">
          Terms
        </Link>
        <Link to="/privacy" className=" text-purple-500 underline font-oswald">
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}
