//import { useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../store/Slices/modal";
import Select from "../UI/Select";
import { useRef } from "react";
import Input from "../UI/Input";

export default function PreferenceForm() {
  //const SchoolRef = useRef();
  const dispatch = useDispatch();
  const ref = useRef();

  const SearchRoommate = () => {
    //get Credential
    const getFormData = new FormData(ref.current);
    for (const [key, value] of getFormData) {
      console.log(key, value);
    }
    console.log(getFormData.get("age"));

    //Clear Out State
    dispatch(ModalAction.clearSelect());

    //Load Async fetch
    //Run Match Function

    //show popover
    dispatch(ModalAction.toggleFindRoommatePopover());
  };

  return (
    <>
      <h1 className="text-2xl mb-5 ">Search your for your Roommate</h1>
      <Card>
        <form
          ref={ref}
          className="space-y-4 *:text-xl my-4 *:block block  font-oswald"
        >
          <label className="col-end-3 text-xl divide-y col-start-1">
            Number of Roommate(s)
            <Select
              name="roommate"
              defaultVal="---"
              items={[
                { value: "1", name: "One" },
                { value: "2", name: "two" },
              ]}
            />
          </label>

          <label className="col-end-3 col-start-1">
            Level :
            <Select
              name="level"
              items={[
                { value: "100", name: "100" },
                { value: "200", name: "200" },
                { value: "300", name: "300" },
                { value: "400", name: "400" },
                { value: "500", name: "500" },
              ]}
            />
          </label>
          <label>
            Religion :
            <Select
              name="religion"
              items={[
                { value: "christain", name: "Christain" },
                { value: "islam", name: "Islam" },
                { value: "others", name: "Others" },
              ]}
            />
          </label>
          <label>
            Department :
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
            />
          </label>
          <label>
            MaxRent (Full Price Of Hostel Accomodation):
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
            />
          </label>
          <label>
            Habit/Hobbies (Seperate by ","):
            <Input
              name="habit"
              placeholder={`Cooking, Partying, Reading Always etc`}
            />
          </label>
          <label>
            Location :
            <Select
              name="location"
              items={[
                { value: "safari", name: "Safari" },
                { value: "westend", name: "Westend" },
                { value: "school_road", name: "School Road" },
              ]}
            />
          </label>
          <label>
            Age Range :
            <Select
              name="age"
              items={[
                { value: "-17", name: "below 17" },
                { value: "17-19", name: "17 - 19" },
                { value: "20-22", name: "20 - 22" },
                { value: "23-26", name: "23 - 26" },
                { value: "27+", name: "27 and above" },
              ]}
            />
          </label>
          <div className="flex justify-center col-end-3 col-start-1 my-2">
            <Button elClass="w-full" type="button" onClick={SearchRoommate}>
              Search
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
