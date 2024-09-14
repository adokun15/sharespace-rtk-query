import {
  useGetSpaceListQuery,
  useSpaceResponseMutation,
} from "../store/Slices/Space";
import Button from "../UI/Button";
import AcceptedChatRequest from "./AcceptedChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import InviteSpaceList from "./ChatInvites";
import { useState } from "react";
import { useIsLoggedInQuery } from "../store/Slices/user";

export default function ChatList() {
  const [toggleInvite, setToggleInvite] = useState([]);

  const { data: currentUser, isError: userError } = useIsLoggedInQuery();
  const {
    data: chats,
    isError,
    isFetching,
    refetch,
    error,
    isLoading,
  } = useGetSpaceListQuery(currentUser?.user.uid, {
    refetchOnMountOrArgChange: true,
  });

  const [
    // eslint-disable-next-line no-unused-vars
    noUse,
    { data: addData, isSuccess, isError: isaddDataError, error: addDataError },
  ] = useSpaceResponseMutation({
    fixedCacheKey: "spaces-key",
  });

  //useEffect(() => isSuccess && setTimeout(refetch, 1500), [isSuccess, refetch]);

  if (isLoading || isFetching) {
    return (
      <p className="mt-[10vh] text-center animate-spin text-2xl">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
    );
  }

  if (isError || userError) {
    return (
      <div>
        <p className="text-center text-xl font-[400] my-5">
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

  if (chats.length === 0) {
    return (
      <p className="text-xl font-roboto font-[400] text-center my-6">
        No Space added yet!
      </p>
    );
  }

  const invites = chats.filter((chat) => chat.viewed !== "accepted");
  const list_r = chats.filter((chat) => chat.viewed === "accepted");

  return (
    <>
      <p className="text-center my-3 text-main_color">{isSuccess && addData}</p>
      <p className="text-center my-4 text-red-600">
        {isaddDataError && addDataError.message}
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
          <InviteSpaceList invites={invites} />
        ) : (
          <AcceptedChatRequest chat={list_r} />
        )}
      </div>
    </>
  );
}
