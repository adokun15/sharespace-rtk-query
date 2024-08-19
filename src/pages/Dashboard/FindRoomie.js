import PreferenceForm from "../../components/PreferenceForm";
import Container from "../../UI/Container";
import RoommatesMatch from "../../components/RoommateMatches";
import { useSelector } from "react-redux";

export default function FindRoommatePage() {
  const { FindRoommatePopOver: isOpened } = useSelector(
    (state) => state.modal.modal
  );

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8"> Find Roomie</h1>
        <PreferenceForm />
      </Container>
      {isOpened && <RoommatesMatch />}
    </>
  );
}
