import { useRef } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useForgotPasswordMutation } from "../../store/Slices/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
export default function ForgetPasswordComponent() {
  const reRoute = useNavigate();
  //Collect Email
  const [sendEmail, { isLoading }] = useForgotPasswordMutation();

  const email = useRef();

  const toAuth = () => {
    reRoute("/auth");
  };

  const handleSendEmail = async () => {
    if (!email.current.value) {
      toast.warning("Invalid Email Format!");
      return;
    }

    await sendEmail(email.current.value)
      .unwrap()
      .then((data) => {
        console.log(data);
        email.current.value = "";
        toast.success(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message);
      });
  };
  return (
    <main className=" md:px-10 px-2  min-h-40 mt-30 py-[4vh] ">
      <h1 className="md:text-5xl text-center font-roboto text-3xl">
        Forgot Password?
      </h1>
      <form method="post" className="*:block leading-9 *:my-4 my-5">
        {/*isError && (
          <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-destructive ">
            {error.message?.split("/")[1].split("-").join(" ")}
          </p>
        )*/}

        <p className="mb-3 text-muted text-center font-[100]">
          A reset link will be sent to your email.
        </p>

        <label className="text-2xl font-poppins">Email</label>
        <Input
          required
          name="email"
          type="email"
          ref={email}
          className="placeholder:text-muted"
          placeholder="Enter your registered email address"
        />

        <Button
          className={`bg-secondary disabled:opacity-40 w-full py-1 px-3 hover:bg-secondary/80 rounded-xl`}
          disabled={isLoading}
          type="button"
          onClick={handleSendEmail}
        >
          {isLoading ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            "Send reset link"
          )}
        </Button>
        <article>
          <Button
            variant="link"
            type="button"
            onClick={toAuth}
            className="block m-auto text-center underline text-secondary hover:text-primary"
          >
            Remember password? Login
          </Button>
        </article>
      </form>
    </main>
  );
}
