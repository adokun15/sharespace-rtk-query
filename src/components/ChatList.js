import { useAllChatsQuery } from "../store/Slices/matches";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

export default function ChatList() {
  /* const {
    data: chats,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useAllChatsQuery();

  if (isLoading || isFetching) {
    return <LoaderSpinner message="loading chats" />;
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }
  */

  const sortByDate = (date) => {};
  const sortByName = (date) => {};

  const chats = [
    {
      spaceId: 12,
      dateCreated: "12/323/23",
      user: {
        photo: "adada",
        name: "Adam Reese",
        id: "2323232",
      },
    },
    {
      spaceId: 13,
      dateCreated: "113/343/343",
      user: {
        photo: "aqqqwrq",
        name: "James Curry",
        id: "afasasas",
      },
    },
    {
      spaceId: 14,
      dateCreated: "12/3/23",
      user: {
        photo: "ada",
        name: "Lee ChANG",
        id: "3232",
      },
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl text-center">Chats</h1>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">All</Button>
            <PopoverContent>
              <ul>
                <li>All</li>
                <li>Name</li>
                <li>Recent</li>
              </ul>
            </PopoverContent>
          </PopoverTrigger>
        </Popover>
      </div>

      <ul className=" space-y-3 *:w-full mt-3">
        {chats?.map((chat) => (
          <Link
            to={chat?.spaceId}
            className=" hover:text-white bg-muted-foreground hover:bg-slate-600 transition-colors shadow flex px-2 py-3 even:bg-slate-50 rounded justify-between"
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={chat?.user?.photo} />
                <AvatarFallback>
                  {chat?.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <article>
                <h3 className="text-xl font-bold">{chat?.user?.name}</h3>
              </article>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
}
