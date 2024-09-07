import { useSpaceResponseMutation } from "../store/Slices/Space";
import Button from "../UI/Button";
import AcceptedChatRequest from "./AcceptedChat";

import InviteSpaceList from "./ChatInvites";
import { useState } from "react";
export default function ChatList({ chats }) {
  const [toggleInvite, setToggleInvite] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [noUse, { data, isError, error }] = useSpaceResponseMutation({
    fixedCacheKey: "spaces-key",
  });

  return (
    <>
      <p className="text-3xl text-center my-10 text-main_color">
        {data && data}
      </p>
      <p className="text-center my-4 text-red-600">
        {isError && error.message}
      </p>
      <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
        <Button
          outline={!toggleInvite}
          trigger={() => setToggleInvite((p) => !p)}
        >
          Invites
        </Button>
        <Button
          outline={toggleInvite}
          trigger={() => setToggleInvite((p) => !p)}
        >
          Roommate List
        </Button>
      </article>
      <div className=" divide-y-2 overflow-y-scroll h-[70vh]">
        {toggleInvite ? (
          <InviteSpaceList chat={chats} />
        ) : (
          <AcceptedChatRequest acceptedChat={chats} />
        )}
      </div>
    </>
  );
}
