import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { motion } from "framer-motion";
import RedirectLink from "../UI/RedirectLink";
import { Logout } from "./Logout";
export default function MainNavigation({ updateModal, toAuth }) {
  const { data: isLoggedIn, isLoading } = useIsLoggedInQuery();

  const location = useLocation();

  const dashboardRoute = location.pathname.split("/");

  return (
    <motion.nav className="flex px-6 py-5 sticky font-sans_serif justify-between ">
      <p className="text-3xl ">
        <Link to="/">ShareSpace</Link>
      </p>
      {isLoggedIn?.user?.uid &&
        (dashboardRoute[1] === "dashboard" || location.pathname === "/") && (
          <>
            <ul className="lg:flex hidden gap-6 text-xl">
              <NavLink to="/dashboard" className="py-1 px-2">
                Dashboard
              </NavLink>
              <RedirectLink
                path="/dashboard/prefs"
                linkName="Your Preference"
              />
              <RedirectLink path="/dashboard/profile" linkName="Profile" />
              <RedirectLink path="/dashboard/roommates" linkName="Spaces" />
            </ul>
          </>
        )}

      <div className="font-roboto inline-flex items-center gap-5">
        {isLoggedIn?.user?.uid && (
          <button
            onClick={updateModal}
            className=" px-6 py-1 text-main_color rounded text-3xl md:hidden block"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

        {!isLoggedIn?.user?.uid && (
          <Button
            loading={isLoading}
            trigger={toAuth}
            outline={true}
            elclass=" py-2 px-5 rounded"
          >
            Login
          </Button>
        )}
        {isLoggedIn?.user?.uid && (
          <div className="md:block hidden ">
            <Logout />
          </div>
        )}
      </div>
    </motion.nav>
  );
}
