import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-router-dom";
import Button from "../UI/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchChats() {
  return (
    <Form className="py-2 w-[80%] relative">
      <input
        className="shadow py-2 w-full relative px-3 rounded-full bg-slate-200"
        placeholder="search username"
      />
      <Button elClass="absolute w-[20%] left-[80%] ">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Form>
  );
}
