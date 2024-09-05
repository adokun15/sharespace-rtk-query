import Card from "../UI/Card";
import { ToggleButton } from "../UI/ToggleButton";
import { useGetPreferenceQuery } from "../store/Slices/Preference";
import Button from "../UI/Button";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ModalAction } from "../store/Slices/modal";
import { useToggleAvailabilityMutation } from "../store/Slices/Preference";

export default function PreferenceData() {
  const dispatch = useDispatch();

  const { data: user, isLoading: userLoading } = useIsLoggedInQuery();

  const {
    data: prefs,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetPreferenceQuery(user?.user?.uid, { skip: !user?.user?.uid });

  const [
    toggleAvailabilty,
    {
      isError: IsToggleAvailError,
      error: toggleError,
      isLoading: toggleLoading,
    },
  ] = useToggleAvailabilityMutation();

  const toggleavailabiltyfunc = async () => {
    await toggleAvailabilty({
      uid: user?.user?.uid,
      prevState: prefs?.isAvail,
    })
      .unwrap()
      .catch((e) => console.error(e.message));
  };
  if (isLoading || userLoading) {
    return (
      <p className="mt-[10vh] text-center text-2xl">
        <FontAwesomeIcon
          className="animate-spin text-purple-500"
          icon={faSpinner}
        />
      </p>
    );
  }
  console.log(prefs);
  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
        <Button trigger={refetch} outline={true}>
          Try Again
        </Button>
      </div>
    );
  }
  if (!prefs) return;

  const [minRent, maxRent] = prefs?.rent.split("-");
  return (
    <>
      <Card>
        <h1 className="text-3xl text-center my-4">Your Personal Preference</h1>
        <p className="text-2xl text-center text-red-600">
          {IsToggleAvailError && toggleError?.mesaage}
        </p>
        <div className="flex font-roboto font-bold items-center">
          <span className="grow">Allow other users find you</span>
          <ToggleButton
            state={prefs?.isAvail}
            togglefunc={toggleavailabiltyfunc}
            loading={toggleLoading}
          />
        </div>
        <div className="divide-y *:py-3 divide-purple-400 ">
          <p className="text-2xl">
            Rent :{" "}
            <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
              {minRent && maxRent
                ? `Between ${minRent}k and ${maxRent}k `
                : `${minRent}k`}
            </span>
          </p>
          <p className="text-2xl">
            Religion:{" "}
            <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
              {prefs?.religion}
            </span>
          </p>
          <p className="text-2xl">
            Level:{" "}
            <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
              {prefs?.level}
            </span>
          </p>
          <p className="text-2xl">
            Your Location:{" "}
            <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
              {prefs?.location}
            </span>
          </p>
          <p className="text-2xl">
            Your Habit / Hobbies:{" "}
            <span className="bg-purple-400/50 block mt-3 rounded px-3 p-1 w-fit">
              {prefs?.habits.map((habit) => habit).join(",")}
            </span>
          </p>
          <p className="text-2xl">
            Department:
            <span className="bg-purple-400/50 rounded px-3 p-1 w-fit">
              {prefs?.department}
            </span>
          </p>
        </div>
      </Card>
      <Button
        trigger={() =>
          dispatch(
            ModalAction.toggleEditPreferencePopOver({
              mode: "Edit",
              isOpened: true,
              prev: prefs,
            })
          )
        }
      >
        Edit
      </Button>
    </>
  );
}
