import {
  useAddMessageMutation,
  useLoadSpaceUserQuery,
  //  useLoadSpaceUserQuery,
} from "../store/Slices/Space";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";
import DataError from "./DataError";

export default function ChatDetail({ spaceId }) {
  const [
    // eslint-disable-next-line no-unused-vars
    nothing,
    { isError: isAddMessageError, error: addMessageError },
  ] = useAddMessageMutation({
    fixedCachedKey: "add-message",
  });

  const {
    data: space,
    isLoading,
    isError: userSpace_e,
    error: userSpaceError,
  } = useLoadSpaceUserQuery(spaceId, { skip: !spaceId });

  if (isLoading) {
    return <p>Loading skeleton</p>;
  }

  if (userSpace_e) {
    return <DataError error={userSpaceError} />;
  }

  return (
    <>
      {isAddMessageError && addMessageError?.message}
      <ChatNavigator users={space?.users} spaceId={space?.spaceId} />
      <div className="shadow py-3 rounded  overflow-y-scroll h-[50vh] bg-white ">
        <ChatBoxMessage spaceId={space?.spaceId} />
      </div>
      <ChatInputMessage spaceId={space?.spaceId} />
    </>
  );
}
