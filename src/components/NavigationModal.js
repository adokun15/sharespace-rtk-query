import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Modal from "../UI/Modal";

export default function NavigationModal({ isOpened, updateModal, toAuth }) {
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
              Get Started
            </button>
          </nav>
        </Modal>
      )}{" "}
    </>
  );
}
