import { Link, useParams } from "react-router-dom";
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
import { useIsLoggedInQuery } from "../store/Slices/user";
import { Button } from "./ui/button";

export default function ChatDetail() {
  const { spaceId } = useParams();

  const [
    // eslint-disable-next-line no-unused-vars
    nothing,
    { isError: isAddMessageError, error: addMessageError },
  ] = useAddMessageMutation({
    fixedCachedKey: "add-message",
  });

  const userObj = useIsLoggedInQuery();

  const {
    data: space,
    isLoading,
    isError: userSpace_e,
    refetch,
    error: userSpaceError,
  } = useLoadSpaceUserQuery(spaceId, { skip: !spaceId || !userObj?.data });

  if (isLoading || userObj?.isLoading) {
    return <LoaderSpinner message="Loading Chat..." />;
  }

  if (userObj?.isError) {
    return (
      <DataError message={userObj?.error?.message} refetch={userObj?.refetch} />
    );
  }

  if (userSpace_e) {
    return <DataError refetch={refetch} error={userSpaceError} />;
  }

  const isEligible = space?.users?.find((id) => id === userObj.data?.uid);

  const chatHasBeenReported = space?.disabled;

  //making sure only if user decide to leave, they won't be able to view this chat!
  if (space && !isEligible && !chatHasBeenReported) {
    return (
      <>
        <DataError
          refetch={refetch}
          error={{
            status: "Unauthorized Access!",
            statusCode: 404,
            message: "You don't have access to this chat",
          }}
        />
        <Button asChild variant="link">
          <Link to="/space">Go back to Chats</Link>
        </Button>
      </>
    );
  }

  return (
    <div>
      {isAddMessageError && addMessageError?.message}
      <ChatNavigator
        chatDisabled={chatHasBeenReported}
        users={space?.users}
        spaceId={space?.spaceId}
      />
      <div className="w-full mx-auto bg-white shadow p-4 rounded">
        <ChatBoxMessage userObj={userObj?.data} spaceId={space?.spaceId} />
      </div>
      <ChatInputMessage
        users={space?.users}
        chatDisabled={chatHasBeenReported}
        reportInfo={space?.report}
        userThatLeft={space?.name}
        spaceId={space?.spaceId}
      />
    </div>
  );
}
