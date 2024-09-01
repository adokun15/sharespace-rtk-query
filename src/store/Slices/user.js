import { onAuthStateChanged } from "firebase/auth";
import {
  CreateUser,
  LoginUser,
  LogoutUser,
} from "../../firebase/Authentication";
import {
  DeleteADocument,
  DeleteStoragePath,
  DeleteUser,
} from "../../firebase/DeleteDoc";
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
    }),
    logout: builder.mutation({
      async queryFn() {
        await LogoutUser();
      },
      invalidatesTags: ["user"],
    }),
    deleteAccount: builder.mutation({
      async queryFn(user) {
        try {
          //delete user
          await DeleteUser(user);
          // delete storage: profile
          await DeleteStoragePath(`users/${user.uid}`);
          //delete db
          await DeleteADocument(`users/${user?.uid}`);
        } catch (e) {
          throw new DbError(e?.message);
        }
        //do this in the function handler: deleteManually....
        //opt out of spaces: include
        //delete space
      },
    }),

    isLoggedIn: builder.query({
      queryFn() {
        return { data: { user: {} } };
      },

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
      invalidatesTags: (result, error, arg) => [{ type: "user", id: arg.id }],
    }),
  }),
});

export const { useAuthorizeMutation, useUsernameMutation, useIsLoggedInQuery } =
  UserSlice;
