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
      invalidatesTags: () => ["auth"],
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
      providesTags: ["user"],
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),

    setUser: builder.mutation({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: JSON.stringify(formData),
      }),
      transformResponse: (res) => res?.message,
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: () => ["user"],
    }),

    getUserTokenTransactions: builder.query({
      query: () => ({
        url: "transactions",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
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
      invalidatesTags: () => ["user"],
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
      transformResponse: (res) => res?.message,
      invalidatesTags: () => ["user"],
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
  useDeleteUserMutation,
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
