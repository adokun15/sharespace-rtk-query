import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

export default function AuthenticationPage() {
  return (
    <>
      <main className="bg-purple-200 min-h-[80vh] py-[10vh]">
        <div className="container py-3 backdrop-blur-lg  bg-white  shadow-md min-h-40 mt-30 rounded-[1rem] ">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
