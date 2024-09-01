import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";
import { useState } from "react";
import { useAddmessageMutation } from "../store/Slices/Space";

export default function ChatInputMessage({ spaceId, user }) {
  const [message, setMessage] = useState("");

  const [addToStackMessage, { isLoading }] = useAddmessageMutation({
    fixedCachedKey: "add-message",
  });

  const handleInputState = (e) => {
    setMessage(e?.target?.current);
  };
  const addToMessage = async () => {
    if (!spaceId) return;

    await addToStackMessage({
      spaceId,
      message: { chat: message, ...user },
    })
      .then(() => setMessage(""))
      .catch((e) => console.error(e?.message));
  };
  return (
    <form className="py-2 w-full relative">
      <input
        onChange={handleInputState}
        className="shadow py-2 w-full relative px-3 rounded-full bg-slate-200"
        placeholder="Enter message"
      />
      <Button
        onClick={addToMessage}
        disable={!message}
        elClass="absolute w-[20%] left-[80%] "
      >
        {isLoading ? "..." : <FontAwesomeIcon icon={faPaperPlane} />}
      </Button>
    </form>
  );
}
