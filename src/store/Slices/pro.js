const { pro_api } = require("../api");

const proSlice = pro_api.injectEndpoints({
  endpoints: (builder) => ({
    goPro: builder.mutation({
      query: () => {
        return {
          url: "",
          method: "POST",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),

    confirmPayment: builder.query({
      query: (refId) => ({ url: `${refId}`, method: "GET" }),
      transformResponse: (r) => r?.info,
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),
  }),
});

export const { useGoProMutation, useConfirmPaymentQuery } = proSlice;
