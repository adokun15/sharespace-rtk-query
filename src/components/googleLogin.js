"use client";
import { useEffect, useState } from "react";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase/init";
import { useNavigate } from "react-router-dom";
import { useCreateSessionMutation } from "../store/Slices/user";
//import { createSessionCookies } from "@/server/session/createSessionCookies";
//import SetUpRole from "@/server/user/SetUpRole";

export default function GoogleLogin() {
  const [generateCookie, { isError, error }] = useCreateSessionMutation();

  //Navigate
  const router = useNavigate();

  const [state, setState] = useState({
    loading: false,
    error: { isError: false, message: "" },
  });

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).catch((e) =>
      setState({
        error: {
          isError: true,
          message:
            e?.code || "Something went while trying to logging with google!",
        },
        loading: false,
      })
    );
  };

  useEffect(() => {
    const result = async () =>
      getRedirectResult(auth)
        .then(async (res) => {
          const user = res?.user;

          if (!user) return;

          setState({ loading: true });

          //Collect token
          const token = await user?.getIdToken();
          setState({ loading: true });

          //Sign out
          await auth.signOut();
          setState({ loading: true });

          //Create session & redirect from there
          const session = token && (await generateCookie(token).unwrap());

          if (isError) {
            setState({ error: error?.message || "Error: INTERNAL ERROR" });
          }

          //Save IN LocalStorage
          localStorage.setItem("sharespace_token", session);

          router("/profile");
        })
        .catch((e) => {
          setState((prev) => ({
            ...prev,
            error: { isError: true, message: e?.code || e?.message },
          }));
        })
        .finally(() => {
          setState((prev) => ({ ...prev, loading: false }));
        });

    result();
  }, [error?.message, generateCookie, router, isError]);

  return (
    <main className="space-y-3 font-poppins px-5 py-4 rounded md:w-7/10 w-[98%] lg:w-[55%] mx-auto ">
      <h2 className="text-center font-[600] text-size-large">
        Login into your account
      </h2>
      <p className="text-center text-slate-500">
        Start creating your chances today.
      </p>
      {state?.error?.isError && (
        <p className="text-destructive">{state?.error?.message}</p>
      )}

      <button
        disabled={state.loading}
        onClick={handleLogin}
        className="block bg-primary mt-8 py-3 rounded-full text-white hover:bg-primary/90 transition
          w-full  tracking-wide px-3   shadow"
      >
        {state?.loading ? "Logging..." : "Continue with Google"}
      </button>
    </main>
  );
}
