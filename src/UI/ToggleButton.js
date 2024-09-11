export function ToggleButton(props) {
  return (
    <button
      {...props}
      onClick={props.togglefunc}
      className={` ${
        !props?.state ? "bg-purple-500" : "bg-white"
      } transition-all font-[700] shadow shadow-purple-300 py-2 px-4 rounded-full ${
        props.elClass
      }`}
    >
      {!props?.loading && <span>{props?.state ? "on" : "off"}</span>}
      {props?.loading && <span>..</span>}
    </button>
  );
}
