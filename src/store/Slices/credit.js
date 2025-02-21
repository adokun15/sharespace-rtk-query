const { credit_api } = require("../api");

const CreditSlice = credit_api.injectEndpoints({
  endpoints: (builder) => ({
    buyCredit: builder.mutation({
      query: ({ creditSize }) => ({
        url: "",
        method: "POST",
        body: JSON.stringify({ credit: creditSize }),
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),
    confirmCreditPayment: builder.query({
      query: (refId) => ({ url: `/${refId}`, method: "GET" }),
      transformResponse: (r) => r?.info,
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),
  }),
});

export const { useBuyCreditMutation, useConfirmCreditPaymentQuery } =
  CreditSlice;
