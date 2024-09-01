import { NavLink } from "react-router-dom";

export default function RedirectLink({ offModal, path, linkName }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-purple-200 duration-300 ease-in-out px-3 py-2 rounded transition-all"
          : "px-2 py-1"
      }
      onClick={offModal}
    >
      {linkName}
    </NavLink>
  );
}
