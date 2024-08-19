import ChatList from "../../components/ChatList";
import SearchChats from "../../components/SearchChats";
import Container from "../../UI/Container";
/*const Matches = [
  {
    id: 1,
    name: "SIDD",
  },
  {
    id: 3,
    name: "DORO",
  },
  {
    id: 43,
    name: "dADDF",
  },
];*/
export default function ChatsPage() {
  return (
    <Container elClass="my-2">
      <header className="flex justify-between px-6 items-center space-x-5">
        <h1 className="text-4xl  text-center my-8"> Chat </h1>
        <SearchChats />
      </header>
      <ChatList />
    </Container>
  );
}
