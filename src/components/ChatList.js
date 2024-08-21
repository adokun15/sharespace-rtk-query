import Image from "../UI/Image";
import ProfilePicDemo from "../image/202330014270ff.jpg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

export default function ChatList({
  chats = [{ chatId: 1 }, { chatId: 2 }, { chatId: 3 }, { chatId: 4 }],
}) {
  const router = useNavigate();
  return (
    <ul className=" divide-y-2 overflow-y-scroll h-[70vh]">
      {chats &&
        chats.length >= 1 &&
        chats?.map((chat, i) => (
          <div className=" flex gap-3" key={chat.chatId}>
            <div className="mx-3 relative ">
              <Image imgSrc={ProfilePicDemo} />
              {i % 2 !== 0 && <Image imgSrc={ProfilePicDemo} />}
            </div>

            <div className="py-4 space-y-6">
              <p className="text-4xl">Danny Soma & soma </p>
              <p>Last Time Opened: 1hr ago</p>
              <article className="flex gap-3 box-border py-4">
                <Button elClass="bg-white w-full hover:border-solid hover:border-purple-300 hover:border-[2px]  rounded-full">
                  Delete Session
                </Button>
                <Button
                  onClick={() =>
                    chat?.chatId ? router(`${chat?.chatId}`) : null
                  }
                  elClass="w-full rounded-full focus:scale-75 transition-all"
                >
                  View
                </Button>
              </article>
            </div>
          </div>
        ))}
    </ul>
  );
}
