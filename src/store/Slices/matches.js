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
      transformResponse: (res) => res?.attempts,
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
      transformResponse: (res) => res?.proposals,
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
      transformResponse: (res) => res?.chats,
    }),

    // Delete / Leave Single Chat
    deleteChat: builder.query({
      query: (chatId) => ({
        url: `chats/${chatId}`,
        method: "GET",
      }),
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),
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

    //Send A initial TEXT, then Email to the other user
    meetRoomate: builder.mutation({
      query: (id) => {
        return {
          url: `${id}`,
          method: "POST",
        };
      },
      transformErrorResponse: (err) => ({
        statusCode: err?.data?.statusCode,
        status: err?.data?.status,
        message: err?.data?.message,
      }),

      //  invalidatesTags: ()=>[]
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
      invalidatesTags: (result, err, id) => [{ id, type: "roommate" }],
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
  }),
});

export const {
  useRoomateSpaceQuery,
  useSingleRoomateQuery,
  useMeetRoomateMutation,
  useAllChatsQuery,
  useRequestsFromListQuery,
  useRequestsToListQuery,
  useRoomieSpaceFormMutation,
  useFindRoomieSpaceMutation,
  useDeleteSingleRoomateMutation,
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
