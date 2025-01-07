import { Button } from "../components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import ChatDetail from "./ChatDetail";
export default function ChatList({ chats }) {
  const [id, setChatId] = useState(null);

  if (chats?.length === 0) {
    return (
      <p className="text-xl font-roboto font-[400] text-center my-6">
        No Space added yet!
      </p>
    );
  }

  return (
    <Sheet side="bottom">
      <div className="">
        <ul className=" space-y-3 min-w-[25rem] mt-3">
          {chats?.map((chat) => (
            <SheetTrigger onClick={() => setChatId(chat.spaceId)}>
              <div className="min-w-40 hover:text-white hover:bg-purple-400 shadow flex px-2 py-3 even:bg-slate-50 rounded justify-between">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={chat?.user?.photo} />
                    <AvatarFallback>TN</AvatarFallback>
                  </Avatar>
                  <article>
                    <h3 className="text-xl font-bold">{chat?.user?.name}</h3>
                  </article>
                </div>
                <Button className="justify-end" variant="ghost">
                  <MoreVertical />
                </Button>
              </div>
            </SheetTrigger>
          ))}
        </ul>
      </div>
      <SheetContent side="bottom">
        <ChatDetail spaceId={id} />
      </SheetContent>
    </Sheet>
  );
}
