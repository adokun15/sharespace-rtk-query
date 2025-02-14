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
import { useState } from "react";

export default function ChatDetail() {
  /*  const { spaceId } = useParams();

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
  */
  //shadow py-3 rounded  overflow-y-scroll h-[50vh] bg-white

  const space = {
    users: ["qqw", "qeqww"],
    spaceId: "12345",
  };

  const [data, addMessage] = useState({
    chat: [
      {
        message: "Hello",
        uid: "1234",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "1234",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "1234",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "1234",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "123",
        timeSent: "1232",
      },
      {
        message: "Hello",
        uid: "1234",
        timeSent: "1232",
      },
    ],
  });

  const user = {
    uid: "1234",
  };

  const addToMessage = () => {
    addMessage((p) => {
      return {
        chat: [
          ...p.chat,
          {
            message: "Hiii",
            uid: "1234",
            timeSent: "1232",
          },
        ],
      };
    });
  };

  return (
    <div>
      {/*isAddMessageError && addMessageError?.message**/}
      <ChatNavigator users={space?.users} spaceId={space?.spaceId} />
      <div className="w-full mx-auto bg-white shadow p-4 rounded">
        <ChatBoxMessage data={data} user={user} spaceId={space?.spaceId} />
      </div>
      <ChatInputMessage addToMessage={addToMessage} spaceId={space?.spaceId} />
    </div>
  );
}
