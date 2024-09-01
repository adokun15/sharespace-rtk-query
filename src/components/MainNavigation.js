import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { motion } from "framer-motion";
import RedirectLink from "../UI/RedirectLink";
export default function MainNavigation({ updateModal, toAuth }) {
  const { data: isLoggedIn, isLoading } = useIsLoggedInQuery();
  return (
    <motion.nav className="flex px-6 py-5 sticky font-sans_serif justify-between ">
      <p className="text-3xl ">
        <Link to="/">ShareSpace</Link>
      </p>
      {!isLoggedIn?.user && (
        <ul className="md:flex hidden gap-6 text-xl">
          <RedirectLink path="/" linkName="Home" />
          <RedirectLink path="/guides" linkName="Guide" />
          <RedirectLink path="/blogs" linkName="Blog" />
          <RedirectLink path="/contact" linkName="Contact" />
        </ul>
      )}
      {isLoggedIn?.user && (
        <>
          <ul className="md:flex hidden gap-6 text-xl">
            <NavLink to="/dashboard" className="py-1 px-2">
              Dashboard
            </NavLink>
            <RedirectLink path="/dashboard/prefs" linkName="Your Preference" />
            <RedirectLink path="/dashboard/profile" linkName="Profile" />
            <RedirectLink path="/dashboard/roommates" linkName="Spaces" />
          </ul>
        </>
      )}

      <div className="font-roboto inline-flex items-center gap-5">
        <button
          onClick={updateModal}
          className=" px-6 py-1 text-main_color rounded text-3xl md:hidden block"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Button
          loading={isLoading}
          trigger={toAuth}
          outline={true}
          elclass="md:block hidden py-2 px-5 rounded"
        >
          {isLoggedIn?.user ? "Logout" : "Login"}
        </Button>
      </div>
    </motion.nav>
  );
}
