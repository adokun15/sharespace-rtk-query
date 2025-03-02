import { useEffect, useRef } from "react";
import { useLoadMessageQuery } from "../store/Slices/Space";
import { NoticeDate } from "../utils/TimeHandler";

import LoaderSpinner from "./LoaderSpinner";
import DataError from "./DataError";

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
  return (
    <main>
      {(!data?.chat || data?.chat.length === 0) && (
        <p className=" font-poppins text-center">Start a Chat!</p>
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
