import { Form } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
export default function UserPreferenceData({ mode }) {
  //Add Preferenced Data!
  const dispatch = useDispatch();

  return (
    <main>
      <h1 className="text-4xl my-3 first:capitalize">
        {mode || "Edit"} your personal Preference
      </h1>
      {mode === "edit" && (
        <p className="my-4 text-[16px]">
          You can leave out a space that doesn't need an Update!
        </p>
      )}
      <Form autoComplete="off" className="*:block *:font-oswald space-y-10">
        <label>
          <p>Roommate (Number of roommate you want)</p>
          <Select
            name="roommate"
            items={[
              { value: "1", name: "One" },
              { value: "2", name: "two" },
            ]}
          />
        </label>
        <label>
          <p>Rent Amount </p>
          <Select
            name="rent"
            items={[
              { value: "-120", name: "below 120k" },
              { value: "120-180", name: "120k - 180k" },
              { value: "180-220", name: "180k - 220k" },
              { value: "220-270", name: "220k - 270k" },
              { value: "270-320", name: "270k - 320k" },
              { value: "320 - 380", name: "320k - 380k" },
              { value: "380 - 460", name: "380k - 460k" },
              { value: "460+", name: "460k above" },
            ]}
          />{" "}
        </label>
        <label>
          <p>Level </p>
          <Select
            name="level"
            items={[
              { value: "100", name: "100" },
              { value: "200", name: "200" },
              { value: "300", name: "300" },
              { value: "400", name: "400" },
              { value: "500", name: "500" },
            ]}
          />{" "}
        </label>
        <label>
          <p>Hostel Location</p>
          <Select
            name="location"
            items={[
              { value: "safari", name: "Safari" },
              { value: "westend", name: "Westend" },
              { value: "school_road", name: "School Road" },
            ]}
          />{" "}
        </label>
        <label>
          <p>Religion</p>
          <Select
            name="religion"
            items={[
              { value: "christain", name: "Christain" },
              { value: "islam", name: "Islam" },
              { value: "others", name: "Others" },
            ]}
          />{" "}
        </label>
        <label>
          <p>Habit</p>
          <Input
            name="habit"
            placeholder={`Cooking, Partying, Reading Always etc`}
          />
        </label>
        <label>
          <p>Department</p>
          <Select
            name="department"
            items={[
              { value: "cs", name: "Computer Science" },
              { value: "agric", name: "Agriculture" },
              { value: "ece", name: "Electrical and Computer Engineering" },
              { value: "acc", name: "Accounting" },
              { value: "ba", name: "Business Admin" },
              { value: "phs", name: "Public Health Science" },
            ]}
          />{" "}
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
