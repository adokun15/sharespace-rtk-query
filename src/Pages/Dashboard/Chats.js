import ChatList from "../../components/ChatList";
import { useGetSpaceListQuery } from "../../store/Slices/Space";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import Button from "../../UI/Button";
import Container from "../../UI/Container";
export default function ChatsPage() {
  const { data: currentUser, isError: userError } = useIsLoggedInQuery();
  const { data, isError, isFetching, refetch, error, isLoading } =
    useGetSpaceListQuery(currentUser?.user.uid, {
      skip: !currentUser?.user.uid,
    });
  if (isLoading || isFetching) {
    return <p className="text-center text-xl">loading space...</p>;
  }

  if (isError || userError) {
    return (
      <div>
        <p className="text-center text-3xl font-[700] my-5">
          {error?.message || "Something went Wrong"}
        </p>

        <Button
          trigger={refetch}
          outline={true}
          elclass="mx-auto cursor-pointer block my-5"
        >
          Try again
        </Button>
      </div>
    );
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
      {/*
     <p className="text-center italic my-2">
        Message are automatically cleared after (3) days
      </p>
*/}
      <ChatList chats={data} />
    </Container>
  );
}
