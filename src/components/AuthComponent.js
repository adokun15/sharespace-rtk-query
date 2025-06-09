import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthorizeMutation } from "../store/Slices/auth";
import { Button } from "../components/ui/button";
//import { useCreateCookieMutation } from "../store/Slices/user";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useCreateSessionMutation } from "../store/Slices/user";

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
  

  //gENERATE iD TOKEN
  const [authorize, { isError, isLoading, error }] = useAuthorizeMutation();
  
  //gENERATE SESSION TOKEN
  const [generateCookie] = useCreateSessionMutation()
  
  const navigate = useNavigate();


  const triggerSubmit = async () => {
    if (
      (!enteredValue?.fname ||
        !enteredValue?.lname ||
        !enteredValue?.password ||
        !enteredValue?.email) &&
      mode === "signup"
    ){

   return;
    }
  
      try{
      const token = await authorize({ mode, name: `${enteredValue.fname} ${enteredValue.lname}`, email: enteredValue.email, password: enteredValue.password,})
      .unwrap()
      .then(token=>token)

      const longerToken = token && await generateCookie(token).unwrap()

      //Save IN LocalStorage
      localStorage.setItem('sharespace_token', longerToken)
        
      //Go Home
      navigate('/')
    }catch(e){
     console.error(e?.message)
    }
  };
  return (
    <>
      {/*<p className="text-center mb-9 text-xl font-roboto tracking-wider">
        ShareSpace
      </p>
     */}
      <h1 className=" md:text-center font-roboto md:text-4xl text-3xl">
        {mode === "login"
          ? "Login to your Account"
          : "Sign Up For a New Account"}
      </h1>
      <form method="post" className="*:block leading-7 *:my-3 my-5">
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-destructive ">
          {isError && error.message}
        </p>
        {mode !== "login" && (
          <>
            <label className="text-xl font-poppins">First Name</label>
            <Input
              required
              className={`placeholder:text-muted font-sans_serif  ${
                fnameInputError && "border-destructive "
              }`}
              onBlur={handleFirstNameOnBlur}
              name="fname"
              type="text"
              max={100}
              onChange={handleFirstNameOnChange}
              placeholder="Enter your First Name"
            />
            <p className="mb-3 font-oswald  font-[100] text-destructive">
              {fnameInputError}
            </p>
            <label className="text-xl mt-4 font-poppins ">Last Name</label>
            <Input
              required
              onBlur={handleLastNameOnBlur}
              className={`placeholder:text-muted font-sans_serif  ${
                lnameInputError && "border-destructive "
              }`}
              name="fname"
              type="text"
              max={100}
              onChange={handleLastNameOnChange}
              placeholder="Enter your Last Name"
            />
            {/*   className={`tracking-wide bg-purple-200 font-roboto focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full
          ${
            emailInputError &&
            "shadow-red-400 focus:shadow outline-red-600 focus:bg-red-300 bg-red-200"
            }
            `}
            */}
            <p className="mb-3 font-oswald  font-[100] text-destructive">
              {lnameInputError}
            </p>
          </>
        )}
        <label className="text-xl font-poppins mt-4 tracking-wider">
          Email
        </label>
        <Input
          required
          onBlur={handleEmailOnBlur}
          className={`placeholder:text-muted font-sans_serif  ${
            emailInputError && "border-destructive "
          }`}
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
        <p className="mb-3 font-oswald  font-[100] text-destructive">
          {emailInputError}
        </p>

        <label className="text-xl mt-4 font-poppins">Password</label>
        <Input
          name="password"
          required
          onBlur={handlePasswordOnBlur}
          type="password"
          className={`placeholder:text-muted font-sans_serif  ${
            passwordInputError && "border-destructive "
          }`}
          onChange={handlePasswordOnChange}
          placeholder="Enter Password"
        />
        <p className="mb-3 font-oswald font-[100] text-destructive">
          {passwordInputError}
        </p>
        <Button
          type="button"
          className={` w-full py-1 px-3  rounded-xl 
        ${
          (emailInputError ||
            passwordInputError ||
            !enteredValue.email ||
            !enteredValue.password) &&
          "disabled:opacity-40"
        }`}
          disabled={emailInputError || passwordInputError}
          onClick={triggerSubmit}
        >
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "Submit"}
        </Button>
        <article className="mt-4">
          {mode === "login" ? (
            <>
              <Link
                className="block m-auto md:text-xl text-xs mb-3 text-center underline text-secondary hover:text-primary"
                to="forgotPassword"
              >
                I forgot my password
              </Link>
              <button
                type="button"
                onClick={() => setAuthState("signup")}
                className="block m-auto md:text-xl text-xs hover:text-primary underline"
              >
                Don't have an account?...Sign up!
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setAuthState("login")}
              className="block m-auto md:text-xl text-xs hover:text-primary"
            >
              Already have an account...Login!
            </button>
          )}
          {mode !== "login" && (
            <p className="my-3 text-xs md:text-xl text-muted text-center font-[100]">
              By signing up, you are agreeing to our{" "}
              <Link
                className="font-medium border-b-2 border-dotted text-primary"
                to="/terms"
              >
                Terms of Service.
              </Link>
            </p>
          )}
        </article>
      </form>
    </>
  );
}
