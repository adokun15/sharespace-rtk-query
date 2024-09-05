import { CreateDocumentWithAutoId } from "../../firebase/CreateDocument";
import { getDocument } from "../../firebase/GetDocument";
import { UploadImageHelper } from "../../firebase/Storage";
import {
  RemoveADocumentArray,
  UpdateADocumentArray,
  UpdateADocumentObject,
} from "../../firebase/UpdateDocument";
import { DbError } from "../../utils/ErrorHandlers";
import { api } from "../api";
import { DeleteADocument, DeleteStoragePath } from "../../firebase/DeleteDoc";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/init";

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
        //alert roommate
        try {
          await UpdateADocumentArray(roommate.uid, "users", {
            key: "spaces",
            newValue: {
              author: user?.uid,
              author_name: user?.username || null,
              author_photo: user?.photourl || null,
              author_email: user?.email || null,
              spaceId: null,
              viewed: false,
              timeSent: new Date().toISOString(),
            },
          });

          //add notice: for other user to accept space or not;
          await UpdateADocumentArray(roommate.uid, "notices", {
            key: "notifications",
            newValue: {
              type: "invites",
              from: user,
              seen: false,
              timeSent: new Date().toISOString(),
            },
          });
          //notice for YOU
          await UpdateADocumentArray(user?.uid, "notices", {
            key: "notifications",
            newValue: {
              type: "request",
              to: roommate,
              seen: false,
              timeSent: new Date().toISOString(),
            },
          });

          return { data: "Request Sent Successfully!" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      invalidatesTags: (result) => [{}],
    }),

    spaceResponse: builder.mutation({
      //receiver
      async queryFn({ currentUserDetail, requestDetail, response }) {
        //create new space: (response)
        try {
          //Find request space: filter(remove);
          let oldRequest = {
            author: requestDetail?.uid,
            author_name: requestDetail?.user?.name,
            author_photo: requestDetail?.user?.photourl,
            spaceId: null,
            viewed: false,
            timeSent: requestDetail?.timeSent,
          };

          //filter out;
          await RemoveADocumentArray(currentUserDetail?.uid, "users", {
            key: "spaces",
            oldValue: oldRequest,
          });

          switch (response) {
            case "accepted":
              //create space;
              const space = await CreateDocumentWithAutoId("space", {
                users: [requestDetail, currentUserDetail],
                author: requestDetail?.uid,
                messages: [],
              });

              //update users space list;
              await UpdateADocumentArray(currentUserDetail?.uid, "users", {
                key: "spaces",
                newValue: {
                  author: requestDetail?.uid,
                  author_name: requestDetail?.user?.name,
                  author_photo: requestDetail?.user?.photourl,
                  spaceId: space,
                  viewed: "accepted",
                },
              });

              //update space list for initial  user
              await UpdateADocumentArray(requestDetail?.uid, "users", {
                key: "spaces",
                newValue: {
                  roommate: requestDetail,
                  spaceId: space,
                  viewed: "accepted",
                },
              });

              //add notice: for other user
              await UpdateADocumentObject(requestDetail?.uid, "notices", {
                key: "notifications",
                newValue: {
                  type: "reply",
                  from: currentUserDetail?.username,
                  timeSent: new Date().toISOString(),
                  response: "accepted",
                },
              });
              return {
                data: "Acceptance Received!. A New Space for chatting has been created!",
              };
            case "declined":
              //add notice: for other user
              await UpdateADocumentObject(requestDetail?.uid, "notices", {
                key: "notifications",
                newValue: {
                  type: "reply",
                  from: currentUserDetail?.username,
                  response: "declined",
                },
              });

              return { data: "Successfully declined Requested" };

            default:
              return { data: null };
          }
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
    /* Space CHAT */

    //listen for changes in db
    loadMessage: builder.query({
      //onsnapshapshot: stream;
      async queryFn(spaceId) {
        try {
          const prevMessage = await getDocument(spaceId, "space");
          return { data: prevMessage?.messages };
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
            updateCachedData((draft) => {
              draft.messages.length = 0;
              draft.message.push({ ...snapshot.data()?.messages });
            });
          },
          (error) => {
            throw new DbError(error?.message);
          }
        );

        await cacheEntryRemoved;
        unsub();
      },
    }),

    //send update to  space db
    addmessage: builder.mutation({
      async queryFn({ spaceId, message }) {
        try {
          await UpdateADocumentArray(spaceId, "space", {
            key: "messages",
            newValue: {
              type: "text",
              message: message?.chat,
              user: message?.username,
              timeSent: new Date(),
              messageId: "SomeRandomkeys",
            },
          });

          return { data: "delivered" };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
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
      async queryFn({ user, spaceObj }) {
        console.log(user);
        console.log(spaceObj);
        try {
          //Remove space from list
          await RemoveADocumentArray(user?.uid, "users", {
            key: "spaces",
            oldValue: { ...spaceObj },
          });

          /* if (user?.uid === spaceObj?.author_id) {
            //delete doc
            const path = `space/${spaceObj?.spaceId}`;

            //delete from db
            await DeleteADocument(path);
            //delete from storage
            await DeleteStoragePath(path);
            //notice other user if deleted space
            const otherRoommate = spaceObj?.users?.filter(
              (roommate) => roommate.uid !== user?.uid
            );
            await UpdateADocumentArray(otherRoommate?.uid, "users", {
              key: "notifications",
              newValue: {
                type: "sent_off",
                from: user?.username,
                seen: false,
                timeSent: new Date().toISOString(),
              },
            });
          }
          if (user?.uid !== spaceObj?.author_id) {
            //notice other user you left
            await UpdateADocumentArray(spaceObj?.author_id, "users", {
              key: "notifications",
              newValue: {
                type: "left_space",
                from: user?.username,
                seen: false,
                timeSent: new Date().toISOString(),
              },
            });
          }*/
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
    }),
  }),
});

export const {
  useGetNoticesQuery,
  useDeleteAllNoticesMutation,
  useLoadMessageQuery,
  useAddmessageMutation,
  useSpaceRequestMutation,
  useGetSpaceListQuery,
  useGetNotifyForSpaceQuery,
  useSpaceResponseMutation,
  useDeleteSpaceAutomaticallyQuery,
  useSendmediaMutation,
  useDeleteSpaceManuallyMutation,
} = UserSpaceSlice;
