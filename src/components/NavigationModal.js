import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Modal from "../UI/Modal";
import { useIsLoggedInQuery } from "../store/Slices/user";
import Button from "../UI/Button";

export default function NavigationModal({ isOpened, updateModal, toAuth }) {
  const { data: isLoggedIn, isLoading } = useIsLoggedInQuery();

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

            {!isLoggedIn.user && (
              <>
                <ul className="*:block leading-10">
                  {" "}
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/blogs">Blog</NavLink>
                  <NavLink to="/guides">Guide</NavLink>
                  <NavLink to="/newsletter">NewsLetter</NavLink>
                </ul>
                <button
                  className="my-4 block bg-main_color w-full py-2 px-5 text-white rounded"
                  onClick={toAuth}
                >
                  Login
                </button>
              </>
            )}
            {isLoggedIn.user && (
              <>
                <ul className="*:block leading-10">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/dashboard/prefs">Edit Preference</NavLink>
                  <NavLink to="/dashboard/profile">View Profile</NavLink>
                  <NavLink to="/dashboard/roommates">Discuss Space .</NavLink>
                </ul>
                <Button
                  className="my-4 block bg-main_color w-full py-2 px-5 text-white rounded"
                  onClick={toAuth}
                  loading={isLoading}
                >
                  Logout
                </Button>
              </>
            )}
          </nav>
        </Modal>
      )}{" "}
    </>
  );
}
