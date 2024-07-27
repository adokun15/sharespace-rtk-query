import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function MainNavigation({ updateModal }) {
  return (
    <nav className="flex px-6 py-5 font-sans_serif justify-between ">
      <h1 className="text-3xl ">ShareSpace</h1>
      <ul className="md:flex hidden gap-6 text-xl">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/blogs">Blog</NavLink>
        <NavLink to="/guides">Guide</NavLink>
        <NavLink to="/newsletter">NewsLetter</NavLink>
      </ul>
      <div className="font-roboto inline-flex items-center gap-5">
        <button
          onClick={updateModal}
          className=" px-6 py-1 text-main_color rounded text-3xl md:hidden block"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="md:block hidden bg-main_color py-2 px-5 text-white rounded">
          Get Started
        </button>
      </div>
    </nav>
  );
}
