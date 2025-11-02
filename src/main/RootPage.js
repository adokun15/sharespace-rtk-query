import { Outlet } from "react-router-dom";
export default function RootPage() {

  return (
    <div className="relative overscroll-none">
      <Outlet />
    </div>
  );
}
