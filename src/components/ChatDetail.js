import Container from "../UI/Container";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";

export default function ChatDetail() {
  const chatExample = [
    {
      from: 1, //User Object,
      message: "Hi", // Encrypted Text
      timeSent: "08:23pm", //Time Object
    },
    {
      from: 0, //User Object,
      message: "Hello", // Encrypted Text
      timeSent: "08:23pm", //Time Object
    },
    {
      from: 0, //User Object,
      message: "iM jAMES", // Encrypted Text
      timeSent: "08:23pm", //Time Object
    },
    {
      from: 1, //User Object,
      message: "hELLO jAMES, how you doing?", // Encrypted Text
      timeSent: "08:23pm", //Time Object
    },
    {
      from: 0, //User Object,
      message: "Im fine... im hungry...bro", // Encrypted Text
      timeSent: "08:23pm", //Time Object
    },
  ];

  return (
    <Container>
      <ChatNavigator />
      <p className="my-3 italic text-center">
        Conclusion must take place before 10 days reaches!
      </p>
      <div
        className="shadow py-3 rounded  overflow-y-scroll 

      max-h-[50vh] bg-white "
      >
        {chatExample.map((chat) => (
          <ChatBoxMessage
            key={chat.message}
            timeSent={chat.timeSent}
            message={chat.message}
            user={chat.from}
          />
        ))}
      </div>
      <ChatInputMessage />
    </Container>
  );
}
