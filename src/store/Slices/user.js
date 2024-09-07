import { onAuthStateChanged } from "firebase/auth";
import {
  CreateUser,
  LoginUser,
  LogoutUser,
} from "../../firebase/Authentication";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
import { auth } from "../../firebase/init";

const UserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    authorize: builder.mutation({
      async queryFn({ mode, email, password }) {
        try {
          let credential;
          switch (mode) {
            case "login":
              credential = await LoginUser({ email, password });
              return { data: credential };
            case "signup":
              credential = await CreateUser({ email, password });
              return { data: credential };
            default:
              return null;
          }
        } catch (e) {
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
  useAuthorizeMutation,
  useUsernameMutation,
  useIsLoggedInQuery,
} = UserSlice;
