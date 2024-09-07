import MatchForm from "../../components/MatchForm";
import Container from "../../UI/Container";
import RoommatesMatch from "../../components/RoommateMatches";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import {
  faBell,
  faChevronDown,
  faChevronUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NoticeList } from "../../components/NoticesList";
import { useIsLoggedInQuery } from "../../store/Slices/user";

export default function FindRoommatePage() {
  const [formInfo, setInfo] = useState(null);

  const { data, error, isFetching, isError, refetch, isLoading } =
    useIsLoggedInQuery();

  const { FindRoommatePopOver: isOpened } = useSelector(
    (state) => state.modal.modal
  );

  const formHandler = (details) => {
    setInfo(details);
  };

  const [isNoticeOpen, toggleNotification] = useState(false);

  if (isFetching || isLoading) {
    return <p className=" text-center my-8 text-xl">loading...</p>;
  }

  if (isError) {
    return (
      <div>
        <p className="text-center text-3xl font-[700] my-5">
          {error?.message || "Something went Wrong"}
        </p>

        <Button
          trigger={refetch}
          outline={true}
          elclass="mx-auto cursor-pointer block my-5"
        >
          Try again
        </Button>
      </div>
    );
  }
  return (
    <>
      <Container>
        <h1 className="text-4xl text-center block md:hidden my-8">
          {" "}
          Dashboard
        </h1>
        {!isLoading && (
          <div>
            <article className=" my-3 flex items-center justify-between px-3 py-1 mx-auto bg-slate-100 rounded ">
              <p className="py-1 text-xl font-[400] rounded text-purple-600 ">
                <FontAwesomeIcon icon={faBell} />
              </p>
              <Button
                elclass=" bg-slate-100  w-fit h-fit"
                trigger={() => toggleNotification((p) => !p)}
              >
                {isNoticeOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </Button>
            </article>
            {isNoticeOpen && <NoticeList id={data?.user?.uid} />}
          </div>
        )}
        {isLoading && (
          <p className="mt-[10vh] text-center text-2xl">
            <FontAwesomeIcon
              className="  animate-spin text-purple-500"
              icon={faSpinner}
            />
          </p>
        )}
        <MatchForm onHandleSubmit={formHandler} />
      </Container>
      {isOpened && <RoommatesMatch user_preferred_roommate={formInfo} />}
    </>
  );
}
