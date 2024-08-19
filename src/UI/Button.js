export default function Button(props = { outline: false }) {
  return (
    <button
      {...props}
      className={` font-[700] shadow shadow-purple-300 py-2 px-4 rounded-full ${
        props.elClass
      } ${
        props.outline
          ? "border-solid  text-purple-500 border-2  border-purple-400"
          : "bg-purple-400 text-main_color"
      }`}
    >
      {props.children}
    </button>
  );
}
