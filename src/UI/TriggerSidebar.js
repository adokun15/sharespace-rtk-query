import { useSidebar } from "../components/ui/sidebar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../image/sharespace_logo.jpg";

export default function TriggerSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <>
      <div className="text-xs md:text-xl md:text-center w-full bg-purple-400 text-white text-center py-1 px-5">
        <p className="md:hidden">
          <span className="font-bold">
            ShareSpace
          </span>
          {" "}is currently in beta! We're working to improve your experience. Have
          feedback? Let us know!
        </p>
      </div>
      {isMobile && (
        <nav className="flex bg-transparent  w-full py-4 text-2xl  mb-3 px-12 font-sans_serif   bg-white  shadow  justify-between">
          <div className="flex gap-2 justify-center items-center">
            <img
              src={Logo}
              heigth={30}
              width={30}
              className="rounded"
              alt="sharespace_logo"
            />
            <h1 className="text-2xl">ShareSpace</h1>
          </div>

          <button onClick={toggleSidebar}>
            <FontAwesomeIcon className="font-[200]" icon={faBars} />{" "}
          </button>
        </nav>
      )}
    </>
  );
}
