import { Outlet } from "react-router-dom";

export default function AuthenticationPage() {
  //Listen for change
  return (
    <>
      <main className="min-h-[90vh] py-[4vh] ">
        <div className=" shadow-slate-400   md:px-10 px-2  py-3 backdrop-blur-lg  bg-white shadow min-h-40 mt-30 rounded-[1rem] ">
          <Outlet />
        </div>
      </main>
    </>
  );
}
