import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardNavigator from "../../components/dashboardnavigator";
import { SidebarProvider } from "../../components/ui/sidebar";
import TriggerSidebar from "../../UI/TriggerSidebar";
import { useIsLoggedInQuery } from "../../store/Slices/user";
//import ExplorePage from "./Explore";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
export default function HomeRoot() {
  const location = useLocation();
  const reRoute = useNavigate();

  const token = localStorage.getItem("sharespace_token");
  const [isPrivate, setRouteIsPrivate] = useState(false);

  const isLoggedIn = useIsLoggedInQuery(null, {
    skip: isPrivate,
  });

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
      } else {
        reRoute("/auth");
      }
    }
  }, [dashboardRoute, reRoute, token]);

  return (
    <SidebarProvider>
      <DashboardNavigator isLoggedIn={isLoggedIn} />
      <main className=" px-[3rem] w-full  my-[2rem]">
        <TriggerSidebar />
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
