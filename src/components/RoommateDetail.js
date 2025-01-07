import { ageHandler } from "../utils/TimeHandler";
import { useGetUserQuery } from "../store/Slices/user";
import { useMeetRoomateMutation } from "../store/Slices/matches";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useState } from "react";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";

export default function RoommateDetail({
  roommate,
  loading,
  error: roomateError,
}) {
  const { data: user } = useGetUserQuery();

  const [message, setMessage] = useState({ text: "", counter: 0 });

  const [createProposal, { isLoading, error, isError }] =
    useMeetRoomateMutation();

  const messageHandler = (e) => {
    if (message.counter >= 100) return;
    setMessage((p) => ({
      text: e.target.value,
      counter: e.target.value?.split(" ")?.length,
    }));
  };
  //external user
  const roomieInfo = {
    id: roommate?.id,
    school: roommate?.school,
    religion: roommate?.religion,
    name: roommate?.name,
    location: roommate?.location,
    budget: +roommate?.rent / (+roommate?.numberOfRoommates + 1),
  };

  //Current User
  const createNewMesageProposal = async () => {
    const info = {
      ...user,
      message,
    };

    if (!user) return;
    await createProposal({
      info,
      roomieInfo,
    })
      .unwrap()
      .then((data) => console.log(data))
      .catch((e) => console.log(e?.message));
  };

  if (loading) {
    return <LoaderSpinner message="Loading..." />;
  }

  if (roomateError) {
    return <DataError error={roomateError} />;
  }

  return (
    <>
      <div className="relative overflow-visible min-h-[60vh] transition-all">
        <p>{error?.message || "Error: something went wrong"}</p>
        <article className="flex gap-10 min-w-[40vw] flex-wrap justify-center items-center">
          <div>
            <Avatar className="w-32 h-32">
              <AvatarImage src={roommate?.photo} />
              <AvatarFallback>NULL</AvatarFallback>
            </Avatar>
            <p className="text-4xl">{roommate?.name}</p>
            <p>
              {roommate?.rent}k. {roommate?.numberOfRoommates} Roommate (
              {+roommate?.rent / (+roommate?.numberOfRoommates + 1)}K Each)
            </p>
            <p>{roommate?.description}</p>
          </div>

          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Who is this?</TabsTrigger>
              <TabsTrigger value="proposal">Chat Up</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              {/* profile, preferences, hobbies and socials */}
              <article>
                <h1>Profile</h1>
                <div className="grid grid-cols-1 my-3 gap-2  md:grid-cols-2">
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      School*
                    </p>
                    <p>{roommate?.school}</p>
                  </div>

                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Department*
                    </p>
                    <p>{roommate?.department}</p>
                  </div>
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Level*
                    </p>
                    <p>{roommate?.level}</p>
                  </div>
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Age*
                    </p>
                    <p>{ageHandler(roommate?.age)} years old</p>
                  </div>
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Religion
                    </p>
                    <p>{roommate?.religion}</p>
                  </div>
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Preferenced Hostel Location
                    </p>
                    <p>{roommate?.location}</p>
                  </div>
                </div>
              </article>
            </TabsContent>

            <TabsContent value="proposal">
              <div className="space-y-3">
                <h2 className="text-xl">Send Daniel A message</h2>

                <form className="space-y-1">
                  <textarea
                    value={message.text}
                    onChange={messageHandler}
                    className="resize-none py-1 px-2 block  outline-none min-h-[15vh] ring-2 ring-purple-500 ring-offset-1  rounded"
                    placeholder="Enter a message"
                  ></textarea>
                  <p className="text-xs text-slate-400">
                    Less than 100 word: {message.counter} / 100
                  </p>
                  <Button
                    disabled={message.counter >= 100}
                    onClick={createNewMesageProposal}
                    className="w-full bg-purple-600 text-white rounded hover:bg-purple-300"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </article>
      </div>
    </>
  );
}
