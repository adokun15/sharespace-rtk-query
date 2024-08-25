import { forwardRef } from "react";

const Input = forwardRef((props, ref) => (
  <input
    ref={ref}
    placeholder={props.placeholder}
    {...props}
    className={`w-full shadow shadow-slate-400 rounded-[5px] ring-purple-300 ring text-2xl outline-none caret-purple-300 ring-inset py-2 px-3
  placeholder:px-3 focus:ring-purple-500 transition-all font-[200] font-oswald ${props.className}`}
  />
));

export default Input;
