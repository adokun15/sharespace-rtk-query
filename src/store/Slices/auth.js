import {
  CreateUser,
  ForgotPassword,
  LoginUser,
  LogoutUser,
} from "../../firebase/Authentication";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
const UserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    authorize: builder.mutation({
      async queryFn({ mode, name, email, password }) {
        try {
          let credential;
          //hOW WILL
          switch (mode) {
            case "login":
              credential = await LoginUser({ email, password });
              return { data: credential };
            case "signup":
              credential = await CreateUser({ name, email, password });
              //        console.log(credential);
              return { data: credential };
            default:
              return null;
          }
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: () => ["auth"],
      //  arg?.mode === "login" ? [{ type: "auth", id: result }] : ,
    }),

    forgotPassword: builder.mutation({
      async queryFn(email) {
        try {
          await ForgotPassword(email);
          return { data: "Reset Password Link has been sent!" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),

  

    logout: builder.mutation({
      async queryFn() {
        try {
          const l = await LogoutUser();
          return { data: l };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: () => ["auth"],
    }),
  }),
});

export const {
  useLogoutMutation,
  useAuthorizeMutation,
  useForgotPasswordMutation,
} = UserSlice;

/*
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { LogoutUser } from "../../firebase/Authentication";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
import { auth } from "../../firebase/init";
//Use Google Login
const UserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      async queryFn() {
        try {
          const provider = new GoogleAuthProvider();
          signInWithRedirect(auth, provider);
          const result = await getRedirectResult(auth);
          console.log(result);
          return { data: "test" };
        } catch (e) {
          console.log(e);
          throw new DbError(e?.code);
        }
      },
    }),

    authorize: builder.query({
      async queryFn() {
        try {
          console.log(auth);

          const result = a
          wait getRedirectResult(auth);
          //const token = GoogleAuthProvider.credentialFromResult(result);
          console.log(result);
          return { data: "test" };
        } catch (e) {
          console.log(e);
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result, error, arg) =>
        arg?.mode === "login" ? [{ type: "user", id: result }] : ["profile"],
    }),

    logout: builder.mutation({
      async queryFn() {
        try {
          await LogoutUser();
          return { data: "logged_out" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: ["user"],
    }),

    isLoggedIn: builder.query({
      queryFn() {
        return { data: { user: {} } };
      },

      providesTags: (result) => [{ type: "user", id: result?.user?.uid }],
      async onCacheEntryAdded(
        args,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        //monitor local changes in firestore
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user);
            updateCachedData((draft) => {
              draft.user = {
                uid: user?.uid,
                email: user?.email,
              };
            });
          } else {
            updateCachedData((draft) => {
              draft.user = {};
            });
          }
        });

        await cacheEntryRemoved;
        unsub();
      },
    }),

    username: builder.mutation({
      async queryFn({ id, name }) {
        try {
          const obj = await UpdateADocumentObject(id, "users", {
            key: "username",
            newValue: name,
          });
          return { data: obj };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "profile", id: arg.id },
      ],
    }),
  }),
});

export const {
  useLogoutMutation,
  useSignInMutation,
  useAuthorizeQuery,
  useUsernameMutation,
  useIsLoggedInQuery,
} = UserSlice;

*/
