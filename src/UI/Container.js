export default function Container({ children, elClass }) {
  return (
    <div
      className={`w-3/5 m-auto my-10
         ${elClass}`}
    >
      {children}
    </div>
  );
}
