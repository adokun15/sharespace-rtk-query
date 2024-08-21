import PreferenceForm from "../../components/PreferenceForm";
import Container from "../../UI/Container";
import RoommatesMatch from "../../components/RoommateMatches";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";

export default function FindRoommatePage() {
  const { FindRoommatePopOver: isOpened } = useSelector(
    (state) => state.modal.modal
  );

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8"> Dashboard</h1>
        <div>
          <h2 className="text-2xl">Recent Activity</h2>
          <article className="flex my-2 justify-between px-5">
            <p>You Have been added to (3) discuss Room </p>
            <Button>View</Button>
          </article>
        </div>
        <PreferenceForm />
      </Container>
      {isOpened && <RoommatesMatch />}
    </>
  );
}
