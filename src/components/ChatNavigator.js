import ProfileTest from "../image/202330014270ff.jpg";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../UI/Image";
import Button from "../UI/Button";
import { useState } from "react";

export default function ChatNavigator() {
  const [isListOpened, setListOpen] = useState(false);
  return (
    <nav className="py-2 my-1 relative flex justify-between">
      <div className="inline-flex w-1/2 items-center space-x-3">
        <Link to="./">
          <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
        </Link>

        <div>
          <Image h={45} w={45} imgSrc={ProfileTest} />
        </div>
      </div>

      <div
        className={`relative  ${
          isListOpened && "grow"
        } inline-block transition-all space-y-2 `}
      >
        <Button onClick={() => setListOpen((p) => !p)}>
          <span>
            <FontAwesomeIcon icon={faBars} />
          </span>
        </Button>
        {/*List */}
        {isListOpened && (
          <ul className="absolute right-0 w-[50%] z-10  origin-top-right  bg-white shadow">
            <li
              className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
              onClick={() => {}}
            >
              Upload a Photo
            </li>
            <li
              className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
              onClick={() => {}}
            >
              Leave Session
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
