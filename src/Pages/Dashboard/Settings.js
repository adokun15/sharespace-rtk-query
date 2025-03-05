import { Link, useNavigate } from "react-router-dom";
import Card from "../../UI/Card";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "../../store/Slices/user";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  DialogClose,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Skeleton } from "../../components/ui/skeleton";
import DataError from "../../components/DataError";
export default function Settings() {
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
      .then((d) => {
        //Clear Storage
        localStorage.removeItem("sharespace_token");
        console.log(d);
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
        console.log(data);
        toast.error(data?.status || "Something WENT wrong!", {
          description: data?.message,
          action: () => reRoute("/auth"),
          //Add a button to login if (401)
        });
      });
  };

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

  return (
    <main className="mb-4">
      <h2 className="text-2xl">Settings</h2>
      <Card elClass="space-y-4">
        <h2 className="capitalize text-3xl font-roboto font-bold">
          Roommate Type
        </h2>

        {loading && <Loader2 />}

        <p className="font-oswald">Who are looking forward to live with?</p>

        <Select defaultValue={user?.targetType} onValueChange={roommateHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roomie">
              <span>Someone who already has a hostel</span>
            </SelectItem>
            <SelectItem value="spacer">
              <span>Someone who looking for accomodation</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Card elClass="space-y-4">
        <Dialog>
          <h2 className="capitalize text-3xl font-roboto font-bold">
            Account removal
          </h2>
          <p className="font-oswald">
            Remove your account permanently from ShareSpace
          </p>
          <DialogTrigger asChild>
            <Button
              disabled={!user}
              className="bg-red-600 text-white ring-1 ring-red-700 rounded-xl ring-offset-2 font-oswald"
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete ShareSpace permanently</DialogTitle>
            <p>This action is irreversible and you will lose all your data</p>
            <Button variant="destructive" onClick={deleteAccount}>
              {deleting ? "deleting..." : "Delete Account"}
            </Button>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>
      </Card>
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
