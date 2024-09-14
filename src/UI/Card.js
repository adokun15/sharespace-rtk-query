export default function Card({ children, elClass }) {
  return (
    <div
      className={`bg-white relative shadow text-main_color md:my-8 my-5 py-1 md:py-4 md:px-3 px-1 min-h-[10rem] rounded-xl overflow-hidden
       ${elClass}`}
    >
      {children}
    </div>
  );
}
