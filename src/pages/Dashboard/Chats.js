import { Outlet } from "react-router-dom";

export default function ChatsPage() {
  return (
    <div className="md:w-[75%] mx-auto w-[96&] my-2">
      <Outlet />
    </div>
  );
}
