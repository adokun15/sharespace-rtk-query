import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components/ui/button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAddMessageMutation } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
export default function ChatInputMessage({ spaceId }) {
  //Current User
  const { data: user } = useIsLoggedInQuery();

  //Message
  const [messageString, setMessage] = useState("");

  //Message Function!
  const [addToStackMessage] = useAddMessageMutation({
    fixedCachedKey: "add-message",
    skip: !user,
  });

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
      .catch((e) => console.error(e?.message));
  };
  return (
    <div className="py-2 gap-1 flex w-full relative">
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
        className="absolute w-[20%] left-[80%] outline-none"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  );
}
