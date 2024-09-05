import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import Image from "../UI/Image";
import userProfile from "../image/202330014270ff.jpg";
import { ModalAction } from "../store/Slices/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RoommateDetail from "./RoommateDetail";

//List of MATCHES
export default function MatchesList({ list }) {
  console.log(list);
  const [currentMatchSelected, setCurrentMatchSelected] = useState(null);

  const [selectedSorted, setSelectedSort] = useState("Sort");

  const [isSortOpened, setSortBoxOpened] = useState(false);

  const dispatch = useDispatch();

  const selectSortOption = (e) => {
    setSelectedSort(e);
    setSortBoxOpened(false);
  };

  const toggleSortOption = () => {
    setSortBoxOpened((prev) => !prev);
  };

  return (
    <div className="bg-slate-50 shadow-inner">
      <header className="flex justify-between items-center px-4 py-5">
        <h1 className="font-oswald w-full md:text-3xl text-xl font-[600]">
          {currentMatchSelected
            ? currentMatchSelected?.username
            : "Potential Matched Roommates"}
        </h1>
        <div className="flex w-[27%] text-[16px] space-x-2 *:rounded-full">
          <div
            className={`relative inline-block ${
              isSortOpened && "grow"
            } transition-all space-y-2`}
          >
            <Button
              disabled={currentMatchSelected}
              trigger={toggleSortOption}
              elClass={` ${currentMatchSelected && "opacity-50 bg-purple-200"}`}
            >
              <span>
                <FontAwesomeIcon icon={faFilter} />
              </span>
              {selectedSorted}
            </Button>
            {/*List */}
            {isSortOpened && (
              <ul className="absolute left-0 z-10 origin-top-left inset-x-0 bg-white shadow">
                <li
                  className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
                  onClick={() => selectSortOption("Name")}
                >
                  (One) Roommate
                </li>
                <li
                  className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
                  onClick={() => selectSortOption("Name")}
                >
                  (Two) Roommates
                </li>
                <li
                  className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
                  onClick={() => selectSortOption("Name")}
                >
                  Name
                </li>
                <li
                  className="cursor-pointer hover:bg-purple-300 px-1 py-2 "
                  onClick={() => selectSortOption("Score")}
                >
                  Score
                </li>
              </ul>
            )}
          </div>
          <Button
            outline={true}
            type="button"
            trigger={() => dispatch(ModalAction.toggleFindRoommatePopover())}
          >
            Close
          </Button>
        </div>
      </header>
      {!currentMatchSelected && (
        <ul className="*:shadow-purple-200 py-5  grid px-[3%] grid-cols-3 gap-5">
          {list &&
            list?.map((match) => (
              <div
                key={match.uid}
                className="flex flex-wrap gap-3 shadow px-4 min-w-[20vw] rounded bg-slate-200 shadow-slate-100 items-center"
              >
                <div>
                  <Image h={100} w={100} imgSrc={match?.photourl} />
                </div>
                <article className=" py-4 space-y-1 ">
                  <p className="capitalize text-3xl font-roboto font-bold">
                    {match?.username}
                  </p>
                  <p className="text-[14px]">Match Score : {match?.score}%</p>
                  <p className="text-[14px]">
                    Level : {match?.preference?.level}
                  </p>
                  <Button
                    elclass="rounded-xl text-[20px] w-full"
                    trigger={() => {
                      //console.log(match);
                      setCurrentMatchSelected(match);
                    }}
                    elClass="text-[15px] w-fit rounded-full px-4"
                  >
                    Select
                  </Button>
                </article>
              </div>
            ))}
        </ul>
      )}
      {currentMatchSelected && (
        <RoommateDetail
          detail={currentMatchSelected}
          onClose={() => setCurrentMatchSelected(null)}
        />
      )}
    </div>
  );
}
