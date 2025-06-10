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
import { ChevronRight, Loader2 } from "lucide-react";
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
import AccountButton from "src/UI/AccountButton";
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
    <main className="mb-4 w-full space-y-5 md:w-[70%] mx-auto">
    
        <div className="flex mb-8 justify-between">
          <h2 className="text-3xl font-semibold font-sans_serif">Settings</h2>
            <AccountButton/>
        </div>
    
      <div className="space-y-1">
      <h2 className="m-0 capitalize text-xl font-roboto font-bold">
          Notification
        </h2>
      <Card elClass=" my-1 space-y-2 min-h-2">
        <p className="text-muted ">Control how you receive notification</p>
       <article>
        <p>Chat Notification</p>
        <p>Roommate Request Notification</p>
       
      </article>
       </Card>
      </div>
    
    
      <div className="space-y-1">
      <h2 className="m-0 capitalize text-xl font-roboto font-bold">
          
          Credit Tokens
        </h2>
      <Card elClass=" my-1 space-y-2 min-h-2">
      <p className="text-muted ">You have 90 credits left</p>
        <Button>+ Add More</Button>
         </Card>
      </div>
    
      <div className="space-y-1">
      <h2 className="m-0 capitalize text-xl font-roboto font-bold">
          Roomie Post        </h2>
      <Card elClass=" my-1 space-y-2 min-h-2">
        <p className="text-muted ">Who should we display on your timeline?</p>
         {loading && <Loader2 />}
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
      </div>
     
      <div className="space-y-1">
      <h2 className="m-0 capitalize text-xl font-roboto font-bold">
          Affliate and Earn
        </h2>
      <Card elClass=" my-1 space-y-2 min-h-2">
        <p className="text-muted ">Bring your friends along who might need a roommate themselves and earn at the same time</p>
        <Button>Join Affliate Program</Button>
        </Card>
      </div>

     
      <div className="space-y-1">
      <h2 className="m-0 capitalize text-xl font-roboto font-bold">
              Account removal
        </h2>

      <Card elClass="space-y-4 h-fit min-h-2">
        <Dialog>
          <div className="">
          <p>Remove Your Account From ShareSpace Forever</p>
            
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={!user}
                className=" rounded-xl  font-oswald"
                >
                <span>Delete</span>
                <ChevronRight />
              </Button>
            </DialogTrigger>
          </div>
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
      </div>
      
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
