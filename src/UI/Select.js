import { useDispatch, useSelector } from "react-redux";
import { ModalAction } from "../store/Slices/modal";
import ModalSelect from "./ModalInputRadio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Select({ items, cls, name }) {
  const dispatch = useDispatch();

  const { isOpened, formSelects } = useSelector(
    (state) => state.modal.modal.SelectItemPopOver
  );

  const triggerModal = () => {
    dispatch(
      ModalAction.toggleSelectItemPopOver({
        inputName: name,
        items: [...items],
      })
    );
  };

  const currentSelectInfo = formSelects.find((obj) => obj.inputName === name);

  return (
    <>
      <input
        type="hidden"
        name={currentSelectInfo?.inputName || ""}
        value={currentSelectInfo?.result?.value || ""}
      />
      <div
        onClick={triggerModal}
        className={`flex justify-between 
       w-full shadow shadow-slate-400 rounded-[5px] ring-purple-300 ring text-2xl outline-none caret-purple-300 ring-inset py-2 px-3
  placeholder:px-3 hover:ring-purple-500 transition-all font-[200] font-oswald ${cls} 
      `}
      >
        {currentSelectInfo ? currentSelectInfo?.result?.name : "--"}
        <FontAwesomeIcon className="block " icon={faChevronDown} />
      </div>
      {isOpened && <ModalSelect inputName={name} />}
    </>
  );
}
