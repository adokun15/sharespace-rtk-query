//import { ageHandler } from "../utils/TimeHandler";
import { useGetUserQuery } from "../store/Slices/user";
import { useMeetRoomateMutation } from "../store/Slices/matches";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useState } from "react";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
//import { saveMessagingDeviceToken } from "../firebase/Messaging";

export default function RoommateDetail({ roommate, onClose }) {
  const {
    data: user,
    isLoading: userLoading,
    refetch,
    isError,
    error,
    isFetching,
  } = useGetUserQuery();

  const [createProposal, { isLoading }] = useMeetRoomateMutation({
    skip: !user,
  });
  const [message, setMessage] = useState({ text: "", counter: 0 });

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
  const createNewMesageProposal = async (e) => {
    e.preventDefault();

    const info = {
      ...user,
      message: message?.text,
    };

    if (!user) return;

    await createProposal({
      info,
      roomieInfo,
    })
      .unwrap()
      .then((data) => {
        toast.success("Sent!", { description: data?.message });
        onClose();
      })
      .then(() => {
        //SAVE your Device then
        //Send notice To The owner of the post!
        // saveMessagingDeviceToken(user?.userId)
      })
      .catch((e) => {
        toast.error("Unable to send", { description: e?.message });
      });
  };

  if (userLoading || isFetching) {
    return <LoaderSpinner message="Loading..." />;
  }

  if (isError) {
    return (
      <div className="px-10">
        <DataError refetch={refetch} error={error} />;
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-visible min-h-[60vh] transition-all">
        <article className="flex gap-10 min-w-[40vw] flex-wrap justify-center items-center">
          <div>
            <Avatar className="w-32 h-32">
              <AvatarImage src={roommate?.photo} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <p className="text-4xl">{roommate?.name}</p>
            <p className="mt-2 text-muted">{roommate?.description}</p>
          </div>

          <article>
            <h1 className="font-medium font-poppins">Profile</h1>
            <div className="grid grid-cols-1 my-3 gap-3  gap-y-5 md:grid-cols-2">
              <div className="text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Department
                </p>
                {user?.isPro ? (
                  <p className="font-poppins">{roommate?.department}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
              <div className="text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Level
                </p>
                {user?.isPro ? (
                  <p className="font-poppins">{roommate?.level}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
              <div className=" space-y-4 text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Religion
                </p>
                {user?.isPro ? (
                  <p className="font-poppins">{roommate?.religion}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
            </div>
            {!user?.isPro && (
              <Button variant="primary">Upgrade to pro to reveal</Button>
            )}
          </article>
        </article>
      </div>
    </>
  );
}
