import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoaderSpinner({ message = "" }) {
  return (
    <main className="w-full">
      <p className="mt-[10vh] text-center animate-spin text-2xl">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
      <p className="text-center">{message}</p>
    </main>
  );
}
