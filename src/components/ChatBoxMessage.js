import { useEffect, useRef } from "react";
import { useLoadMessageQuery } from "../store/Slices/Space";
import { groupMessageByTime } from "../utils/TimeHandler";

import LoaderSpinner from "./LoaderSpinner";
import DataError from "./DataError";
import dayjs from "dayjs";

export default function ChatBoxMessage({ userObj, spaceId }) {
  const user = userObj;

  const { refetch, data, error, isError, isFetching, isLoading } =
    useLoadMessageQuery(spaceId, { skip: !spaceId || !user });

  const chatContainerRef = useRef(null);

  //Monitor chat container for need message;
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data?.chat]);

  if (isLoading || isFetching) {
    return <LoaderSpinner message="Getting message..." />;
  }

  if (isError) {
    return <DataError message={error?.message} refetch={refetch} />;
  }

  const groupedChat = groupMessageByTime(data?.chat);

  return (
    <main>
      {(!data?.chat || data?.chat.length === 0) && (
        <p className=" font-poppins text-center">Start a Chat!</p>
      )}

      <div ref={chatContainerRef} className="overflow-y-auto h-[54vh]">
        {groupedChat &&
          Object.entries(groupedChat).map(([time, chats]) => (
            <div key={time} className="p-2 my-1">
              <p className="text-center text-sm text-muted">
                {dayjs(time).format("YYYY-MM-DD h:mm A")}
              </p>
              {chats?.map((chat) => (
                <article
                  key={chat.message}
                  className={`flex px-6  ${
                    chat?.uid === user?.uid ? "justify-end " : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded min-h-8 py-1 font-poppins w-fit pr-2 min-w-[35%] max-w-[92%] text-pretty md:max-w-[70%] px-4 my-2
                    ${
                      chat?.uid === user?.uid
                        ? " bg-purple-500/50 "
                        : "bg-slate-400/40"
                    }  p-1`}
                  >
                    <p className="text-wrap md:text-[20px] text-[16px]">
                      {chat?.message}
                    </p>
                    {/* <span className="text-[14px] text-end block">
                    {NoticeDate(chat.timeSent)}
                  </span>*/}
                  </div>
                </article>
              ))}
            </div>
          ))}
      </div>
    </main>
  );
}
