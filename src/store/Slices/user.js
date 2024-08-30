import {
  CreateUser,
  LoginUser,
  LogoutUser,
} from "../../firebase/Authentication";
import { UpdateADocumentObject } from "../../firebase/UpdateDocument";
import { DbError, UnAuthorizedError } from "../../utils/ErrorHandlers";
import { api } from "../api";

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
      async queryFn() {},
    }),

    isLoggedIn: builder.query({
      async queryFn() {
        const data = localStorage.getItem("user");
        //gets profile, preference and user
        if (!data) {
          throw new UnAuthorizedError("Not authenticated yet");
        }
        return `${JSON.parse(data)}`;
      },
    }),

    photoUpload: builder.mutation({}),

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

export const { useAuthorizeMutation, useUsernameMutation } = UserSlice;
