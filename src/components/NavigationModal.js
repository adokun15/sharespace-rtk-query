import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

const BackDrop = () => {
  return (
    <>
      <div className="fixed h-[100vh] w-full top-0  bg-[rgba(0,0,0,0.8)]"></div>
    </>
  );
};

export default function NavigationModal({ isOpened, updateModal }) {
  return (
    <>
      {isOpened && (
        <React.Fragment>
          <BackDrop />
          <nav className="bg-white text-main_color text-2xl rounded-xl w-4/5 left-[10%] p-5 px-8 absolute top-[10vh]">
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
            <button className="my-4 block bg-main_color w-full py-2 px-5 text-white rounded">
              Get Started
            </button>
          </nav>
        </React.Fragment>
      )}{" "}
    </>
  );
}
