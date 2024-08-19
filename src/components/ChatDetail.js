import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";

export default function ChatDetail() {
  return (
    <div className="w-3/5 m-auto">
      <ChatNavigator />
      <div
        className="shadow py-3 rounded *:flex *:justify-center overflow-y-scroll 

      max-h-[50vh] bg-white "
      >
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
        <ChatBoxMessage />
      </div>
      <ChatInputMessage />
    </div>
  );
}
