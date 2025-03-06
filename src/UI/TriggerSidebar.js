import { useSidebar } from "../components/ui/sidebar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../image/sharespace_logo.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { FEEDBACK_URL } from "../lib/utils";

export default function TriggerSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();

  //Link to google form
  const toFeedbackSpace = () => {
    window.location.href = FEEDBACK_URL;
  };

  return (
    <>
      <div className="text-xs md:text-xl md:text-center w-full bg-accent text-white text-center py-1 px-5">
        <p className="md:hidden" onClick={toFeedbackSpace}>
          <span className="font-bold">ShareSpace</span> is currently in beta!
          We're working to improve your experience. Have feedback? Let us know!
          <ArrowRight className="inline mx-2" size={16} />
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
