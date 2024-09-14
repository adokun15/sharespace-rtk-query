import { useParams } from "react-router-dom";
import { useLoadMessageQuery } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { NoticeDate } from "../utils/TimeHandler";

export default function ChatBoxMessage() {
  const { data: user } = useIsLoggedInQuery();

  const spaceParams = useParams();

  // message: sent
  const {
    data: messages,
    error,
    isError,
    isLoading,
  } = useLoadMessageQuery(spaceParams.spaceId);

  if (isLoading) {
    return <p>{error?.message}</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <main>
      {!messages.messages && <p>Start a chat!</p>}
      {messages.messages &&
        messages.messages.map((chat) => (
          <div key={chat.message} className="last:my-2">
            <article
              className={`flex px-6  ${
                chat?.uid === user?.user?.uid ? "justify-end" : "justify-start"
              }`}
            >
              <div className="rounded-2xl  w-fit pr-2 min-w-[30%] max-w-[70%] px-4  my-4 bg-purple-500/50 p-1">
                <div>
                  <p className="text-xl font-[700]"></p>
                </div>
                <p className="text-wrap text-[20px]">{chat?.message}</p>
                <span className="text-[14px] text-end block">
                  {NoticeDate(chat.timeSent)}
                </span>
              </div>
            </article>
          </div>
        ))}
    </main>
  );
}
