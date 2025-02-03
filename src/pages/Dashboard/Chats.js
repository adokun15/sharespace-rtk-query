import ChatList from "../../components/ChatList";
import { useAllChatsQuery } from "../../store/Slices/matches";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";
export default function ChatsPage() {
  const {
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

  console.log(chats);
  return (
    <div className="container my-2">
      <h1 className="text-3xl text-center">Chats</h1>
      <ChatList chats={chats} />
    </div>
  );
}
