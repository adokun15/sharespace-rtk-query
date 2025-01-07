import { useSidebar } from "../components/ui/sidebar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TriggerSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <nav className="flex text-3xl mb-3 px-5 font-sans_serif  rounded-full bg-white py-2 shadow  justify-between">
          <h1 className="">ShareSpace</h1>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon className="font-[200]" icon={faBars} />{" "}
          </button>
        </nav>
      )}
    </>
  );
}
