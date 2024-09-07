import { useSelector } from "react-redux";
import PreferenceData from "../../components/PreferenceData";
import Container from "../../UI/Container";
import UserPreferenceData from "../../components/User/Preference";
import Modal from "../../UI/Modal";

export default function PreferencePage() {
  const { EditPreferencePopOver } = useSelector((state) => state.modal.modal);

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8 md:hidden block">
          {" "}
          Preferences
        </h1>
        <PreferenceData />
      </Container>
      {EditPreferencePopOver.isOpened && (
        <>
          <Modal cls="top-[5%] absolute z-[1200] left-[20%] w-[60%]">
            <UserPreferenceData
              mode={EditPreferencePopOver.mode?.toLowerCase()}
            />
          </Modal>
        </>
      )}
    </>
  );
}
