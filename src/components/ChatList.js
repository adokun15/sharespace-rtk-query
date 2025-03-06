import {
  useAllChatsQuery,
  useDeleteChatMutation,
} from "../store/Slices/matches";
import { accountCreationDate } from "../utils/TimeHandler";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";
//import { Button } from "./ui/button";
//import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Loader2, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { useGetUserQuery } from "../store/Slices/user";

export default function ChatList() {
  const {
    data: chats,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useAllChatsQuery();

  const { data: user } = useGetUserQuery();

  const [deleteSingleChat, { isLoading: isLeaving }] = useDeleteChatMutation({
    skip: !user,
  });

  if (isLoading || isFetching) {
    return <LoaderSpinner message="loading chats" />;
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  const deleteChat = async (id, spaceId) => {
    if (!user) return;

    const data = {
      requestId: id,
      spaceId,
      name: user?.name,
    };

    data.reason = "Deleting!";

    await deleteSingleChat(data)
      .unwrap()
      .then((res) => {
        //Foce Refetch
        refetch();
        //alert User
        toast.success(res?.message);
      })
      .catch((e) => toast.error(e?.message));
  };

  /*
  const sortByDate = (date) => {};
  const sortByName = (date) => {};
*/
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb className="ml-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Chats</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {isLeaving && <Loader2 className="animate-spin" />}

        {/*<Popover>
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
        </Popover>*/}
      </div>

      <ul className=" space-y-3 *:w-full mt-3">
        {chats?.map((chat, index) => (
          <div key={index} className="flex">
            <Link
              to={chat?.spaceId}
              className="grow hover:text-muted bg-muted-foreground transition-colors shadow flex px-2 py-3 even:bg-slate-50 rounded justify-between"
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
                  <p className="text-xs font-poppins text-muted">
                    Active since {accountCreationDate(chat?.dateCreated)}
                  </p>
                </article>
              </div>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <span>
                    <MoreVertical />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit rounded">
                <Button
                  variant="ghost"
                  data-chatId={chat?.spaceId}
                  onClick={async () =>
                    await deleteChat(chat?.user?.id, chat?.spaceId)
                  }
                >
                  Delete Chat
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </ul>
    </>
  );
}
