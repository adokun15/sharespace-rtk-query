import Image from "../UI/Image";
import ProfilePicDemo from "../image/202330014270ff.jpg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { cookie_id } from "../utils/authHandler";
import { useSpaceResponseMutation } from "../store/Slices/Space";

export default function ChatList({ chats }) {
  const router = useNavigate();

  //Invalidate : spaces
  const [responseToRequest, { data, error, isLoading }] =
    useSpaceResponseMutation();

  const AwaitingResponse = async (roommateId, response) => {
    await responseToRequest({
      uid: cookie_id,
      author_id: roommateId,
      response,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };

  console.log(data);
  console.log(error);
  console.log(isLoading);
  return (
    <ul className=" divide-y-2 overflow-y-scroll h-[70vh]">
      {chats &&
        chats.length >= 1 &&
        chats?.map((chat, i) => (
          <div className=" flex gap-3" key={chat.chatId}>
            <div className="mx-3 relative ">
              <Image imgSrc={ProfilePicDemo} />
              {i % 2 !== 0 && <Image imgSrc={ProfilePicDemo} />}
            </div>

            <div className="py-4 space-y-6">
              <p className="text-4xl">
                {chat?.author ? chat?.author : chat?.roommate}{" "}
              </p>
              <p>Last Time Opened: 1hr ago</p>
              <>
                {chat?.viewed === "accepted" && (
                  <article className="flex gap-3 box-border py-4">
                    <Button elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full">
                      Leave Session
                    </Button>

                    <Button
                      onClick={() =>
                        chat?.spaceId ? router(`${chat?.spaceId}`) : null
                      }
                      elClass="w-full rounded-full focus:scale-75 transition-all"
                    >
                      View Space
                    </Button>
                  </article>
                )}

                {!chat?.viewed && (
                  <article className="flex gap-3 box-border py-4">
                    <Button
                      onClick={async () => {
                        await AwaitingResponse(chat?.author, "declined");
                      }}
                      elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full"
                    >
                      Decline
                    </Button>

                    <Button
                      onClick={async () => {
                        await AwaitingResponse(chat?.author, "accepted");
                      }}
                      elClass="w-full rounded-full focus:scale-75 transition-all"
                    >
                      Accept
                    </Button>
                  </article>
                )}
              </>
            </div>
          </div>
        ))}
    </ul>
  );
}
