import { toast } from "sonner";
import { Button } from "../ui/button";
import { useVerifyEmailMutation } from "../../store/Slices/user";
import { ChevronRight, Loader2 } from "lucide-react";

export default function EmailVerificationComponent() {
  const [sendVerificationLink, { isLoading, isSuccess }] =
    useVerifyEmailMutation();

  const handleEmailVerification = async () => {
    await sendVerificationLink()
      .unwrap()
      .then((data) => {
        toast(data?.message, {
          description: "Check your email Inbox to confirm.",
        });
      })
      .catch((e) => {
        toast("Email Not Sent!", {
          description: e?.message || "An error occured",
        });
      });
  };
  return (
    <article className="space-y-2  shadow  px-4 py-2 rounded-xl">
      <div>
        <h4 className="text-xl font-bold font-sans_serif">
          Verify your Email Address
        </h4>
        <p className="text-slate-400 font-poppins">
          Complete Email Verification by clicking on the verify now button.
        </p>
      </div>
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Button
          
          disabled={isSuccess}
          onClick={handleEmailVerification}
        >
          {isSuccess ? "Email Link sent" : "Send link"} <ChevronRight />
        </Button>
      )}
    </article>
  );
}
