import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../UI/Card";
import {
  useDeleteUserMutation,
  //useEditUserMutation,
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
import { Loader2 } from "lucide-react";
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
import { LogoutXomponent } from "./Logout";
import { useGoProMutation, useConfirmPaymentQuery } from "../store/Slices/pro";
import { useState } from "react";
import { useEffect } from "react";
import { FEEDBACK_URL, SUPPORT_PHONE } from "../lib/utils";

export default function SettingsComponent() {
  const reRoute = useNavigate();
  const {
    data: user,
    isLoading,
    refetch,
    isError,
    error: userError,
  } = useGetUserQuery();

  //const [editUser, { isLoading: loading }] = useEditUserMutation();

  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
  const [controlledDialogPayment, setDialogTogglePayment] = useState(false);

  //Search Param
  const [params] = useSearchParams();
  const reference = params.get("reference");
  //const auto_open = params.get("credit");

  const {
    data: paymentConfirmation,
    isLoading: confirmingPayment,
    isError: isPaymentConfirmationError,
    error: paymentConfirmationError,
  } = useConfirmPaymentQuery(reference, { skip: !reference });

  const [upgrade, { isLoading: redirecting }] = useGoProMutation();

  useEffect(() => {
    if (reference) {
      //Open Modal
      setDialogTogglePayment(true);
    }
  }, [reference]);

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

  const redirectToPayment = async () => {
    await upgrade()
      .unwrap()
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main className="mb-4 space-y-4 font-poppins w-full ">
      <Dialog
        open={controlledDialogPayment}
        onOpenChange={() => setDialogTogglePayment((p) => !p)}
      >
        <DialogContent>
          <DialogTitle className="font-sans_serif">
            Payment status - {paymentConfirmation?.status}
          </DialogTitle>
          {confirmingPayment && <p>...</p>}
          {isPaymentConfirmationError && (
            <p className="text-destructive font-poppins">
              {paymentConfirmationError?.message}
            </p>
          )}
          {paymentConfirmation && (
            <article>
              {paymentConfirmation?.status === "success" && (
                <p className="font-poppins">
                  {" "}
                  Your Payment of <b>NGN{paymentConfirmation?.amount}</b> was
                  successful. Account has been upgraded to pro.
                </p>
              )}

              {paymentConfirmation?.status === "failed" && (
                <p className="font-poppins">
                  Your Payment of <b>NGN{paymentConfirmation?.amount}</b>{" "}
                  Failed.
                </p>
              )}
            </article>
          )}

          <DialogClose asChild>
            <Button variant="primary" className="w-fit">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Email (Google Login)</h3>
        <p>{user?.email}</p>
      </div>
      {!user?.isPro && (
        <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
          <h3 className="font-[600] text-[18px]">Upgrade to Pro</h3>
          <p className="text-muted">
            Get more by getting a pro account. No subscription. Just pay once.
          </p>
          <p className="italic">_Perks_</p>
          <ul className="list-disc pl-4">
            <li>Unlimited posts upload</li>
            <li>View Student Profile</li>
            <li>Longer post time (Up to 2weeks)</li>
            <li>Advanced filter to find specific roommate</li>
          </ul>
          <Button
            disabled={redirecting}
            onClick={redirectToPayment}
            variant="primary"
            className="rounded"
          >
            {redirecting ? <Loader2 className="animate-spin" /> : "Pay NGN 900"}
          </Button>
        </div>
      )}
      {user?.isPro && (
        <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
          <h3 className="font-[600] text-[18px]">Current Plan (PRO)</h3>
          <p className="text-muted">Now you can:</p>
          <ul className="list-disc pl-4">
            <li>Upload Unlimited posts</li>
            <li>View any Student Profile(department, religion, level)</li>
            <li>Your post stay on Explore page for atleast 14days</li>
            <li>Advanced filter to find specific roommate</li>
          </ul>
        </div>
      )}
      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Support</h3>
        <p className="text-muted">Reach out to us, we are always available.</p>
        <Button variant="primary" className="rounded">
          <Link to={SUPPORT_PHONE}>Talk to Us</Link>
        </Button>
      </div>

      <div className="border-4 space-y-3 py-4 px-2 rounded-xl">
        <h3 className="font-[600] text-[18px]">Feedback</h3>
        <p className="text-muted">Let us know where to improve...</p>
        <Button variant="primary" className="rounded">
          <Link to={FEEDBACK_URL}>Give thought</Link>
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

      <div>
        <LogoutXomponent />
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
