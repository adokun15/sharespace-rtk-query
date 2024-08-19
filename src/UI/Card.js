export default function Card({ children, elClass }) {
  return (
    <div
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0,0,0,0.6), 0 1px 2px -1px rgba(0,0,0,0.4)",
      }}
      className={`bg-white relative text-main_color my-8 py-4 px-3 min-h-[15rem] rounded-xl overflow-hidden
       ${elClass}`}
    >
      {children}
    </div>
  );
}
