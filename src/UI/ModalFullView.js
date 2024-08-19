import { createPortal } from "react-dom";
import React from "react";

const BlurBackDrop = () => {
  return (
    <>
      <div className="backdrop-blur-xl fixed h-[100vh] z-30 w-full top-0    bg-[rgba(0,0,0,0.8)]"></div>
    </>
  );
};
export default function ModalFullView({ children, cls }) {
  return createPortal(
    <div>
      <BlurBackDrop />
      <div
        className={`h-[100vh] w-full bg-white z-40 text-main_color text-2xl p-5 px-8 fixed top-[0] ${cls}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
