import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Image from "../UI/Image";
import ProfilePic from "../image/202330014270ff.jpg";
import { faDotCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "../UI/Modal";
export default function RoommateDetail({ detail, onClose }) {
  const [discussSpaceOpen, setDiscussSpaceOpen] = useState(false);

  return (
    <>
      <Card elClass="relative overflow-visible  transition-all">
        <article className="flex gap-10 flex-wrap justify-center items-center">
          <div className=" border-[4px] shadow-purple-300 shadow border-solid border-purple-600 w-fit h-fit rounded-full flex place-content-center ">
            <Image imgSrc={ProfilePic} h={125} w={125} />
          </div>

          <div className="space-y-2">
            <p className="text-4xl">Daniel Amos</p>
            <p className="bg-gray-400  w-fit p-1 font-oswald font-bold text-xl">
              Score: <span className="bg-white p-1">80%</span>
            </p>

            <p className="  w-fit p-1 font-oswald font-bold text-xl">
              Rent Amount:
              <span className=" shadow-slate-400 mx-3 shadow bg-white p-1">
                150k(1/3)
              </span>
            </p>

            <p className="  w-fit p-1 font-oswald font-bold text-xl">
              Looking for two roommates :
              <span className=" shadow-slate-400 mx-3 shadow bg-white p-1">
                50k Each
              </span>
            </p>
          </div>
        </article>
        <article className="mx-[10%] p-3 my-5 rounded shadow shadow-slate-300 m-auto  ">
          <h4 className="font-oswald">Profile</h4>
          <div className="grid grid-cols-1 my-3 gap-2  md:grid-cols-2">
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                School*
              </p>
              <p>Kwasu</p>
            </div>

            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Department*
              </p>
              <p>Computer Science</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Level*
              </p>
              <p>100</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Age*
              </p>
              <p>18 years Old</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Religion
              </p>
              <p>Christian</p>
            </div>
            <div className="text-[16px]">
              <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                Preferenced Hostel Location
              </p>
              <p>Safari</p>
            </div>
          </div>
        </article>

        <article className="mx-[10%] p-3 rounded shadow shadow-slate-300 m-auto my-3">
          <h4 className="font-oswald">Hobbies / Habits</h4>
          <div className="my-2 text-[16px] flex flex-wrap space-x-4 ">
            <p className="">
              <span className="inline-block mr-2 text-purple-400">
                <FontAwesomeIcon icon={faDotCircle} />
              </span>
              Cooking
            </p>
            <p className="">
              <span className="inline-block mr-2 text-purple-400">
                <FontAwesomeIcon icon={faDotCircle} />
              </span>
              Reading Novel
            </p>
            <p className="">
              <span className="inline-block mr-2 text-purple-400">
                <FontAwesomeIcon icon={faDotCircle} />
              </span>
              BasketBall
            </p>
          </div>
        </article>
        <article className="mx-[10%] p-3 flex gap-2">
          <Button onClick={onClose} outline>
            Close
          </Button>
          <Button onClick={() => setDiscussSpaceOpen(true)}>
            Add to Discuss Room
          </Button>
        </article>
      </Card>
      {/* A MODAL FOR SPACE SELECTION AND ADDITION, WHICH CAN ONLY BE TRIGGER IN THIS COMPONENT! */}
      {discussSpaceOpen && (
        <Modal
          backdropCls=" z-[1000] h-[100vh] overflow-none"
          cls="z-[1000] overflow-y-scroll h-[100vh] right-0 top-0 bottom-0 md:w-3/5 lg:w-2/5 w-[90%] m-0 "
        >
          <button className="fixed md:left-[35%] lg:left-[55%] left-[3%] z-[1200] text-slate-300 text-4xl font-sans_serif font-[600]">
            x
          </button>
          <article className="flex py-2 flex-wrap justify-between my-2 border-b-2">
            <h1 className="text-4xl  ">Discuss Spaces</h1>
            <Button>
              <FontAwesomeIcon icon={faPlus} /> New Space
            </Button>
          </article>
          <h4 className="text-xl my-3">Select and add to a previous Spaces</h4>
          <article className="pb-5 space-y-5  divide-y-2 my-4  *:list-none">
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Dan</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  1
                </p>
              </div>
              <Button>Add</Button>
            </li>
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Dan</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  1
                </p>
              </div>
              <Button>Add</Button>
            </li>
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Dan</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  1
                </p>
              </div>
              <Button>Add</Button>
            </li>
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Dan</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  1
                </p>
              </div>
              <Button>Add</Button>
            </li>
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Eze_Ebuka & @Musaa</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  2
                </p>
              </div>
              <Button>Add</Button>
            </li>
            <li className="flex justify-between items-center py-3 rounded bg-white shadow px-2 shadow-slate-400">
              <div>
                <p>@Dan</p>
                <p className="text-[15px]">
                  <span className="bg-slate-400 w-fit p-1 rounded mx-2 text-white px-2">
                    Member
                  </span>
                  1
                </p>
              </div>
              <Button>Add</Button>
            </li>
          </article>
        </Modal>
      )}
    </>
  );
}
