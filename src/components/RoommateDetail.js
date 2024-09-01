import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Image from "../UI/Image";
//import ProfilePic from "../image/202330014270ff.jpg";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

import { useSpaceRequestMutation } from "../store/Slices/Space";
import { cookie_id } from "../utils/authHandler";
import { useEffect } from "react";
export default function RoommateDetail({ detail, onClose }) {
  //  const [discussSpaceOpen, setDiscussSpaceOpen] = useState(false);

  const [createSpace, { data, isLoading, error, isError }] =
    useSpaceRequestMutation();

  const createNewSpace = async () => {
    await createSpace({
      userid: cookie_id,
      roommate_req_id: detail?.uid,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };

  useEffect(() => {
    if (data && !isError) onClose();
  }, [data, isError, onClose]);

  return (
    <>
      <Card elClass="relative overflow-visible  transition-all">
        <article className="flex gap-10 flex-wrap justify-center items-center">
          <div className=" border-[4px] shadow-purple-300 shadow border-solid border-purple-600 w-fit h-fit rounded-full flex place-content-center ">
            <Image imgSrc={detail?.photourl} h={125} w={125} />
          </div>

          <div className="space-y-2">
            <p className="text-4xl">{detail?.profile?.fullname}</p>
            <p className="bg-gray-400  w-fit p-1 font-oswald font-bold text-xl">
              Score: <span className="bg-white p-1">{detail?.score}%</span>
            </p>

            <p className="  w-fit p-1 font-oswald font-bold text-xl">
              Rent Amount:
              <span className=" shadow-slate-400 mx-3 shadow bg-white p-1">
                {detail?.preference?.rent}
              </span>
            </p>
          </div>
        </article>
        <p>{isError && error?.message}</p>
        <article className="mx-[10%] p-3 my-5 rounded shadow shadow-slate-300 m-auto  ">
          <h4 className="font-oswald">Profile</h4>
          <div className="grid grid-cols-1 my-3 gap-2  md:grid-cols-2">
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                School*
              </p>
              <p>{detail?.profile?.school}</p>
            </div>

            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Department*
              </p>
              <p>{detail?.preference?.department}</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Level*
              </p>
              <p>{detail?.preference?.level}</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Age*
              </p>
              <p>{detail?.profile?.dob}</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Religion
              </p>
              <p>{detail?.preference?.religion}</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Preferenced Hostel Location
              </p>
              <p>{detail?.preference?.location}</p>
            </div>
          </div>
        </article>

        <article className="mx-[10%] p-3 rounded shadow shadow-slate-300 m-auto my-3">
          <h4 className="font-oswald">Hobbies / Habits</h4>
          <div className="my-2 text-[16px] flex flex-wrap space-x-4 ">
            {detail?.preference?.habit?.split(" ").map((habit, index) => (
              <p key={index} className="">
                <span className="inline-block mr-2 text-purple-400">
                  <FontAwesomeIcon icon={faDotCircle} />
                </span>
                {habit}
              </p>
            ))}
          </div>
        </article>
        <article className="mx-[10%] p-3 flex gap-2">
          <Button onClick={onClose} outline>
            Close
          </Button>
          <Button onClick={createNewSpace}>
            {isLoading ? "sending request.." : "Add to Discuss Room"}
          </Button>
        </article>
      </Card>
    </>
  );
}
