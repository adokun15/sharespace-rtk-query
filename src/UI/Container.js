export default function Container({ children, elClass }) {
  return (
    <div
      className={`md:w-3/5 w-[90%]  md:m-auto my-5
         ${elClass}`}
    >
      {children}
    </div>
  );
}
