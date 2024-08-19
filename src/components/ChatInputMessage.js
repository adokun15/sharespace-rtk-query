import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";

export default function ChatInputMessage() {
  return (
    <Form className="py-2 w-full relative">
      <input
        className="shadow py-2 w-full relative px-3 rounded-full bg-slate-200"
        placeholder="Enter message"
      />
      <Button elClass="absolute w-[20%] left-[80%] ">
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Form>
  );
}
