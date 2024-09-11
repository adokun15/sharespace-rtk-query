import { CreateDocumentWithAutoId } from "../../firebase/CreateDocument";
import { getDocument } from "../../firebase/GetDocument";
import {
  FilterDocumentArray,
  UpdateADocumentArray,
  UpdateADocumentObject,
} from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
import { DeleteADocument } from "../../firebase/DeleteDoc";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/init";
//import { decryptTexts } from "../../utils/TextHandler";

//tags: spaces,space-chat

//a user get only get Five maximum spaces

const UserSpaceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    //load spaces
    getSpaceList: builder.query({
      async queryFn(id) {
        try {
          const data = await getDocument(id);
          //     console.log(data);
          return { data: data?.spaces };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      providesTag: (result) => ["spaces"],
    }),

    //Temporarily clear notice
    /*  deleteAllNotices: builder.mutation({
      async queryFn(id) {
        try {
          await UpdateADocumentObject(id, "notices", {
            key: "notifications",
            newValue: [],
          });
          return { data: null };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
*/
    getNotices: builder.query({
      async queryFn(id) {
        //stream this
        try {
          const data = await getDocument(id, "notices");
          //   console.log(data);
          return { data: data?.notifications };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
    /* Space LIST && Space Notice */

    //create a new space
    spaceRequest: builder.mutation({
      //sender
      async queryFn({ user, roommate }) {
        /*   uid,username,photourl,email,*/
        //alert external user:
        try {
          await UpdateADocumentObject(roommate?.uid, "users", {
            key: "isAvailable",
            newValue: false,
          });
          await UpdateADocumentArray(roommate.uid, "users", {
            key: "spaces",
            newValue: {
              author_id: user?.uid,
              author_name: user?.username || null,
              author_photo: user?.photourl || null,
              author_email: user?.email || null,
              spaceId: user?.uid,
              viewed: false,
              timeSent: new Date().toISOString(),
            },
          });

          //add notice: for other user to accept space or not;
          await UpdateADocumentArray(roommate.uid, "notices", {
            key: "notifications",
            newValue: {
              type: "invites",
              from: user.username,
              //seen: false,
              timeSent: new Date().toISOString(),
            },
          });

          //notice for YOU
          await UpdateADocumentArray(user?.uid, "notices", {
            key: "notifications",
            newValue: {
              type: "request",
              to: roommate.username,
              seen: false,
              timeSent: new Date().toISOString(),
            },
          });

          await UpdateADocumentArray(user.uid, "users", {
            key: "spaces",
            newValue: {
              author_id: roommate?.uid,
              author_name: roommate?.username || null,
              author_photo: roommate?.photourl || null,
              author_email: roommate?.email || null,
              spaceId: user?.uid,
              viewed: "awaiting",
              timeSent: new Date().toISOString(),
            },
          });
          return { data: "Request Sent Successfully!" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result) => ["match"],
    }),

    spaceResponse: builder.mutation({
      //receiver
      async queryFn({ currentUserDetail, requestDetail, response }) {
        //create new space: (response)
        try {
          //filter out;
          switch (response) {
            case "accepted":
              //create space;
              const space = await CreateDocumentWithAutoId("space", {
                users: [requestDetail, currentUserDetail],
                author: requestDetail?.uid,
                messages: [],
              });

              //update your new space list;
              await UpdateADocumentArray(currentUserDetail?.uid, "users", {
                key: "spaces",
                newValue: {
                  uid: requestDetail?.uid,
                  username: requestDetail?.username,
                  photourl: requestDetail?.photourl,
                  email: requestDetail?.email,
                  spaceId: space,
                  viewed: "accepted",
                  timeSent: new Date().toISOString(),
                },
              });

              await FilterDocumentArray(currentUserDetail?.uid, "users", {
                key: "spaces",
                id: requestDetail?.uid,
              });

              //update roomate space list for initial  user
              await UpdateADocumentArray(requestDetail?.uid, "users", {
                key: "spaces",
                newValue: {
                  uid: currentUserDetail?.uid,
                  username: currentUserDetail?.username,
                  photourl: currentUserDetail?.photourl,
                  email: currentUserDetail?.email,
                  spaceId: space,
                  viewed: "accepted",
                  timeSent: new Date().toISOString(),
                },
              });

              //add notice: for other user
              await UpdateADocumentArray(requestDetail?.uid, "notices", {
                key: "notifications",
                newValue: {
                  type: "reply",
                  from: currentUserDetail?.username,
                  timeSent: new Date().toISOString(),
                  response: "accepted",
                },
              });
              return {
                data: `Accepted ${requestDetail?.username} request. A new space has been created!`,
              };

            case "declined":
              //add notice: for other user
              await UpdateADocumentArray(requestDetail?.uid, "notices", {
                key: "notifications",
                newValue: {
                  type: "reply",
                  timeSent: new Date().toISOString(),
                  from: currentUserDetail?.username,
                  response: "declined",
                },
              });

              await UpdateADocumentArray(requestDetail?.uid, "users", {
                key: "spaces",
                newValue: {
                  author_id: currentUserDetail?.uid,
                  author_name: currentUserDetail?.username,
                  author_photo: currentUserDetail?.photourl || null,
                  author_email: currentUserDetail?.email,
                  spaceId: requestDetail?.uid,
                  viewed: "declined",
                  timeSent: new Date().toISOString(),
                },
              });

              return { data: `Declined ${requestDetail?.username} request!` };

            default:
              return { data: null };
          }
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: ["spaces"],
    }),
    /* Space CHAT */

    loadSpaceUser: builder.query({
      //onsnapshapshot: stream;
      async queryFn(spaceId) {
        try {
          const space = await getDocument(spaceId, "space");
          return { data: space };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
    //listen for changes in db
    loadMessage: builder.query({
      //onsnapshapshot: stream;
      async queryFn(spaceId) {
        try {
          const prevMessage = await getDocument(spaceId, "space");
          //  const decryptText = decryptTexts(prevMessage.messages); //message()
          return { data: { messages: prevMessage?.messages || [] } };
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
              //  const decryptText = decryptTexts(snapshot.data()?.messages); //message()
              draft.messages = [...snapshot.data()?.messages];
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
    addmessage: builder.mutation({
      async queryFn({ spaceId, message }) {
        try {
          await UpdateADocumentArray(spaceId, "space", {
            key: "messages",
            newValue: {
              message: message?.chat,
              uid: message?.uid,
              timeSent: message.timeSent,
              messageId: message.id,
            },
          });

          return { data: "delivered" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      //invalidatesTags: (result) => ["space"],
    }),

    //Auto-clear messages: 72 hours
    /*  deleteSpaceAutomatically: builder.query({
      async queryFn({ spaceId, spaceGivenExpirationDate, chatTimelimit }) {
        if (spaceGivenExpirationDate > chatTimelimit) {
          await UpdateADocumentObject(spaceId, "space", {
            key: "messages",
            newValue: [],
          });
          const path = `space/${spaceId}`;

          await DeleteStoragePath(path);
          //Generate new time Limit

          return { data: null };
        } else {
          return { data: null };
        }
      },
    }),

    //add downloadable url to space
    sendmedia: builder.mutation({
      async queryFn({ file, spaceId, user }) {
        try {
          const filePath = `space/${spaceId}/${file?.name}`;
          const url = await UploadImageHelper(filePath, file);

          await UpdateADocumentObject(spaceId, filePath, {
            key: "message",
            newValue: {
              type: "media",
              url,
              user: user?.username,
              timeSent: new Date(),
              messageId: "SomeRandomkeys",
            },
          });
          return { data: null };
        } catch (err) {
          throw new DbError(err?.message);
        }
      },
    }), 
*/
    //delete-space message
    deleteSpaceManually: builder.mutation({
      async queryFn({ user, RoommateSpaceObj }) {
        try {
          if (!RoommateSpaceObj.spaceId) return;
          //Get both user Space
          const space = await getDocument(RoommateSpaceObj?.spaceId, "space"); //author, users, messages
          //Remove space from list
          await FilterDocumentArray(user?.uid, "users", {
            key: "spaces",
            id: space?.id,
          });

          //check if you are the "author" -- initially sends the request
          if (user?.uid === space?.author) {
            //delete doc
            await DeleteADocument("space", space?.id);

            //notice other user if deleted space
            await UpdateADocumentArray(RoommateSpaceObj?.uid, "notices", {
              key: "notifications",
              newValue: {
                type: "sent_off",
                from: user?.username,
                seen: false,
                timeSent: new Date().toISOString(),
              },
            });

            //Other roomate Spaces
            await FilterDocumentArray(RoommateSpaceObj?.uid, "users", {
              key: "spaces",
              id: space.id,
            });
          }
          if (user?.uid !== space?.author) {
            //notice other user you left
            await UpdateADocumentArray(RoommateSpaceObj?.uid, "notices", {
              key: "notifications",
              newValue: {
                type: "left_space",
                from: user?.username,
                seen: false,
                timeSent: new Date().toISOString(),
              },
            });

            await UpdateADocumentObject(space.id, "space", {
              key: "users",
              newValue: [RoommateSpaceObj],
            });
          }
          return { data: "exit success!" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: ["spaces"],
    }),
  }),
});

export const {
  useGetNoticesQuery,
  useLoadMessageQuery,
  useAddmessageMutation,
  useSpaceRequestMutation,
  useGetSpaceListQuery,
  useSpaceResponseMutation,
  useDeleteSpaceManuallyMutation,
  useLoadSpaceUserQuery,
  //useDeleteAllNoticesMutation,
  // useGetNotifyForSpaceQuery,
  //useDeleteSpaceAutomaticallyQuery,
  //  useSendmediaMutation,
} = UserSpaceSlice;
