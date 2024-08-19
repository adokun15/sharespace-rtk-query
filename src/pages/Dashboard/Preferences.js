import { useDispatch, useSelector } from "react-redux";
import PreferenceData from "../../components/PreferenceData";
import Button from "../../UI/Button";
import Container from "../../UI/Container";
import UserPreferenceData from "../../components/User/Preference";
import { ModalAction } from "../../store/Slices/modal";

export default function PreferencePage() {
  const { EditPreferencePopOver } = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8">Edit Your Preference Data</h1>

        <PreferenceData />
        <Button
          onClick={() =>
            dispatch(
              ModalAction.toggleEditPreferencePopOver({
                mode: "Edit",
                isOpened: true,
              })
            )
          }
        >
          Edit
        </Button>
      </Container>
      {EditPreferencePopOver.isOpened && (
        <UserPreferenceData mode={EditPreferencePopOver.mode} />
      )}
    </>
  );
}
