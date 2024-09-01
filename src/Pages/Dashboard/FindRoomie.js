import MatchForm from "../../components/MatchForm";
import Container from "../../UI/Container";
import RoommatesMatch from "../../components/RoommateMatches";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NoticeList } from "../../components/NoticesList";

export default function FindRoommatePage() {
  const [formInfo, setInfo] = useState(null);
  const { FindRoommatePopOver: isOpened } = useSelector(
    (state) => state.modal.modal
  );

  const formHandler = (details) => {
    /*
      level: ,
      religion:,
      department: ,
      rent: ,
      location,
      age: 
      habits: ,
    } */
    setInfo(details);
  };

  const [isNoticeOpen, toggleNotification] = useState(false);

  return (
    <>
      <Container>
        <h1 className="text-4xl text-center my-8"> Dashboard</h1>
        <div>
          <article className=" flex justify-between px-2 py-4 bg-slate-300 rounded ">
            <p className="py-4 bg-slate-300 rounded text-purple-600 font-[400]">
              {isNoticeOpen ? "Hide" : "Show"} Notifications
            </p>
            <Button onClick={() => toggleNotification((p) => !p)}>
              {isNoticeOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </Button>
          </article>
          {isNoticeOpen && <NoticeList />}
        </div>

        <MatchForm onHandleSubmit={formHandler} />
      </Container>
      {isOpened && <RoommatesMatch user_preferred_roommate={formInfo} />}
    </>
  );
}
