import ChatList from "../../components/ChatList";
import SearchChats from "../../components/SearchChats";
import { useGetSpaceListQuery } from "../../store/Slices/Space";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import Container from "../../UI/Container";
export default function ChatsPage() {
  const { data: currentUser } = useIsLoggedInQuery();
  const { data, isError, error, isLoading } = useGetSpaceListQuery(
    currentUser?.user.uid
  );
  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-3xl font-roboto font-[800] text-center my-6">
        No Space added yet!
      </p>
    );
  }

  return (
    <Container elClass="my-2">
      <header className=" px-6 ">
        <h1 className="text-4xl  text-center my-8"> Space </h1>
      </header>
      <p className="text-center italic my-2">
        Message are automatically cleared after (3) days
      </p>
      <ChatList chats={data} />
    </Container>
  );
}
