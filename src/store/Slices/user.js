import { user_api } from "../api";

const userSlice = user_api.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: () => {
        return {
          url: "verify",
          method: "POST",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: ({ userId }) => [{ type: "auth", id: userId }],
    }),

    isLoggedIn: builder.query({
      query: () => {
        return {
          url: "verify",
          method: "GET",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      transformResponse: (res) => res?.user,
      providesTags: () => ["auth"],
    }),

    //Get User
    getUser: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res) => res?.user,
      providesTag: ({ userId }) => [{ type: "user", id: userId }],
    }),

    setUser: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: JSON.stringify(formData),
      }),
      transformResponse: (res) => res?.message,
      invalidatesTags: (__, error, args) => [
        { type: "user", id: args?.userId },
      ],
    }),

    getUserTokenTransactions: builder.query({
      query: () => ({
        url: "transactions",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (res) => res?.transactions,
    }),

    editUser: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "PATCH",
        body: JSON.stringify(formData),
      }),
      transformResponse: (res) => res?.message,
      invalidatesTags: (__, error, args) => [
        { type: "user", id: args?.userId },
      ],
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  //USER
  useIsLoggedInQuery,
  useEditUserMutation,
  useSetUserMutation,
  useGetUserQuery,
  useGetUserTokenTransactionsQuery,
} = userSlice;

/*
    //Manage Cookies
    createCookie: builder.mutation({
      query: (token) => ({
        url: "cookie",
        method: "POST",
        credientials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    deleteCeookie: builder.mutation({
      query: (token) => ({
        url: "cookie",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
*/
