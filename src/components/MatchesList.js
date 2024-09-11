import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import Image from "../UI/Image";
import { ModalAction } from "../store/Slices/modal";
import { useState } from "react";
import RoommateDetail from "./RoommateDetail";

//List of MATCHES
export default function MatchesList({ list }) {
  const [currentMatchSelected, setCurrentMatchSelected] = useState(undefined);

  const dispatch = useDispatch();
  return (
    <div className="bg-slate-50 shadow-inner">
      <header className="flex justify-between items-center px-4 py-5 flex-wrap">
        <h1 className="font-oswald md:text-3xl text-xl font-[600]">
          {currentMatchSelected
            ? currentMatchSelected?.username
            : "Potential Matched Roommates"}
        </h1>
        <Button
          outline={true}
          type="button"
          trigger={() => dispatch(ModalAction.toggleFindRoommatePopover())}
        >
          Close
        </Button>
      </header>
      {!currentMatchSelected && (
        <ul className="*:shadow-purple-200 py-5 block md:grid px-[3%] grid-cols-2 gap-5">
          {list &&
            list?.map((match) => (
              <>
                <div
                  key={match.uid}
                  className="flex flex-wrap my-1 gap-3 w-full shadow px-4 min-w-[50%] py-4 md:w-fit rounded bg-slate-200 shadow-slate-100 items-center"
                >
                  <div>
                    <Image h={100} w={100} imgSrc={match?.photourl} />
                  </div>
                  <article className=" py-4 space-y-[2px] ">
                    <p className="capitalize text-3xl font-roboto font-bold">
                      {match?.username}
                    </p>
                    <p className="text-[12px] pl-1">{match?.email}</p>
                    <p className="text-[14px]">
                      Match Score :{" "}
                      {match?.score >= 100
                        ? 100
                        : !match.score
                        ? 0
                        : match?.score}
                      %
                    </p>
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
              </>
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
