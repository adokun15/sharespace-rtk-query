import { useSidebar } from "../components/ui/sidebar";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../image/sharespace_logo.jpg";
import { ArrowRight, Bell, Moon } from "lucide-react";
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
      {isMobile && (
        <nav className="flex   w-full py-4 text-2xl  mb-3 px-12 font-sans_serif   justify-between">
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

<article className="flex gap-4 item-center">
        {/*
        <div className="p-1 rounded-[10%] shadow bg-[rgba(255,255,255,0.2)] px-3">

        <Moon size={24} />
        </div>
        */}
                 <button onClick={toggleSidebar}>
            <FontAwesomeIcon className="text-3xl font-[200]" icon={faBars} />{" "}
          </button>
</article>
        </nav>
      )}
    </>
  );
}
