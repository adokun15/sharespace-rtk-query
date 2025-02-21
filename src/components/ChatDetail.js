import { useParams } from "react-router-dom";
import {
  useAddMessageMutation,
  useLoadSpaceUserQuery,
  //  useLoadSpaceUserQuery,
} from "../store/Slices/Space";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";

export default function ChatDetail() {
  const { spaceId } = useParams();

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
    return <LoaderSpinner message="loading message" />;
  }

  if (userSpace_e) {
    return <DataError error={userSpaceError} />;
  }

  return (
    <div>
      {isAddMessageError && addMessageError?.message}
      <ChatNavigator users={space?.users} spaceId={space?.spaceId} />
      <div className="w-full mx-auto bg-white shadow p-4 rounded">
        <ChatBoxMessage spaceId={space?.spaceId} />
      </div>
      <ChatInputMessage spaceId={space?.spaceId} />
    </div>
  );
}
