//import { useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../store/Slices/modal";

export default function PreferenceForm({
  // headerText = "Preferences ",
  isFilled,
}) {
  //const SchoolRef = useRef();
  const dispatch = useDispatch();

  return (
    <Card>
      <h1 className="text-3xl mb-5 ">Search your for your Roommate</h1>
      <form className="space-y-4 *:text-xl my-4 *:block block  font-oswald">
        {/*
        <label className="col-end-3 text-xl divide-y col-start-1">
          School :
          <select
            ref={SchoolRef}
            className="bg-purple-200  focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
          >
            <option value="kwara">Kwara State University</option>
            <option value="lasu">Lagos State University</option>
            <option value="uniben"> University of Benin</option>
          </select>
        </label>
*/}
        <label className="col-end-3 col-start-1">
          Level :
          <select
            disabled={isFilled?.level}
            className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </label>
        <label>
          Religion :
          <select className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full">
            <option value="100">Christainity</option>
            <option value="100">Islam</option>
            <option value="100">Other</option>
          </select>
        </label>
        <label>
          Department :
          <input className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full" />{" "}
        </label>
        <label>
          MaxRent (Full Price Of Hostel Accomodation):
          <select
            type="number"
            placeholder="100,000"
            className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
          >
            <option value="100">below 120k</option>
            <option value="100">120k - 180k</option>
            <option value="100">180k - 220k</option>
            <option value="100">220k - 270k</option>
            <option value="100">270k - 320k</option>
            <option value="100">320k - 380k</option>
            <option value="100">380k - 460k</option>
            <option value="100">460k above</option>
          </select>
        </label>
        <label>
          Habit/Hobbies (Seperate by ","):
          <input
            placeholder={`Cooking, Partying, Reading Always etc`}
            className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
          />
        </label>
        <label>
          Location :
          <select className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full">
            <option>Westend</option>
            <option>School Road</option>
            <option>Safari</option>
          </select>
        </label>
        <label>
          Age Range :
          <select className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full">
            <option>below 17</option>
            <option>17 - 19</option>
            <option>20 - 22</option>
            <option>23 - 26</option>
            <option>27 and above</option>
          </select>
        </label>
        <div className="flex justify-center col-end-3 col-start-1 my-2">
          <Button
            type="button"
            onClick={() => dispatch(ModalAction.toggleFindRoommatePopover())}
          >
            Search
          </Button>
        </div>
      </form>
    </Card>
  );
}
