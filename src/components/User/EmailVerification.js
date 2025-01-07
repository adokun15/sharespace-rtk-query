import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useVerifyEmailMutation } from "../../store/Slices/user";

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
    <article className="space-y-2 shadow px-4 py-2 rounded">
      <h4 className="text-xl font-bold font-sans">
        <FontAwesomeIcon icon={faCircleDot} /> Verify Emaill Address
      </h4>
      <p>Complete Email Verification by clicking on the verify now button.</p>
      {isLoading ? (
        "..."
      ) : (
        <Button disabled={isSuccess} onClick={handleEmailVerification}>
          {isSuccess ? "Email Link sent" : "Send link"}
        </Button>
      )}
    </article>
  );
}
