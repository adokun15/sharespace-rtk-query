import { useEffect, useRef } from "react";
import { useLoadMessageQuery } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { NoticeDate } from "../utils/TimeHandler";
import { Badge } from "./ui/badge";
import LoaderSpinner from "./LoaderSpinner";

export default function ChatBoxMessage({ spaceId }) {
  const {
    data: user,
    error: userError,
    isError: isUserError,
    isLoading: userLoading,
  } = useIsLoggedInQuery();

  const { data, error, isError, isFetching, isLoading } = useLoadMessageQuery(
    spaceId,
    { skip: !spaceId || !user }
  );

  const chatContainerRef = useRef(null);

  //Monitor chat container for need message;
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data?.chat]);

  if (isLoading || isFetching || userLoading) {
    return <LoaderSpinner message="Loading chat..." />;
  }

  if (isError || isUserError) {
    return <p>{error?.message || userError?.message}</p>;
  }

  return (
    <main>
      {!data?.chat && (
        <p>
          <Badge>Start a chat!</Badge>
        </p>
      )}

      <div ref={chatContainerRef} className="overflow-y-auto h-[54vh]">
        {data?.chat &&
          data?.chat.map((chat, index) => (
            <div key={index} className="p-2 my-1">
              <article
                className={`flex px-6  ${
                  chat?.uid === user?.uid ? "justify-end " : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl  w-fit pr-2 min-w-[30%] max-w-[70%] px-4  my-4
                  ${
                    chat?.uid === user?.uid
                      ? " bg-purple-500/50 "
                      : "bg-slate-400/40"
                  }  p-1`}
                >
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
      </div>
    </main>
  );
}
