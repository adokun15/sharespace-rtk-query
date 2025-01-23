import { Outlet, useLocation } from "react-router-dom";
import DashboardNavigator from "../../components/dashboardnavigator";
import { SidebarProvider } from "../../components/ui/sidebar";
import TriggerSidebar from "../../UI/TriggerSidebar";
//import ExplorePage from "./Explore";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
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
    } else if (dashboardRoute[1] === "policy") {
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

  return (
    <SidebarProvider>
      <DashboardNavigator loadContent={isPrivate} />
      <main className="w-full relative ">
        <TriggerSidebar />
        <div>
          <div className="w-full bg-purple-400 text-white text-xs md:text-xl md:text-center py-2 md:block hidden">
            <p>
              ShareSpace is currently in beta! We're working to improve your
              experience. Have feedback? Let us know!
            </p>
          </div>

          <article className="md:space-y-[4rem] md:px-[3rem] px-[1rem] md:my-[2rem]">
            <Outlet />
          </article>
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
