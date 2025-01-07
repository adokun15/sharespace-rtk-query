import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthorizeMutation } from "../store/Slices/auth";
import Button from "../UI/Button";
//import { useCreateCookieMutation } from "../store/Slices/user";
import { Input } from "./ui/input";

export default function AuthenticationComponent() {
  //Signup / Login
  const [mode, setAuthState] = useState("login");

  //Add Error Handler for name Later!!
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const [isInputLoseFocus, setInputFocus] = useState({
    email: false,
    password: false,
    fname: false,
    lname: false,
  });

  const [
    { emailInputError, passwordInputError, fnameInputError, lnameInputError },
    setInputError,
  ] = useState({
    fnameInputError: null,
    lnameInputError: null,
    emailInputError: null,
    passwordInputError: null,
  });

  useEffect(() => {
    //Password Validation after inout loses focus
    if (isInputLoseFocus.password && enteredValue.password.length < 6) {
      setInputError((prev) => {
        return {
          fnameInputError: prev.fnameInputError,
          lnameInputError: prev.lnameInputError,
          emailInputError: prev.emailInputError,
          passwordInputError: "Password too short!",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          emailInputError: prev.emailInputError,
          fnameInputError: prev.fnameInputError,
          lnameInputError: prev.lnameInputError,
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
          fnameInputError: prev.fnameInputError,
          lnameInputError: prev.lnameInputError,
          passwordInputError: prev.passwordInputError,
          emailInputError: "Invalid Email Format!",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          fnameInputError: prev.fnameInputError,
          lnameInputError: prev.lnameInputError,
          passwordInputError: prev.passwordInputError,
          emailInputError: null,
        };
      });
    }

    //User First Name Validation
    if (
      isInputLoseFocus.fname &&
      enteredValue.fname?.length <= 2 &&
      enteredValue.fname !== ""
    ) {
      //Setting Name Error Message
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: prev.emailInputError,
          lnameInputError: prev.lnameInputError,
          fnameInputError:
            enteredValue.fname === ""
              ? "First Name Space is Empty"
              : "Name is Too Short",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: prev.emailInputError,
          lnameInputError: prev.lnameInputError,
          fnameInputError: null,
        };
      });
    }

    //User Last Name Validation
    if (
      isInputLoseFocus.lname &&
      enteredValue.lname?.length <= 2 &&
      enteredValue.lname !== ""
    ) {
      //Setting Name Error Message
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: prev.emailInputError,
          fnameInputError: prev.fnameInputError,
          lnameInputError:
            enteredValue.lname === ""
              ? "Last Name Space is Empty"
              : "Name is Too Short",
        };
      });
    } else {
      setInputError((prev) => {
        return {
          passwordInputError: prev.passwordInputError,
          emailInputError: prev.emailInputError,
          fnameInputError: prev.fnameInputError,
          lnameInputError: null,
        };
      });
    }
  }, [
    enteredValue.password,
    enteredValue.email,
    isInputLoseFocus.email,
    isInputLoseFocus.password,
    isInputLoseFocus.fname,
    isInputLoseFocus.lname,
    enteredValue.fname,
    enteredValue.lname,
  ]);

  //event-listener when  email input value change
  const handleEmailOnChange = (e) => {
    //Change On every keyStroke
    setEnteredValue((prev) => {
      return {
        email: e.target.value,
        fname: prev.fname,
        lname: prev.lname,
        password: prev.password,
      };
    });

    if (enteredValue.email === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          email: false,
          fname: prev.fname,
          lname: prev.lname,
          password: prev.password,
        };
      });
    }
  };

  //event-listener when  email input loses focus
  const handleEmailOnBlur = () => {
    setInputFocus((prev) => {
      return {
        email: true,
        fname: prev.fname,
        lname: prev.lname,
        password: prev.password,
      };
    });

    if (enteredValue.email.includes("@")) {
      setInputError((prev) => {
        return {
          fname: prev.fname,
          lname: prev.lname,
          passwordInputError: prev.passwordInputError,
          emailInputError: null,
        };
      });
    }

    if (enteredValue.email === "") {
      setInputError((prev) => {
        return {
          fnameInputError: prev.fnameInputError,
          lnameInputError: prev.lnameInputError,
          passwordInputError: prev.passwordInputError,
          emailInputError: "Email space is empty!",
        };
      });
    }
  };

  //event-listener when  password input loses focus
  const handlePasswordOnBlur = () => {
    setInputFocus((prev) => {
      return {
        password: true,
        fname: prev.fname,
        lname: prev.lname,
        email: prev.email,
      };
    });

    if (enteredValue.password === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          password: false,
          fname: prev.fname,
          lname: prev.lname,
          email: prev.email,
        };
      });
    }
  };
  //event-listener when  password input value change
  const handlePasswordOnChange = (e) => {
    setEnteredValue((prev) => {
      return {
        password: e.target.value,
        fname: prev.fname,
        lname: prev.lname,
        email: prev.email,
      };
    });
    if (enteredValue.password === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          email: prev.email,
          fname: prev.fname,
          lname: prev.lname,
          password: false,
        };
      });
    }
  };

  //event-listener when  First Name input loses focus
  const handleFirstNameOnBlur = () => {
    setInputFocus((prev) => {
      return {
        fname: true,
        lname: prev.lname,
        password: prev.password,
        email: prev.email,
      };
    });

    if (enteredValue.fname === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          fname: false,
          lname: prev.lname,
          password: prev.password,
          email: prev.email,
        };
      });
    }
  };

  //event-listener when  First name input value change
  const handleFirstNameOnChange = (e) => {
    setEnteredValue((prev) => {
      return {
        fname: e.target.value,
        lname: prev.lname,
        password: prev.password,
        email: prev.email,
      };
    });
    if (enteredValue.fname === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          fname: false,
          lname: prev.lname,
          password: prev.password,
          email: prev.email,
        };
      });
    }
  };

  //event-listener when  First name input value change
  const handleLastNameOnChange = (e) => {
    setEnteredValue((prev) => {
      return {
        lname: e.target.value,
        fname: prev.fname,
        password: prev.password,
        email: prev.email,
      };
    });
    if (enteredValue.lname === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          lname: false,
          fname: prev.fname,
          password: prev.password,
          email: prev.email,
        };
      });
    }
  };

  //event-listener when  First Name input loses focus
  const handleLastNameOnBlur = () => {
    setInputFocus((prev) => {
      return {
        lname: true,
        fname: prev.fname,
        password: prev.password,
        email: prev.email,
      };
    });

    if (enteredValue.lname === "") {
      //Re-initialise Focus to False
      setInputFocus((prev) => {
        return {
          lname: false,
          fname: prev.fname,
          password: prev.password,
          email: prev.email,
        };
      });
    }
  };

  const [authorize, { isError, isLoading, error }] = useAuthorizeMutation();

  const navigate = useNavigate();

  const triggerSubmit = async () => {
    if (
     ( !enteredValue?.fname ||
      !enteredValue?.lname ||
      !enteredValue?.password ||
      !enteredValue?.email
    ) && mode === "signup")
      return;
    await authorize({
      mode,
      name: `${enteredValue.fname} ${enteredValue.lname}`,
      email: enteredValue.email,
      password: enteredValue.password,
    })
      .unwrap()
      .then((token) => {
        if (!token) return;
        localStorage.setItem("sharespace_token", token);
        navigate("/");
      })
      .catch((e) => console.error(e?.message));
  };
  return (
    <>
      <p className="text-center mb-9 text-xl font-roboto tracking-wider">
        ShareSpace
      </p>
      <h1 className="md:text-5xl text-center font-roboto text-3xl">
        {mode === "login"
          ? "Login to your Account"
          : "Sign Up For a New Account"}
      </h1>
      <form method="post" className="*:block leading-9 *:my-4 my-5">
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
          {isError && error.message?.split("/")[1].split("-").join(" ")}
        </p>
        {mode !== "login" && (
          <>
            <label className="text-2xl ">First Name</label>
            <Input
              required
              onBlur={handleFirstNameOnBlur}
              name="fname"
              type="text"
              max={100}
              onChange={handleFirstNameOnChange}
              placeholder="Enter your First Name"
            />
            <p className="mb-3 font-oswald  font-[100] text-red-400">
              {fnameInputError}
            </p>
            <label className="text-2xl ">Last Name</label>
            <Input
              required
              onBlur={handleLastNameOnBlur}
              name="fname"
              type="text"
              max={100}
              onChange={handleLastNameOnChange}
              placeholder="Enter your First Name"
            />
            {/*   className={`tracking-wide bg-purple-200 font-roboto focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            emailInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
            }
            `}
            */}
            <p className="mb-3 font-oswald  font-[100] text-red-400">
              {lnameInputError}
            </p>
          </>
        )}
        <label className="text-2xl ">Email</label>
        <Input
          required
          onBlur={handleEmailOnBlur}
          name="email"
          type="email"
          onChange={handleEmailOnChange}
          placeholder="Enter your Email Address"
        />
        {/*   className={`tracking-wide bg-purple-200 font-roboto focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            emailInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
          }
          `}
        */}
        <p className="mb-3 font-oswald  font-[100] text-red-400">
          {emailInputError}
        </p>

        <label className="text-2xl">Password</label>
        <Input
          name="password"
          required
          onBlur={handlePasswordOnBlur}
          type="password"
          onChange={handlePasswordOnChange}
          placeholder="Enter Password"
        />
        {/* className={`bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            passwordInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
          }
          `}
          */}

        <p className="mb-3 font-oswald  font-[100] text-red-400">
          {passwordInputError}
        </p>
        <Button
          name="mode"
          type="button"
          elclass={` w-full py-1 px-3 text-white rounded-xl bg-purple-600
        ${(emailInputError || passwordInputError) && "disabled:bg-purple-400"}`}
          disabled={emailInputError || passwordInputError}
          loading={isLoading}
          trigger={triggerSubmit}
        >
          {isLoading ? "loading" : "Submit"}
        </Button>
        <article>
          {mode === "login" ? (
            <>
              <button
                type="button"
                onClick={() => setAuthState("signup")}
                className="block m-auto text-blue-800 hover:text-purple-500"
              >
                I forgot my password
              </button>
              <button
                type="button"
                onClick={() => setAuthState("signup")}
                className="block m-auto hover:text-purple-500"
              >
                Dont have an account...Sign up!
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setAuthState("login")}
              className="block m-auto hover:text-purple-500"
            >
              Already have an account...Login!
            </button>
          )}
          {mode !== "login" && (
            <p className="mb-3 text-slate-500 text-center font-[100]">
              By signing up, you are agreeing to our{" "}
              <Link className="border-b-2 border-dotted">
                Terms of Service.
              </Link>
            </p>
          )}
        </article>
      </form>
    </>
  );
}
