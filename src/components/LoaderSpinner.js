import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoaderSpinner({ message = "" }) {
  return (
    <>
      <p className="mt-[10vh] text-center animate-spin text-2xl">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
      <p>{message}</p>
    </>
  );
}
