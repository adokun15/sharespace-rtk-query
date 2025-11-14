//import { ageHandler } from "../utils/TimeHandler";
import {
  useGetUserQuery,
  useReportStudentMutation,
} from "../store/Slices/user";
import { useMeetRoomateMutation } from "../store/Slices/matches";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";
import { Link } from "react-router-dom";
import { Loader2, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
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

  //Report This User

  const [report_student, { isLoading }] = useReportStudentMutation({
    skip: !user,
  });

  //Make sure there is no 'link'
  const [message, setMessage] = useState({ text: "", error: "" });

  //Current User
  const ReportUser = async (e) => {
    e.preventDefault();

    if (!user) return;

    const nameRegex = /^[a-zA-Z0-9\s-]+$/;

    if (!message?.text.trim()) {
      setMessage((p) => ({
        text: p.text,
        error: "You cannot submit an empty report",
      }));
      return;
    } else if (!nameRegex.test(message.text)) {
      setMessage((p) => ({
        text: p.text,
        error: "Invalid characters detected!",
      }));
      return;
    } else if (!isNaN(+message.text)) {
      setMessage((p) => ({
        text: p.text,
        error: "Report can not contain only number",
      }));
      return;
    }
    setMessage((p) => ({
      text: p.text,
      error: "",
    }));

    await report_student({
      studentId: roommate?.userId,
      email: user?.email,
      reason: message?.text,
    })
      .unwrap()
      .then((data) => {
        toast.success("Sent!", { description: data });
        onClose();
      })
      .catch((e) => {
        toast.error("Unable to send report", { description: e?.message });
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
        <article className="flex gap-10 items-start min-w-[40vw] flex-wrap justify-center ">
          <div className="space-y-3">
            <Avatar className="w-32 h-32">
              <AvatarImage src={roommate?.photo} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <p className="text-4xl">
              {roommate?.userId === "admin"
                ? "Posted by Admin"
                : roommate?.name}
            </p>
            <p className="mt-2 text-muted">{roommate?.description}</p>
            <Dialog>
              <DialogTrigger>
                <div className="flex items-start gap-3 ">
                  <p className="text-[16px] block underline">Report User</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Report</DialogTitle>
                <p>Add a reason why you want to report this user?</p>
                {message?.error && (
                  <p className="text-xs text-destructive">{message?.error}</p>
                )}
                <Input
                  placeholder="The Reason"
                  onChange={(e) => {
                    setMessage((p) => ({
                      text: e?.target?.value,
                      error: p.error,
                    }));
                  }}
                />
                <Button onClick={ReportUser} className="rounded-xl w-fit">
                  {isLoading ? "..." : "Submit"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <article className="pb-8">
            <div className="flex justify-between items-center">
              <h1 className="font-medium font-poppins">Profile</h1>
              {!user?.isPro && user?.role !== "admin" && (
                <Button
                  variant="link"
                  className="text-primary w-fit rounded-xl underline"
                >
                  <Link to="/profile">Upgrade to pro</Link>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 my-3 gap-3  gap-y-5 md:grid-cols-2">
              <div className="text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Department
                </p>
                {user?.isPro || user?.role === "admin" ? (
                  <p className="font-poppins">{roommate?.department}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
              <div className="text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Level
                </p>
                {user?.isPro || user?.role === "admin" ? (
                  <p className="font-poppins">{roommate?.level}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
              <div className=" space-y-4 text-[16px]">
                <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                  Religion
                </p>
                {user?.isPro || user?.role === "admin" ? (
                  <p className="font-poppins">{roommate?.religion}</p>
                ) : (
                  <span>****</span>
                )}
              </div>
            </div>

            <h1 className="font-medium mt-6 font-poppins">Apartment Media</h1>

            {(!roommate?.room_video ||
              typeof roommate?.room_video !== "string") && <p>Not available</p>}

            {roommate?.room_video && (
              <>
                <div class="embed-wrap">
                  <iframe
                    id="cbIframe"
                    src={`${roommate?.room_video}`}
                    title="Catbox embed"
                    width="400"
                    height="350"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                    sandbox="allow-same-origin allow-scripts"
                  ></iframe>
                </div>

                <noscript>
                  <img src={`${roommate?.room_video}`} alt="Catbox fallback" />
                </noscript>
              </>
            )}
          </article>
        </article>
      </div>
    </>
  );
}
