import ProfileTest from "../image/202330014270ff.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../UI/Image";
//import Button from "../UI/Button";
//import { useEffect, useState } from "react";
/*import {
  useDeleteSpaceManuallyMutation,
  useSendmediaMutation,
} from "../store/Slices/Space";
*/

export default function ChatNavigator({ user, spaceId, space }) {
  /*  const [isListOpened, setListOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [sendMedia] = useSendmediaMutation();

  const handleFileChange = (e) => {
    setFile(e.target.file[0]);
  };
  useEffect(() => {
    const inFinc = async () => {
      if (!file) return;
      await sendMedia({ file, spaceId, user }).catch((e) =>
        console.log(e?.message)
      );
    };
    inFinc();
  }, [file]);

  //Upload photo and leave session
  const [leaveSession] = useDeleteSpaceManuallyMutation();

  const handleLeaveSession = async () => {
    await leaveSession({ file, space }).catch((e) => console.log(e?.message));
  };
*/
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

      {/*

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
        {isListOpened && (
          <ul className="absolute right-0 w-[50%] z-10  origin-top-right  bg-white shadow">
            <li className="cursor-pointer hover:bg-purple-300 px-1 py-2 ">
              <label>Upload a Photo</label>
              <input />
            </li>
            <button
              className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
              onClick={leaveSession}
            >
              Leave Session
            </button>
          </ul>
        )}

        </div>
*/}
    </nav>
  );
}
