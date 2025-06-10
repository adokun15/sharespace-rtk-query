import { Outlet, useLocation } from "react-router-dom";
import DashboardNavigator from "../../components/dashboardnavigator";
import { SidebarProvider } from "../../components/ui/sidebar";
import TriggerSidebar from "../../UI/TriggerSidebar";
//import ExplorePage from "./Explore";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { FEEDBACK_URL } from "../../lib/utils";
import { ArrowRight, Bell, Moon } from "lucide-react";
export default function HomeRoot() {
  const location = useLocation();
  //const reRoute = useNavigate();

  const token = localStorage.getItem("sharespace_token");
  
  const [isPrivate, setRouteIsPrivate] = useState(false);

  const dashboardRoute = location.pathname.split("/");

  useEffect(() => {
    if (dashboardRoute[1] === "guide") {
      setRouteIsPrivate(false);
      return;
    } else if (dashboardRoute[1] === "auth") {
      setRouteIsPrivate(false);
    } else if (dashboardRoute[1] === "terms") {
      setRouteIsPrivate(false);
    } else if (dashboardRoute[1] === "privacy") {
      setRouteIsPrivate(false);
    } else if (dashboardRoute[1] === "about") {
      setRouteIsPrivate(false);
    } else if (dashboardRoute[1] === "explore" && !token) {
      setRouteIsPrivate(false);
    } else {
      if (token) {
        setRouteIsPrivate(true);
      }
    }
  }, [dashboardRoute, token]);

  //Link to google form
  const toFeedbackSpace = () => {
    window.location.href = FEEDBACK_URL;
  };

  return (
    <SidebarProvider>
      <DashboardNavigator loadContent={isPrivate} />
      <main className="w-full bg-background relative ">
        <TriggerSidebar />    
         <article className="md:space-y-[4rem] md:px-[3rem] px-[1rem] md:my-[2rem]">
            <Outlet />
          </article>
      </main>
      <Toaster richColors />

v    </SidebarProvider>
  );
}
