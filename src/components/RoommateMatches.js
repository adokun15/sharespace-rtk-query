import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFindRoomateMatchQuery } from "../store/Slices/matches";
import { useIsLoggedInQuery } from "../store/Slices/user";
import Button from "../UI/Button";
import ModalFullView from "../UI/ModalFullView";
import MatchesList from "./MatchesList";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ModalAction } from "../store/Slices/modal";

export default function RoommatesMatch({ user_preferred_roommate }) {
  const dispathch = useDispatch();
  //Get Cached User
  const { data, isError: userError } = useIsLoggedInQuery();

  //Conditionaly run query for user roomates
  const {
    data: matches,
    isLoading,
    isFetching,
    refetch,
    error,
    isError,
  } = useFindRoomateMatchQuery(
    {
      uid: data?.user?.uid,
      formDetails: user_preferred_roommate,
    },
    { skip: !data?.user || userError }
  );

  if (isLoading || isFetching) {
    return (
      <ModalFullView>
        <p className="mt-[10vh] text-center animate-spin text-2xl">
          <FontAwesomeIcon icon={faSpinner} />
        </p>
      </ModalFullView>
    );
  }

  if (isError) {
    return (
      <ModalFullView>
        <p className="text-center text-red-600">{error?.message}</p>
        <Button elclass="mx-auto block my-5" trigger={refetch} outline={true}>
          Try Again
        </Button>
      </ModalFullView>
    );
  }
  if (!matches || matches?.length === 0) {
    return (
      <ModalFullView cls="top-[20vh]">
        <p className="text-center text-2xl text-main_color font-[700]">
          Sadly, there is no match for your request!
        </p>
        <Button
          elclass="mx-auto block my-6"
          trigger={() => {
            dispathch(ModalAction.toggleFindRoommatePopover());
          }}
          outline={true}
        >
          Close
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
