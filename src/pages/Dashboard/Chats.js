import AccountButton from "src/UI/AccountButton";
import { Outlet } from "react-router-dom";

export default function ChatsPage() {
  return (
    <div className="md:w-[75%] mx-auto w-[96&] my-2">
      
        <div className="flex mb-8 justify-between">
          <h2 className="text-3xl font-semibold font-sans_serif">Chats</h2>
            <AccountButton/>
        </div>
      <Outlet />
    </div>
  );
}
