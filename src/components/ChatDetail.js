import { useParams } from "react-router-dom";
import {
  useAddmessageMutation,
  useLoadSpaceUserQuery,
} from "../store/Slices/Space";
import Container from "../UI/Container";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";

export default function ChatDetail() {
  //Id of space
  const spaceIdParam = useParams();
  const spaceId = spaceIdParam.spaceId;
  const [
    // eslint-disable-next-line no-unused-vars
    nothing,
    { isError: isAddMessageError, error: addMessageError },
  ] = useAddmessageMutation({
    fixedCachedKey: "add-message",
  });

  const {
    data,
    isLoading,
    refetch,
    isError: userSpace_e,
    error: userSpaceError,
  } = useLoadSpaceUserQuery(spaceId);

  if (isLoading) {
    return (
      <p className="mt-[10vh] text-center animate-spin text-2xl">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
    );
  }

  if (userSpace_e) {
    return (
      <div>
        <p className="text-center text-2xl font-[700] my-5">
          {userSpaceError?.message}
        </p>
        <Button trigger={refetch} outline={true} elclass="my-1 mx-auto block">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Container>
      {isAddMessageError && addMessageError?.message}
      <ChatNavigator users={data?.users} spaceId={data.id} />
      <div className="shadow py-3 rounded  overflow-y-scroll h-[50vh] bg-white ">
        <ChatBoxMessage />
      </div>
      <ChatInputMessage spaceId={data?.id} />
    </Container>
  );
}
