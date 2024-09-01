import { useState } from "react";
import Card from "../UI/Card";
import { ToggleButton } from "../UI/ToggleButton";
import { useGetPreferenceQuery } from "../store/Slices/Preference";
import Button from "../UI/Button";
import { cookie_id } from "../utils/authHandler";

export default function PreferenceData() {
  const [btnIsOn, setBtnToggle] = useState(false);
  const {
    data: prefs,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetPreferenceQuery(cookie_id);

  const alterToggleButton = () => {
    setBtnToggle((prevState) => !prevState);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
        <Button onClick={refetch} outline={true}>
          Try Again
        </Button>
      </div>
    );
  }
  console.log(prefs);

  return (
    <Card>
      <h1 className="text-3xl text-center my-4">Your Personal Preference</h1>
      <div className="flex font-roboto font-bold items-center">
        <span className="grow">Allow other users find you</span>
        <ToggleButton state={btnIsOn} toggleFunc={alterToggleButton} />
      </div>
      <div className="divide-y *:py-3 divide-purple-400 ">
        <p className="text-2xl">
          Roommate History:
          <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
            {/* 1 more | No roommate(s) yet*/}
            {prefs?.roommate}
          </span>
        </p>
        <p className="text-2xl">
          Rent :{" "}
          <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
            {prefs?.rent}
          </span>
        </p>
        <p className="text-2xl">
          Religion: <span>{prefs?.religion}</span>
        </p>
        <p className="text-2xl">
          Level: <span>{prefs?.level}</span>
        </p>
        <p className="text-2xl">
          Your Location: <span>{prefs?.location}</span>
        </p>
        <p className="text-2xl">
          Your Habit / Hobbies: <span>{prefs?.habit}</span>
        </p>
        <p className="text-2xl">
          Department: <span>{prefs?.department}</span>
        </p>
      </div>
    </Card>
  );
}
