import { useAddmessageMutation } from "../store/Slices/Space";
import Container from "../UI/Container";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatInputMessage from "./ChatInputMessage";
import ChatNavigator from "./ChatNavigator";

export default function ChatDetail() {
  // eslint-disable-next-line no-unused-vars
  const [notdoingAnythiny, { isError, error }] = useAddmessageMutation({
    fixedCachedKey: "add-message",
  });

  return (
    <Container>
      {isError && error?.message}
      <ChatNavigator />
      <div className="shadow py-3 rounded  overflow-y-scroll h-[50vh] bg-white ">
        <p className="my-3 italic text-center">
          Conclusion must take place before 10 days reaches!
        </p>
        <ChatBoxMessage />
      </div>
      <ChatInputMessage />
    </Container>
  );
}
