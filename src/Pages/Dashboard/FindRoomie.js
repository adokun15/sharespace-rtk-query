import MatchForm from "../../components/MatchForm";
import Container from "../../UI/Container";
import RoommatesMatch from "../../components/RoommateMatches";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import {
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

  const { data, isLoading } = useIsLoggedInQuery();

  const { FindRoommatePopOver: isOpened } = useSelector(
    (state) => state.modal.modal
  );

  const formHandler = (details) => {
    setInfo(details);
  };

  const [isNoticeOpen, toggleNotification] = useState(false);

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8"> Dashboard</h1>
        {!isLoading && (
          <div>
            <article className=" my-3 flex items-center justify-between px-3 py-1 bg-slate-100 rounded ">
              <p className="py-4 text-2xl font-[800] rounded text-purple-600 ">
                {isNoticeOpen ? "Hide" : "Show"} Notifications
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
