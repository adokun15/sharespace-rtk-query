import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components/ui/button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAddMessageMutation } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { SUPPORT_EMAIL } from "../lib/utils";
export default function ChatInputMessage({
  users,
  spaceId,
  userThatLeft,
  chatDisabled,
  reportInfo,
}) {
  //SpaceInfo ---( name )

  //Current User
  const { data: user } = useIsLoggedInQuery();

  const isEligibleToSendNoMessage = users?.find((id) => id === user?.uid);

  //Message
  const [messageString, setMessage] = useState("");

  //Message Function!
  const [addToStackMessage] = useAddMessageMutation({
    fixedCachedKey: "add-message",
    skip: !user,
  });

  if (!spaceId) return;

  if (chatDisabled) {
    return (
      <p className="text-center font-poppins  my-3">
        This chat has been disabled. Contact{" "}
        <a
          href={SUPPORT_EMAIL}
          className="text-primary"
          target="_blank"
          rel="noreferrer"
        >
          us
        </a>{" "}
        for more info
      </p>
    );
  }

  if (isEligibleToSendNoMessage && userThatLeft) {
    return (
      <p className="text-center font-poppins text-primary my-3">
        {userThatLeft} has left the chat!
      </p>
    );
  }
  //handle message change
  const handleInputState = (e) => {
    // if(e.target.value === "") return
    setMessage(e?.target?.value);
  };

  const addToMessage = async () => {
    if (!spaceId || !messageString) return;

    const objProp = {
      chat: messageString,
      timeSent: new Date().toISOString(),
      uid: user?.uid,
      id: new Date().getTime(),
    };

    setMessage("");

    await addToStackMessage({
      spaceId,
      message: objProp,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };

  return (
    <div className="py-2 gap-1 h-fit flex w-full relative">
      <input
        onChange={handleInputState}
        value={messageString}
        className="shadow py-2 grow outline-none relative px-3 rounded-full bg-slate-200"
        placeholder="Enter message"
      />
      <Button
        type="button"
        onClick={addToMessage}
        disable={!messageString}
        variant="primary"
        className="absolute w-[10%]  rounded-full  left-[90%] outline-none"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  );
}
