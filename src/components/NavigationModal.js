import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Modal from "../UI/Modal";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { Logout } from "./Logout";

export default function NavigationModal({ isOpened, updateModal, toAuth }) {
  const { data: isLoggedIn } = useIsLoggedInQuery();

  return (
    <>
      {isOpened && (
        <Modal cls="w-4/5 z-[120] top-10 left-[10%]">
          <nav>
            <button
              className="flex w-full justify-end mb-3 text-2xl "
              onClick={updateModal}
            >
              <FontAwesomeIcon icon={faX} />
            </button>

            {isLoggedIn.user?.uid && (
              <>
                <ul className="*:block mb-3 space-y-3">
                  <NavLink onClick={updateModal} to="/dashboard">
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/prefs"
                    onClick={updateModal}
                    className={({ isActive }) => isActive && "text-purple-500"}
                  >
                    Your Preference
                  </NavLink>
                  <NavLink
                    onClick={updateModal}
                    className={({ isActive }) => isActive && "text-purple-500"}
                    to="/dashboard/profile"
                  >
                    {" "}
                    Profile
                  </NavLink>
                  <NavLink
                    onClick={updateModal}
                    className={({ isActive }) => isActive && "text-purple-500"}
                    to="/dashboard/roommates"
                  >
                    Spaces{" "}
                  </NavLink>
                </ul>
                <Logout closeMobileModal={updateModal} />
              </>
            )}
          </nav>
        </Modal>
      )}{" "}
    </>
  );
}
