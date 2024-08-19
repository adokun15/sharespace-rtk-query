import { createPortal } from "react-dom";
import React from "react";

const BackDrop = () => {
  return (
    <>
      <div className="fixed h-[100vh] z-30 w-full top-0    bg-[rgba(0,0,0,0.8)]"></div>
    </>
  );
};
export default function Modal({ children, cls }) {
  return createPortal(
    <React.Fragment>
      <BackDrop />
      <div
        className={` bg-white z-40 text-main_color text-2xl rounded-xl  p-5 px-8 absolute top-[10vh] ${cls}`}
      >
        {children}
      </div>
    </React.Fragment>,
    document.getElementById("modal")
  );
}
