import { createPortal } from "react-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalAction } from "../store/Slices/modal";

const BackDropSelect = ({ backdropCls }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => dispatch(ModalAction.toggleSelectItemPopOver())}
        className={`fixed h-[100vh] z-[10000]  w-full top-0 bg-[rgba(0,0,0,0.2)] ${backdropCls}`}
      ></div>
    </>
  );
};
export default function ModalSelect({ cls, backdropCls, inputName }) {
  const { items } = useSelector((state) => state.modal.modal.SelectItemPopOver);
  const dispatch = useDispatch();

  const [currentlySelected, setItem] = useState({
    value: null,
  });

  const SelectOne = (value, name, iname) => {
    dispatch(
      ModalAction.addSingleItemtoSelect({
        result: { name, value },
        inputName: iname,
      })
    );
    dispatch(ModalAction.toggleSelectItemPopOver());
  };

  const handleChange = (val, name, Iname) => {
    setItem({ value: val, name });
    setTimeout(() => SelectOne(val, name, Iname), 50);
  };

  return createPortal(
    <React.Fragment>
      <BackDropSelect backdropCls={backdropCls} />
      <div
        className={`bg-slate-800 space-y-3 md:left-[20%] md:w-[60%] left-[10%] w-[80%] md:top-[20%] top-10 z-[12000] text-white divide-y  text-2xl rounded-xl  p-5 px-8 fixed ${cls}`}
      >
        {!currentlySelected.value && (
          <label className="text-xl block">
            <input
              name={"--"}
              type="radio"
              value={null}
              className="mr-3"
              checked
            />
            --
          </label>
        )}
        {items.items.map((item) => (
          <label className="text-xl block" id={item.value} htmlFor={item.value}>
            <input
              name={item.name}
              type="radio"
              value={item.value}
              className="mr-3"
              onClick={() =>
                handleChange(item.value, item.name, items.inputName)
              }
              checked={item.value === currentlySelected.value}
            />
            {item.name}
          </label>
        ))}
      </div>
    </React.Fragment>,
    document.getElementById("modal-with-backdrop")
  );
}
