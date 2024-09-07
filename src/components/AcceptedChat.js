import Image from "../UI/Image";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useDeleteSpaceManuallyMutation } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { useGetProfileQuery } from "../store/Slices/ProfileSlice";

export default function AcceptedChatRequest({ acceptedChat }) {
  //getting user id
  const { data: user } = useIsLoggedInQuery();

  //Delete space / leave session
  const [deleteSpace, { isError, data: deletionDetails, isLoading, error }] =
    useDeleteSpaceManuallyMutation();

  //route to space
  const router = useNavigate();

  //user profile
  const { data: profile } = useGetProfileQuery(user.user.uid);

  //you: deleting space
  const userDetails = {
    photourl: profile?.photourl,
    email: profile?.email,
    uid: user.user.uid,
    username: profile?.username,
  };

  const leaveSession = async (acceptedChat) => {
    //roommate precised space detail sent initially;
    const spaceListObj = {
      uid: acceptedChat?.uid,
      username: acceptedChat?.username,
      author_photo: acceptedChat?.author_photo,
      email: acceptedChat?.email,

      spaceId: acceptedChat?.spaceId, //shared space

      viewed: "accepted",
      timeSent: acceptedChat?.timeSent,
    };

    await deleteSpace({
      user: userDetails,
      RoommateSpaceObj: spaceListObj,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };
  return (
    <ul className=" divide-y-2 overflow-y-scroll h-[70vh]">
      {acceptedChat &&
        acceptedChat.length >= 1 &&
        acceptedChat?.map((chat) => (
          <div className=" flex items-center gap-3">
            {chat.viewed && (
              <>
                <div className="mx-3 relative ">
                  <Image h={90} w={90} imgSrc={chat.photourl} />
                </div>

                <div className="py-4 space-y-2">
                  <p className="text-xl font-[800] font-roboto capitalize">
                    {chat.username}
                  </p>
                  <article className="flex gap-3 box-border py-4">
                    <Button
                      trigger={leaveSession}
                      loading={isLoading}
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
                </div>
              </>
            )}
          </div>
        ))}
    </ul>
  );
}
