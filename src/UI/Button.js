import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//loading, outliine, elclass, onClick
export default function Button({
  loading = false,
  trigger,
  children,
  outline = false,
  elclass = "",
  name,
  type,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={trigger}
      name={name}
      className={` font-[700] shadow shadow-purple-300 py-2 px-4 rounded-full ${
        outline
          ? "border-solid  text-purple-500 border-2  border-purple-400"
          : `bg-purple-400 text-main_color`
      }  ${elclass}`}
    >
      {loading ? (
        <span
          className={`${
            outline && "text-main_color"
          } animate-spin block text-center`}
        >
          <FontAwesomeIcon icon={faSpinner} />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
