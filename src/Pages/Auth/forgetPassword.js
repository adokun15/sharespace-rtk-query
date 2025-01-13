import { useRef } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useForgotPasswordMutation } from "../../store/Slices/auth";
import { useNavigate } from "react-router-dom";
export default function ForgetPasswordComponent() {
  const reRoute = useNavigate();
  //Collect Email
  const [sendEmail, { isError, error, isLoading }] =
    useForgotPasswordMutation();

  const email = useRef();

  const toAuth = () => {
    reRoute("/auth");
  };

  const handleSendEmail = async () => {
    if (!email) return;

    await sendEmail(email.current.value)
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className=" md:px-10 px-2  min-h-40 mt-30 py-[4vh] ">
      <h1 className="md:text-5xl text-center font-roboto text-3xl">
        Forgot Password?
      </h1>
      <form method="post" className="*:block leading-9 *:my-4 my-5">
        {isError && (
          <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
            {error.message?.split("/")[1].split("-").join(" ")}
          </p>
        )}

        <p className="mb-3 text-slate-500 text-center font-[100]">
          A reset link will be sent to your email.
        </p>

        <label className="text-2xl ">Email</label>
        <Input
          required
          name="email"
          type="email"
          ref={email}
          placeholder="Enter your Email Address"
        />
        <Button type="button" onClick={handleSendEmail}>
          {isLoading ? "loading" : "Submit"}
        </Button>
        <article>
          <Button
            type="button"
            onClick={toAuth}
            className="block m-auto hover:text-purple-500"
          >
            Remember password? Login
          </Button>
        </article>
      </form>
    </main>
  );
}
