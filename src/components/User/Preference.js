import { Form } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";
import Input from "../../UI/Input";
export default function UserPreferenceData({ mode }) {
  //Add Preferenced Data!
  const dispatch = useDispatch();

  return (
    <main>
      <h1 className="text-4xl my-3 first:capitalize">
        {mode || "Edit"} your personal Preference
      </h1>
      <Form className="*:block *:font-oswald space-y-10">
        <label>
          <p>Roommate (Number of roommate you want)</p>
          <Input placeholder="" />
        </label>
        <label>
          <p>Rent Amount </p>
          <Input placeholder="Enter Rent Amount e.g 100k" />
        </label>
        <label>
          <p>Level </p>

          <Input placeholder="Enter your current level e.g 200" />
        </label>
        <label>
          <p>Hostel Location</p>
          <Input placeholder="Safari" />
        </label>
        <label>
          <p>Religion</p>
          <Input placeholder="Christainity" />
        </label>
        <label>
          <p>Habit</p>
          <Input placeholder="Habit" />
        </label>
        <div className="flex space-x-4">
          <Button
            outline
            onClick={() =>
              dispatch(
                ModalAction.toggleEditPreferencePopOver({
                  isOpened: false,
                  mode: null,
                })
              )
            }
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </Form>
    </main>
  );
}
