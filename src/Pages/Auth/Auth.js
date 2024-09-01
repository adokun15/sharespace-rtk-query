import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

export default function AuthenticationPage() {
  return (
    <>
      <main className="min-h-[90vh] py-[10vh]">
        <div className=" shadow-slate-400 px-10 md:mx-[20vw] mx-5 py-3 backdrop-blur-lg  bg-white  shadow min-h-40 mt-30 rounded-[1rem] ">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
