import { createPortal } from "react-dom";
import React from "react";

const BackDrop = ({ backdropCls }) => {
  return (
    <>
      <div
        className={`fixed h-[100vh] z-[100] backdrop-blur-sm w-full top-0 bg-[rgba(0,0,0,0.8)] ${backdropCls}`}
      ></div>
    </>
  );
};
export default function Modal({ children, cls, backdropCls }) {
  return createPortal(
    <React.Fragment>
      <BackDrop backdropCls={backdropCls} />
      <div
        className={` bg-white z-60 text-main_color  text-2xl rounded-xl  p-5 px-8 fixed ${cls}`}
      >
        {children}
      </div>
    </React.Fragment>,
    document.getElementById("modal-with-backdrop")
  );
}
