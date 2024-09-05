import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import { useEffect, useRef, useState } from "react";
import { useEditPreferenceMutation } from "../../store/Slices/Preference";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import { isPreferenceInputInValid } from "../../utils/Validator";
export default function UserPreferenceData({ mode }) {
  const { EditPreferencePopOver } = useSelector((state) => state.modal.modal);

  //Add Preferenced Data!
  const ref = useRef();
  const dispatch = useDispatch();

  const { data } = useIsLoggedInQuery();
  const [createPreference, { data: p, isLoading, error, isError }] =
    useEditPreferenceMutation();

  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [habitsEntriesString, setHabitsEntryString] = useState("");

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
      }, 100);
    }
  }, [habitsEntriesString]);

  const offFocusHabit = () => {
    if (habitsEntriesString !== "") {
      setHabits((p) => [...p, habitsEntriesString]);
      setHabitsEntryString("");
    }
  };

  const [formError, setFormError] = useState("");

  const EditPreferenceButton = async () => {
    //Collect credential
    let userPreferenceEdit = {
      rent: EditPreferencePopOver.prev.rent,
      level: EditPreferencePopOver.prev.level,
      location: EditPreferencePopOver.prev.location,
      religion: EditPreferencePopOver.prev.religion,
      department: EditPreferencePopOver.prev.department,
      user_id: data.user?.uid,
    };

    const formdata = new FormData(ref.current);

    for (const [key, value] of formdata.entries()) {
      userPreferenceEdit[key] = value;
    }

    userPreferenceEdit["habits"] =
      habits.length > 0 ? habits : EditPreferencePopOver.prev.habits;

    //Clear Out State
    dispatch(ModalAction.clearSelect());

    await createPreference({
      updateItemValue: userPreferenceEdit,
      id: data.user.uid,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        setTimeout(
          () => dispatch(ModalAction.toggleEditPreferencePopOver()),
          1500
        );
      })
      .catch((e) => console.log(e?.message));
  };

  const triggerSubmit = async () => {
    setFormError("");
    //Collect credential
    let userPreference = {};
    userPreference.user_id = data.user?.uid;

    const formdata = new FormData(ref.current);

    for (const [key, value] of formdata.entries()) {
      userPreference[key] = value;
    }

    userPreference["habits"] = habits;

    const input_error = isPreferenceInputInValid(userPreference);
    if (input_error) {
      setFormError(input_error);
      return;
    }

    if (userPreference.habits.length === 0) {
      setFormError("Habit space is empty!");
      return;
    }

    //Clear Out State
    dispatch(ModalAction.clearSelect());

    //Verify with local Storage
    if (!userPreference?.user_id) return;

    await createPreference({
      updateItemValue: userPreference,
      id: userPreference?.user_id,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        navigate(`/auth/username`);
      })
      .catch((e) => console.log(e?.message));
  };
  return (
    <main>
      <h1 className="text-4xl my-3 first:capitalize">
        {mode || "Edit"} your personal Preference
      </h1>
      {mode === "edit" && (
        <>
          <p className="my-4 text-[16px]">
            You can leave out a space that doesn't need an Update!
          </p>
          <p>{p}</p>
        </>
      )}
      <form
        ref={ref}
        autoComplete="off"
        className="*:block *:font-oswald space-y-10"
      >
        <p>{isError && error?.message}</p>
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
          {!isError && formError ? formError : ""}
        </p>
        <label>
          <p>Rent Amount </p>
          <Select
            name="rent"
            items={[
              { value: "120", name: "below 120k" },
              { value: "120-180", name: "120k - 180k" },
              { value: "180-220", name: "180k - 220k" },
              { value: "220-270", name: "220k - 270k" },
              { value: "270-320", name: "270k - 320k" },
              { value: "320 - 380", name: "320k - 380k" },
              { value: "380 - 460", name: "380k - 460k" },
              { value: "460", name: "460k above" },
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
          Religion :
          <Select
            name="religion"
            items={[
              { value: "Christain", name: "Christain" },
              { value: "lslam", name: "Islam" },
              { value: "Others", name: "Others" },
            ]}
          />
        </label>{" "}
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
        <div className="flex space-x-4">
          {mode === "edit" && (
            <Button
              outline={true}
              trigger={() =>
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
          )}
          <Button
            type="button"
            loading={isLoading}
            trigger={async () => {
              if (mode.toLowerCase() === "edit") {
                await EditPreferenceButton();
              } else {
                await triggerSubmit();
              }
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </main>
  );
}
