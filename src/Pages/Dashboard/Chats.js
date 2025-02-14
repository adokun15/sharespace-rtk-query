import { Outlet } from "react-router-dom";

export default function ChatsPage() {
  return (
    <div className="container w-full my-2">
      <Outlet />
    </div>
  );
}
