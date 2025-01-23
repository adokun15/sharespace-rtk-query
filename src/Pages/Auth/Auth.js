import { Outlet } from "react-router-dom";

export default function AuthenticationPage() {
  //Listen for change
  return (
    <>
      <main className="min-h-[90vh] py-[4vh] ">
        <div className=" md:px-10 px-[4rem] py-3  min-h-40 mt-30 md:w-rounded-[1rem] ">
          <Outlet />
        </div>
      </main>
    </>
  );
}
