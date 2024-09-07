import Image from "../UI/Image";
import Button from "../UI/Button";
import { useSpaceResponseMutation } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { useGetProfileQuery } from "../store/Slices/ProfileSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InviteSpaceList({ chat }) {
  //Get Id
  const { data: user } = useIsLoggedInQuery();

  //Mutation for Response
  const [responseToRequest, { isLoading }] = useSpaceResponseMutation({
    fixedCacheKey: "spaces-key",
  });

  //current user details
  const { data: profile } = useGetProfileQuery(user.user.uid, {
    skip: !user.user.uid,
  });

  //you: Replying A request
  const userDetails = {
    photourl: profile?.photourl,
    email: profile?.email,
    uid: user.user.uid,
    username: profile?.username,
  };

  const AwaitingResponse = async (response, chat) => {
    //external user: author_id, author_name,author_photo, author_email:,
    //other data received, from the request;
    const Setroommate = {
      uid: chat?.author_id,
      username: chat?.author_name,
      photourl: chat?.author_photo,
      email: chat?.author_email,
      dateReceived: chat.timeSent,
      // space, viewed
    };

    await responseToRequest({
      currentUserDetail: userDetails,
      requestDetail: Setroommate,
      response,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };

  return (
    <ul className=" divide-y-2 overflow-y-scroll h-[70vh]">
      {chat &&
        chat.length >= 1 &&
        chat?.map((chat_user) => (
          <div className=" flex items-center gap-3">
            {!chat_user.viewed && (
              <>
                <div className="mx-3 relative ">
                  <Image h={90} w={90} imgSrc={chat_user?.author_photo} />
                </div>

                <div className="py-4 space-y-2">
                  <p className="text-xl font-[800] font-roboto capitalize">
                    {chat_user?.author_name}
                  </p>
                  {isLoading && (
                    <p className="mt-[1vh] text-center animate-spin text-2xl">
                      <FontAwesomeIcon icon={faSpinner} />
                    </p>
                  )}

                  <article className="flex gap-3 box-border py-4">
                    {!isLoading && (
                      <>
                        <Button
                          trigger={async () => {
                            await AwaitingResponse("declined", chat_user);
                          }}
                          elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full"
                        >
                          Decline
                        </Button>
                        <Button
                          trigger={async () => {
                            await AwaitingResponse("accepted", chat_user);
                          }}
                          elClass="w-full rounded-full focus:scale-75 transition-all"
                        >
                          Accept
                        </Button>
                      </>
                    )}
                  </article>
                </div>
              </>
            )}
          </div>
        ))}
    </ul>
  );
}
