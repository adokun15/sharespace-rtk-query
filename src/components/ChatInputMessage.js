import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAddmessageMutation } from "../store/Slices/Space";
import { useIsLoggedInQuery } from "../store/Slices/user";
export default function ChatInputMessage() {
  //Current User
  const { data: user } = useIsLoggedInQuery();

  //Message
  const [messageString, setMessage] = useState("");

  //Get Space Id
  const spaceParamId = useParams().spaceId;

  //Message Function!
  const [addToStackMessage] = useAddmessageMutation({
    fixedCachedKey: "add-message",
  });

  //handle message change
  const handleInputState = (e) => {
    setMessage(e?.target?.value);
  };

  const addToMessage = async () => {
    if (!spaceParamId || !messageString) return;

    const objProp = {
      chat: messageString,
      timeSent: new Date().toISOString(),
      uid: user?.user?.uid,
      id: new Date().getTime(),
    };
    setMessage("");
    await addToStackMessage({
      spaceId: spaceParamId,
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
        trigger={addToMessage}
        disable={!messageString}
        elClass="absolute w-[20%] left-[80%] outline-none"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  );
}
