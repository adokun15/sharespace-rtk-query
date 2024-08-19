import ProfileTest from "../image/202330014270ff.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../UI/Image";

export default function ChatNavigator() {
  return (
    <nav className="py-2 my-1 inline-flex items-center space-x-3">
      <Link to="./">
        <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
      </Link>

      <div>
        <Image h={45} w={45} imgSrc={ProfileTest} />
      </div>
    </nav>
  );
}
