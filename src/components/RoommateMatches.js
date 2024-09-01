import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFindRoomateMatchQuery } from "../store/Slices/matches";
import { useIsLoggedInQuery } from "../store/Slices/user";
import Button from "../UI/Button";
import ModalFullView from "../UI/ModalFullView";
import MatchesList from "./MatchesList";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function RoommatesMatch({ user_preferred_roommate }) {
  //Get Cached User
  const { data, isError: userError } = useIsLoggedInQuery();

  //Conditionaly run query for user roomates
  const {
    data: matches,
    isLoading,
    refetch,
    error,
    isError,
  } = useFindRoomateMatchQuery(
    {
      uid: data?.user?.uid,
      formDetails: user_preferred_roommate,
    },
    { skips: !data?.user || userError }
  );

  if (isLoading) {
    return (
      <ModalFullView>
        <p className="mt-[10vh] animate-spin text-2xl">
          <FontAwesomeIcon icao={faSpinner} />
        </p>
      </ModalFullView>
    );
  }

  if (isError) {
    return (
      <ModalFullView>
        <p>{error?.message}</p>
        <Button onClick={refetch} outline={true}>
          Try Again
        </Button>
      </ModalFullView>
    );
  }

  return (
    <ModalFullView>
      <MatchesList list={matches} />
    </ModalFullView>
  );
}
