import { getDocument } from "../../firebase/GetDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/init";

const UserSpaceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    loadSpaceUser: builder.query({
      //onsnapshapshot: stream;
      async queryFn(spaceId) {
        try {
          const space = await getDocument(spaceId, "space");
          return { data: { ...space, spaceId } };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
    loadMessage: builder.query({
      async queryFn(spaceId) {
        try {
          const prevMessage = await getDocument(spaceId, "space");
          return { data: { chat: prevMessage?.messages || [] } };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      async onCacheEntryAdded(
        spaceId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        const unsub = onSnapshot(
          doc(db, "space", spaceId),
          (snapshot) => {
            if (!snapshot.data()?.messages) return;
            updateCachedData((draft) => {
              draft.chat = [...snapshot.data()?.messages];
            });
          },
          (error) => {
            throw new DbError(error?.message);
          }
        );
        await cacheEntryRemoved;
        unsub();
      },
      providesTags: (result) => ["space"],
    }),
    //send update to  space db
    addMessage: builder.mutation({
      async queryFn({ spaceId, message }) {
        try {
          /*          await UpdateADocumentArray(spaceId, "space", {
            key: "messages",
            newValue: {
              message: message?.chat,
              uid: message?.uid,
              timeSent: message.timeSent,
              messageId: message.id,
            },
          });
          */
          //return { data: "delivered" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      //invalidatesTags: (result) => ["space"],
    }),

    //add downloadable url to space
    sendMedia: builder.mutation({
      async queryFn({ file, spaceId, user }) {
        try {
          //const filePath = `space/${spaceId}/${file?.name}`;
          //   const url = await UploadImageHelper(filePath, file);
          /* await UpdateADocumentObject(spaceId, filePath, {
            key: "message",
            newValue: {
              type: "media",
              url,
              user: user?.username,
              timeSent: new Date(),
              messageId: "SomeRandomkeys",
            },
          });*/
          // return { data: null };
        } catch (err) {
          throw new DbError(err?.message);
        }
      },
    }),
    deleteMessage: builder.mutation({}),
    deleteSingleSpace: builder.mutation({}),
  }),
});

export const {
  useLoadMessageQuery,
  useLoadSpaceUserQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
  useSendMediaMutation,
} = UserSpaceSlice;
