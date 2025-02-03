import { useLoadMessageQuery } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { NoticeDate } from "../utils/TimeHandler";
import { Badge } from "./ui/badge";

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

  if (isLoading || isFetching || userLoading) {
    return <p>spinner</p>;
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
      {data?.chat &&
        data?.chat.map((chat) => (
          <div key={chat.message} className="last:my-2">
            <article
              className={`flex px-6  ${
                chat?.uid === user?.uid ? "justify-end" : "justify-start"
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
