"use client";
import {
  MessageSquareIcon,
  HomeIcon,
  Trophy,
  MenuIcon,
  InfoIcon,
  HelpCircleIcon,
  BriefcaseIcon,
  FileTextIcon,
  Notebook,
  Contact2,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
//import FeedbackModal from "./FeedbackModal";
///import JoinCommunityButton from "./JoinCommunityButton";
import { useState } from "react";
import { useSidebar } from "./ui/sidebar";
import { COMMUNITY_LINK } from "../lib/utils";
import Button from "../UI/Button";

export default function MobileNavDrawer() {
  const { isMobile } = useSidebar();

  const [opened, setToggleState] = useState(false);

  const toggleHandler = () => {
    setToggleState((p) => !p);
  };
  return (
    <>
      {isMobile && (
        <nav className="sticky bottom-0 text-xs bg-[rgba(0,0,0,0.9)] justify-around items-center text-slate-200 text-shadow-2xs py-3 min-h-[5vh] z-10 flex w-full">
          <div>
            <Link className="active:text-cyan-700" to="/">
              <HomeIcon className="text-center mx-auto" />
              <span>Home</span>
            </Link>
          </div>

          <div>
            <Link to={"/community"}>
              <Users className="text-center mx-auto" />
              <span>Community</span>
            </Link>
          </div>

          <div>
            <Link to="/find">
              <Search className="text-center mx-auto" />
              <span>Find</span>
            </Link>
          </div>

          <div>
            <Sheet open={opened} onOpenChange={toggleHandler}>
              <SheetTrigger asChild>
                <div>
                  <MenuIcon className="text-center mx-auto" />
                  <span>More</span>
                </div>
              </SheetTrigger>
              <SheetContent className="px-10 " side="bottom">
                <SheetTitle className="items-center text-2xl">More</SheetTitle>
                <ul className="my-8 space-y-4 text-base text-slate-800">
                  <li
                    onClick={toggleHandler}
                    className="flex items-center gap-3"
                  >
                    <InfoIcon className="w-4 h-4" />
                    <Link to="/about">About us</Link>
                  </li>
                  <li
                    onClick={toggleHandler}
                    className="flex items-center gap-3"
                  >
                    <BriefcaseIcon className="w-4 h-4" />
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li
                    onClick={toggleHandler}
                    className="flex items-center gap-3"
                  >
                    <Notebook className="w-4 h-4" />
                    <Link to="/terms">Terms</Link>
                  </li>
                  <li
                    onClick={toggleHandler}
                    className="flex items-center gap-3"
                  >
                    <Contact2 className="w-4 h-4" />
                    <Button variant="primary">
                      <Link to={COMMUNITY_LINK}>Join Community</Link>
                    </Button>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      )}
    </>
  );
}
