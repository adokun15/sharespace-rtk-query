import Image from "../UI/Image";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSpaceManuallyMutation,
  useSpaceResponseMutation,
} from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { useGetProfileQuery } from "../store/Slices/ProfileSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Invites = () => {};
const Requests = () => {};

function SingleChat({ chat }) {
  const [responseToRequest, { isLoading }] = useSpaceResponseMutation({
    fixedCacheKey: "spaces-key",
  });

  const [deleteSpace, { isError, data: deletio, isLoading: DELETION, error }] =
    useDeleteSpaceManuallyMutation();
  const router = useNavigate();
  const { data: user } = useIsLoggedInQuery();

  const { data: profile } = useGetProfileQuery(user.user.uid, {
    skip: !user.user.uid,
  });

  const Setroommate = {
    uid: chat?.author,
    user: {
      name: chat?.author_name,
      photourl: chat?.author_photo,
      email: chat?.author_email,
    },
    timeSent: chat?.timeSent,
  };
  const userDetails = {
    photourl: profile?.photourl,
    email: profile?.email,
    uid: user.user.uid,
    username: profile?.username,
  };

  const AwaitingResponse = async (response) => {
    await responseToRequest({
      currentUserDetail: userDetails,
      requestDetail: Setroommate,
      response,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };
  //load spavr
  const spaceObj = {
    author_id: chat?.author,
    author_name: chat?.author_name,
    author_photo: chat?.author_photo,
    spaceId: chat?.spaceId,
    viewed: "accepted",
  };

  const leaveSession = async () => {
    await deleteSpace({
      user: userDetails,
      spaceObj,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };
  return (
    <div className=" flex items-center gap-3">
      <div className="mx-3 relative ">
        <Image h={90} w={90} imgSrc={chat?.roommate.user?.photourl} />
      </div>

      <div className="py-4 space-y-2">
        <p className="text-xl font-[800] font-roboto capitalize">
          {chat?.roommate.user.name
            ? chat?.roommate.user?.name
            : "Id could not be Found!"}{" "}
        </p>
        <>
          {chat?.viewed === "accepted" && (
            <article className="flex gap-3 box-border py-4">
              <Button
                trigger={leaveSession}
                elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full"
              >
                Leave Session
              </Button>

              <Button
                trigger={() =>
                  chat?.spaceId ? router(`${chat?.spaceId}`) : null
                }
                elClass="w-full rounded-full focus:scale-75 transition-all"
              >
                View Space
              </Button>
            </article>
          )}
          <>
            {isLoading && (
              <p className="mt-[1vh] text-center animate-spin text-2xl">
                <FontAwesomeIcon icon={faSpinner} />
              </p>
            )}
            {!chat?.viewed && !isLoading && (
              <article className="flex gap-3 box-border py-4">
                <Button
                  trigger={async () => {
                    await AwaitingResponse("declined");
                  }}
                  elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full"
                >
                  Decline
                </Button>

                <Button
                  trigger={async () => {
                    await AwaitingResponse("accepted");
                  }}
                  elClass="w-full rounded-full focus:scale-75 transition-all"
                >
                  Accept
                </Button>
              </article>
            )}
          </>
        </>
      </div>
    </div>
  );
}

export default function ChatList({ chats }) {
  // eslint-disable-next-line no-unused-vars
  const [noUse, { data, isError, error }] = useSpaceResponseMutation({
    fixedCacheKey: "spaces-key",
  });

  console.log(chats);
  /*
requestDetail: user: {email, img, name}, uid, timeSent
currentDetail: uid, user
 */

  return (
    <>
      <p className="text-3xl text-center my-10 text-main_color">
        {data && data}
      </p>
      <p className="text-center my-4 text-red-600">
        {isError && error.message}
      </p>
      <ul className=" divide-y-2 overflow-y-scroll h-[70vh]">
        {chats &&
          chats.length >= 1 &&
          chats?.map((chat) => <SingleChat chat={chat} />)}
      </ul>
    </>
  );
}
