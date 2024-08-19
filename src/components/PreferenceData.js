import { useState } from "react";
import Card from "../UI/Card";
import { ToggleButton } from "../UI/ToggleButton";

export default function PreferenceData() {
  const [btnIsOn, setBtnToggle] = useState(false);

  //useEffect(()=>{

  //})

  const alterToggleButton = () => {
    setBtnToggle((prevState) => !prevState);
  };
  return (
    <Card>
      <h1 className="text-3xl text-center my-4">Your Personal Preference</h1>
      <div className="flex font-roboto font-bold items-center">
        <span className="grow">Add to Search List for Other User</span>
        <ToggleButton state={btnIsOn} toggleFunc={alterToggleButton} />
      </div>
      <div className="divide-y *:py-3 divide-purple-400 ">
        {/* <p className="text-2xl">
          School: <span>(KWARA STATE UNIVERSITY)</span>
  </p >
        <p className="text-2xl">
          Age : <span>(18 years Old)</span>
        </p>
        */}
        <p className="text-2xl">
          MaxRent: <span>(#100,000)</span> /{" "}
          <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
            Between two Individual{" "}
          </span>
        </p>
        <p className="text-2xl">
          Religion: <span>(Christainity)</span>
        </p>
        <p className="text-2xl">
          Level: <span>(200 LEVEL)</span>
        </p>
        <p className="text-2xl">
          Your Location: <span>(SAFARI)</span>
        </p>
        <p className="text-2xl">
          Your Habit / Hobbies: <span>(COOKING, BASKETBALL, CODING)</span>
        </p>
        <p className="text-2xl">
          Department: <span>(Computer Science)</span>
        </p>
      </div>
    </Card>
  );
}
