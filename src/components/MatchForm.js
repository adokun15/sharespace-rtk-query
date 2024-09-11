//import { useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../store/Slices/modal";
import Select from "../UI/Select";
import { useEffect, useRef, useState } from "react";
import Input from "../UI/Input";
import { isMatchInputInValid } from "../utils/Validator";

export default function MatchForm({ onHandleSubmit }) {
  //const SchoolRef = useRef();
  const dispatch = useDispatch();
  const ref = useRef();

  const [habits, setHabits] = useState([]);
  const [habitsEntriesString, setHabitsEntryString] = useState("");
  const [rentRange, setRentRange] = useState(120);

  const rentChangeHandler = (e) => {
    setRentRange(e.target?.value);
  };

  const habitHandler = (e) => {
    setHabitsEntryString(e?.target.value);
  };

  const removefromHabitList = (h) => {
    setHabits((prevstate) => {
      const newHabit = prevstate?.filter((habit) => h !== habit);
      return newHabit;
    });
  };
  useEffect(() => {
    if (habitsEntriesString && habitsEntriesString.includes(" ")) {
      setHabits((p) => [...p, habitsEntriesString]);

      setTimeout(() => {
        setHabitsEntryString("");
      }, 500);
    }
  }, [habitsEntriesString]);

  const offFocusHabit = () => {
    if (habitsEntriesString !== "") {
      setHabits((p) => [...p, habitsEntriesString]);
      setHabitsEntryString("");
    }
  };

  const [formError, setFormError] = useState("");

  const SearchRoommate = () => {
    //init
    let query = {};
    setFormError("");

    //get Credential
    const getFormData = new FormData(ref.current);

    for (const [key, value] of getFormData.entries()) {
      query[key] = value;
    }

    query["habits"] = habits;
    query["rent"] = rentRange;

    //validate input query
    const match_input_error = isMatchInputInValid(query);
    if (match_input_error) {
      setFormError(match_input_error);
      return;
    }

    if (query.habits.length === 0) {
      setFormError("Habit space is empty!");
      return;
    }

    //Clear Out State
    dispatch(ModalAction.clearSelect());

    //Run Match Function
    onHandleSubmit(query);

    //show popover
    dispatch(ModalAction.toggleFindRoommatePopover());
  };
  return (
    <>
      <h1
        className="text-center font-sans_serif bg-purple-400 px-3 py-1 rounded-full w-fit 
      m-auto mt-5 text-white
      text-2xl mb-5 "
      >
        Search Roommate
      </h1>
      <Card>
        <form
          ref={ref}
          className="space-y-4 *:text-xl my-4 *:block block font-oswald"
        >
          <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
            {formError}
          </p>
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
                { value: "Christain", name: "Christain" },
                { value: "lslam", name: "Islam" },
              ]}
            />
          </label>
          <label>
            Department :
            <Select
              name="department"
              items={[
                { value: "Computer Science", name: "Computer Science" },
                {
                  value: "Food Science and Technology",
                  name: "Food Science and Technology",
                },
                {
                  value: "Electrical and Computer Engineering",
                  name: "Electrical and Computer Engineering",
                },
                { value: "Accounting", name: "Accounting" },
                { value: "Business Administration", name: "Business Admin" },
                {
                  value: "Public Health Science",
                  name: "Public Health Science",
                },
              ]}
            />
          </label>
          <label className="my-2">
            MaxRent ({rentRange}k)
            <input
              type="range"
              className="block w-full in-range:text-purple-400"
              min={120}
              max={500}
              onChange={rentChangeHandler}
              value={rentRange}
            />
          </label>
          <label>
            Habits | Hobbies (Seperate by whitespace):
            <Input
              onChange={habitHandler}
              value={habitsEntriesString}
              name="habits"
              onBlur={offFocusHabit}
              placeholder={`Cooking, Partying, Reading Always etc`}
            />
            <div className="flex flex-wrap gap-3 my-3">
              {habits &&
                habits?.map((habit, index) => (
                  <li
                    key={index}
                    className="rounded-full px-2 py-1 pr-4 list-none  bg-purple-300"
                  >
                    <span>{habit}</span>
                    <button
                      type="button"
                      className="ml-2 font-[700] text-xl"
                      onClick={() => removefromHabitList(habit)}
                    >
                      x
                    </button>
                  </li>
                ))}
            </div>
          </label>
          <label>
            Location :
            <Select
              name="location"
              items={[
                { value: "Safari", name: "Safari" },
                { value: "Westend", name: "Westend" },
                { value: "School Road", name: "School Road" },
              ]}
            />
          </label>
          <label>
            Age Range :
            <Select
              name="age"
              items={[
                { value: "17", name: "below 17" },
                { value: "17-19", name: "17 - 19" },
                { value: "20-22", name: "20 - 22" },
                { value: "23-26", name: "23 - 26" },
                { value: "27", name: "27 and above" },
              ]}
            />
          </label>
          <div className="flex justify-center col-end-3 col-start-1 my-2">
            <Button
              elclass="focus:scale-95 transition-all w-full"
              type="button"
              trigger={SearchRoommate}
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
