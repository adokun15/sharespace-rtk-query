import ChatList from "../../components/ChatList";
import Container from "../../UI/Container";
export default function ChatsPage() {
  return (
    <Container elClass="my-2">
      <header className=" px-6 ">
        <h1 className="text-4xl  text-center my-8"> Space </h1>
      </header>

      <ChatList />
    </Container>
  );
}
