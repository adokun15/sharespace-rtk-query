import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function MainNavigation({ updateModal, toAuth }) {
  const [isLoggedIn] = useState(true);

  return (
    <nav className="flex px-6 py-5 font-sans_serif justify-between ">
      <p className="text-3xl ">
        <Link to="/">ShareSpace</Link>
      </p>
      {!isLoggedIn && (
        <ul className="md:flex hidden gap-6 text-xl">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/guides">Guide</NavLink>
          <NavLink to="/blogs">Blog</NavLink>
          <NavLink to="/newsletter">Contact</NavLink>
          <NavLink to="/">Supports</NavLink>
        </ul>
      )}
      {isLoggedIn && (
        <ul className="md:flex hidden gap-6 text-xl">
          <NavLink to="/dashboard"> Find a Roommate</NavLink>
          <NavLink to="/dashboard/prefs">Edit Preference</NavLink>
          <NavLink to="/dashboard/profile">View Profile</NavLink>
          <NavLink to="/dashboard/roommates">Chats</NavLink>
        </ul>
      )}
      <div className="font-roboto inline-flex items-center gap-5">
        <button
          onClick={updateModal}
          className=" px-6 py-1 text-main_color rounded text-3xl md:hidden block"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button
          onClick={toAuth}
          className="md:block hidden bg-main_color py-2 px-5 text-white rounded"
        >
          {!isLoggedIn ? "Get Started" : "Logout"}
        </button>
      </div>
    </nav>
  );
}
