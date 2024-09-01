import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorizeMutation } from "../store/Slices/user";
import Button from "../UI/Button";

export default function AuthenticationComponent() {
  //Signup / Login

  const [mode, setAuthState] = useState("signup");

  const [enteredValue, setEnteredValue] = useState({ email: "", password: "" });
  const [isInputLoseFocus, setInputFocus] = useState({
    email: false,
    password: false,
  });

  const [{ emailInputError, passwordInputError }, setInputError] = useState({
    emailInputError: null,
    passwordInputError: null,
  });

  useEffect(() => {
    //Password Validation after inout loses focus
    if (isInputLoseFocus.password && enteredValue.password.length < 6) {
      setInputError((prev) => {
        return {
          emailInputError: prev.emailInputError,
          passwordInputError: "Password too short!",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          emailInputError: prev.emailInputError,
          passwordInputError: null,
        };
      });
    }

    //Email Validated after inout loses focus
    if (
      isInputLoseFocus.email &&
      !enteredValue.email.includes("@") &&
      enteredValue.email !== ""
    ) {
      //Setting Email Error Message
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: "Invalid Email Format!",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: null,
        };
      });
    }
  }, [
    enteredValue.password,
    enteredValue.email,
    isInputLoseFocus.email,
    isInputLoseFocus.password,
  ]);

  //event-listener when  email input value change
  const handleEmailOnChange = (e) => {
    //Change On every keyStroke
    setEnteredValue((prev) => {
      return { email: e.target.value, password: prev.password };
    });

    if (enteredValue.email === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return { email: false, password: prev.password };
      });
    }
  };

  //event-listener when  email input loses focus
  const handleEmailOnBlur = () => {
    setInputFocus((prev) => {
      return { email: true, password: prev.password };
    });

    if (enteredValue.email.includes("@")) {
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: null,
        };
      });
    }

    if (enteredValue.email === "") {
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: "Email space is empty!",
        };
      });
    }
  };

  //event-listener when  password input loses focus
  const handlePasswordOnBlur = () => {
    setInputFocus((prev) => {
      return { password: true, email: prev.email };
    });

    if (enteredValue.password === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return { password: false, email: prev.email };
      });
    }
  };
  //event-listener when  password input value change
  const handlePasswordOnChange = (e) => {
    setEnteredValue((prev) => {
      return { password: e.target.value, email: prev.email };
    });
    if (enteredValue.password === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return { email: prev.email, password: false };
      });
    }
  };

  const [authorize, { isError, isLoading, error }] = useAuthorizeMutation();

  const navigate = useNavigate();
  const triggerSubmit = async () => {
    await authorize({
      mode,
      email: enteredValue.email,
      password: enteredValue.password,
    })
      .unwrap()
      .then((data) => {
        //Control Navigate
        if (!data) return;
        if (data === "dashboard") {
          navigate("/dashboard");
        } else {
          navigate(`/auth/new-profile?user_id=${data}`);
        }
      })
      .catch((e) => console.error(e?.message));
  };
  return (
    <>
      <h1 className="md:text-5xl text-3xl">
        {mode === "login"
          ? "Login to your Account"
          : "Sign Up For a New Account"}
      </h1>
      <form method="post" className="*:block leading-9 *:my-4 my-5">
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
          {isError && error.message?.split("/")[1].split("-").join(" ")}
        </p>
        <label className="text-2xl">Email</label>
        <input
          required
          onBlur={handleEmailOnBlur}
          name="email"
          type="email"
          onChange={handleEmailOnChange}
          className={`bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            emailInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
          }
          `}
          placeholder="Enter email"
        />
        <p className="mb-3 italic font-[100] text-red-400">{emailInputError}</p>

        <label className="text-2xl">Password</label>
        <input
          name="password"
          onBlur={handlePasswordOnBlur}
          type="password"
          onChange={handlePasswordOnChange}
          className={`bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            passwordInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
          }
          `}
          placeholder="Enter Password"
        />
        <p className="mb-3 italic font-[100] text-red-400">
          {passwordInputError}
        </p>
        <Button
          name="mode"
          type="button"
          elclass={` w-full py-1 px-3 text-white rounded-xl bg-purple-700
        ${(emailInputError || passwordInputError) && "disabled:bg-purple-400"}`}
          disabled={emailInputError || passwordInputError}
          loading={isLoading}
          trigger={triggerSubmit}
        >
          Submit
        </Button>
        <article>
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => setAuthState("signup")}
              className="block m-auto hover:text-purple-500"
            >
              Dont have an account...Sign up!"
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuthState("login")}
              className="block m-auto hover:text-purple-500"
            >
              Already have an account...Login!
            </button>
          )}
        </article>
      </form>
    </>
  );
}

/*
export async function AuthAction({ request }) {
  const formdata = await request.formData();
  const modeIsLogin = formdata.get("mode") === "login";
  const email = formdata.get("email");
  const password = formdata.get("password");

  console.log(modeIsLogin);

  console.log(email);
  console.log(password);
  let message = "";

  if (email === "") {
    message = "Email space is Empty";
    return message;
  }
  if (password === "") {
    message = "Password space is Empty";
    return message;
  }
  try {
    if (modeIsLogin) {
      await LoginUser({ email, password });
      return redirect("/dashboard");
    } else {
      await CreateUser({ email, password });
      return redirect("/auth/new-profile");
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  //return null;
}
*/
