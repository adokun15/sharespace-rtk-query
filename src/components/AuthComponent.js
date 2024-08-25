import { CreateUser, LoginUser } from "../api/User/User";
import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../store/Slices/user";

export default function AuthenticationComponent() {
  //Signup / Login

  const [mode, setAuthState] = useState("login");
  const errors = useActionData();

  const [enteredValue, setEnteredValue] = useState({ email: "", password: "" });
  const [isInputLoseFocus, setInputFocus] = useState({
    email: false,
    password: false,
  });

  const [{ emailInputError, passwordInputError }, setInputError] = useState({
    emailInputError: null,
    passwordInputError: null,
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    //REwrite form error
    setFormError("");

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

  const [
    signup,
    { isError: isSignUpError, isLoading: signupLoading, error: signupError },
  ] = useSignupMutation();
  const [
    login,
    { isError: isLoginError, isLoading: loginLoading, error: loginError },
  ] = useLoginMutation();

  const navigate = useNavigate();
  const triggerSubmit = async () => {
    if (mode === "login") {
      await login({
        email: enteredValue.email,
        password: enteredValue.password,
      });
    }

    if (mode === "signup") {
      await signup({
        email: enteredValue.email,
        password: enteredValue.password,
      });

      navigate("/auth/new-profile");
    }
  };

  return (
    <>
      <h1 className="text-5xl">
        {mode === "login"
          ? "Login to your Account"
          : "Sign Up For a New Account"}
      </h1>
      <form method="post" className="*:block leading-9 *:my-4 my-5">
        <p>{errors}</p>
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
        <button
          name="mode"
          type="button"
          onClick={triggerSubmit}
          className={`bg-purple-800 py-1 px-3 text-white rounded-xl hover:bg-purple-400 hover:text-black
  transition-colors duration-500 ease-in-out focus:translate-y-1
        ${(emailInputError || passwordInputError) && "disabled:bg-purple-400"}`}
          disabled={emailInputError || passwordInputError}
        >
          Submit
        </button>
        <article>
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => setAuthState("signup")}
              className="block m-auto hover:text-purple-500"
            >
              Sign up for a new Account"
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuthState("login")}
              className="block m-auto hover:text-purple-500"
            >
              Login into your Account
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
