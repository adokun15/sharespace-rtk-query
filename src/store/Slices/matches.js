import { roomate_api } from "../api";
const MatchLogicSlice = roomate_api.injectEndpoints({
  endpoints: (builder) => ({
    //attempts
    requestsToList: builder.query({
      query: () => ({
        url: "chats/s",
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      providesTags: (res) =>
        res
          ? res?.map(({ receiver }) => [
              { type: "attempts", id: receiver?.requestId },
              { type: "attempts", id: "ATTEMPTLIST" },
            ])
          : [{ type: "attempts", id: "ATTEMPTLIST" }],

      transformResponse: (res) => res?.attempts,
    }),

    //Withdraw : attempt
    withdrawProposal: builder.mutation({
      query: (roomieId) => ({
        url: `chats/s/${roomieId}`,
        method: "POST",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: (res, err, id) => ["attempts"],
      transformResponse: (res) => res?.message,
    }),

    //proposals
    requestsFromList: builder.query({
      query: () => ({
        url: "chats/r",
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      providesTags: (res) =>
        res
          ? res?.map(({ requestId }) => [
              { type: "proposals", id: requestId },
              { type: "proposals", id: "PROPOSAL_LIST" },
            ])
          : [{ type: "proposals", id: "PROPOSAL_LIST" }],
      transformResponse: (res) => res?.proposals,
    }),

    //React to proposal
    respondToProposal: builder.mutation({
      //info -- { reply, request }
      query: (info) => ({
        url: `chats/r/${info?.request?.requestId}`,
        method: "POST",
        body: JSON.stringify(info),
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      transformResponse: (res) => res?.message,
      invalidatesTags: () => ["proposals"],
    }),

    //user / chats subcollection
    allChats: builder.query({
      keepUnusedDataFor: 10,
      query: () => ({
        url: "chats",
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      providesTags: (res) =>
        res
          ? res?.map(({ spaceId }) => [
              { type: "chats", id: spaceId },
              { type: "chats", id: "CHATLIST" },
            ])
          : [{ type: "chats", id: "CHATLIST" }],
      transformResponse: (res) => res?.chats,
    }),

    // Report Single Chat
    reportChat: builder.mutation({
      query: ({ spaceId, reason, email }) => ({
        url: `chats/${spaceId}`,
        method: "POST",
        body: JSON.stringify({ spaceId, reason, email }),
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: () => ["chat"],
    }),

    // Delete / Leave Single Chat
    deleteChat: builder.mutation({
      query: ({ requestId, spaceId, name, reason }) => {
        return {
          url: `chats/${spaceId}`,
          method: "DELETE",
          body: JSON.stringify({ requestId, spaceId, name, reason }),
        };
      },

      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: () => ["chat"],
    }),

    //add to roommate list
    roomieSpaceForm: builder.mutation({
      query: (info) => ({
        url: "",
        method: "POST",
        body: JSON.stringify({ info }),
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: (result, err, arg) => [
        { id: arg?.id, type: "roommates" },
      ],
    }),

    //Send A initial TEXT, then Email to the other user
    meetRoomate: builder.mutation({
      query: (info) => {
        return {
          url: `${info?.roomieInfo?.id}`,
          method: "POST",
          body: JSON.stringify(info),
        };
      },
      invalidatesTags: (res, err, arg) => [
        { type: "roommates", id: arg?.roomieInfo?.id },
      ],
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),

    //Report Post!
    reportRoommatePost: builder.mutation({
      query: ({ postId, email, reason }) => {
        return {
          url: `${postId}/report`,
          method: "POST",
          body: JSON.stringify({ postId, email, reason }),
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "roommates", id: arg?.postId },
      ],
    }),

    //Get Info about USER
    singleRoomate: builder.query({
      query: ({ id, invited }) => {
        return {
          url: `${id}?invited=${invited}`,
          method: "GET",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      providesTags: (res) =>
        res ? [{ id: res?.id, type: "roommate" }] : [{ type: "roommate" }],
    }),

    //Delete Info about User
    deleteSingleRoomate: builder.mutation({
      query: (id) => {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      invalidatesTags: (result, err, id) => [{ id, type: "user_roommate" }],
    }),

    //Get ALL ROOMMATE / space
    roomateSpace: builder.query({
      keepUnusedDataFor: 90,
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
      transformResponse: (res) => res.roommates,
      providesTags: (res) =>
        res
          ? res?.map(({ id }) => [
              { type: "roommates", id: id },
              { type: "roommates", id: "ROOMMATELIST" },
            ])
          : [{ type: "roommates", id: "ROOMMATELIST" }],
    }),

    userRoomateSpace: builder.query({
      keepUnusedDataFor: 120,
      query: () => ({
        url: "user",
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),

      providesTags: (res) =>
        res
          ? res?.map(({ id }) => [
              { type: "user_roommate", id: id },
              { type: "user_roommate", id: "USER_ROOMMATELIST" },
            ])
          : [{ type: "user_roommate", id: "USER_ROOMMATELIST" }],
    }),

    //Find Close Roomate / Space
    findRoomieSpace: builder.mutation({
      query: (info) => ({
        url: "find",
        method: "POST",
        body: JSON.stringify(info),
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
    }),
  }),
});

export const {
  useUserRoomateSpaceQuery,
  useRoomateSpaceQuery,
  useSingleRoomateQuery,
  useMeetRoomateMutation,
  useAllChatsQuery,
  useRequestsFromListQuery,
  useRequestsToListQuery,
  useRoomieSpaceFormMutation,
  useFindRoomieSpaceMutation,
  useDeleteSingleRoomateMutation,
  useRespondToProposalMutation,
  useDeleteChatMutation,
  //new
  useReportChatMutation,
  useWithdrawProposalMutation,
  useReportRoommatePostMutation,
} = MatchLogicSlice;

/*
: builder.query({
      query({ uid, formDetails }) {
        try {
          // Get Users
          const matches = await getMultipleMatches(uid);

          //check if user in already added to space;

          //Rate Users and sort User
          const redefinedUsers = ScoresReport(formDetails, matches);
          //
          return { data: redefinedUsers };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    
*/
