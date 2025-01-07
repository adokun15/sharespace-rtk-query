import ChatList from "../../components/ChatList";
import { useAllChatsQuery } from "../../store/Slices/matches";
import DataError from "../../components/DataError";
import LoaderSpinner from "@/src/components/LoaderSpinner";
export default function ChatsPage() {
  const { data: chats, isError, error, isLoading } = useAllChatsQuery();

  if (isLoading) {
    return <LoaderSpinner message="loading chats" />;
  }

  if (isError) {
    return <DataError error={error} />;
  }

  return (
    <div className="container my-2">
      <h1 className="text-3xl text-center">Chats</h1>
      <ChatList chats={chats} />
    </div>
  );
}
