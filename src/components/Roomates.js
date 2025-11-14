import {
  useReportRoommatePostMutation,
  useRoomateSpaceQuery,
} from "../store/Slices/matches";
import Card from "../UI/Card";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent } from "../components/ui/sheet";
import RoommateDetail from "./RoommateDetail";
import { useRef, useState } from "react";
import {
  //BookOpen,
  //CheckCheck,
  ContactRound,
  Info,
  Loader2,
  MoreVertical,
  ReceiptText,
  Settings2Icon,
  //Share,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import DataError from "./DataError";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./ui/dialog";
import { Link } from "react-router-dom";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { lIVE_CLIENT_WEB_URL } from "../lib/utils";

const Roomates = ({ user }) => {
  const reason = useRef();

  const [filterRoomate, setFilteredResult] = useState("all");

  const { error, roommates, isLoading, isError, refetch, isFetching } =
    useRoomateSpaceQuery(null, {
      refetchOnMountOrArgChange: true,
      selectFromResult: (res) => {
        const { data, ...others } = res;
        let roommates_list = data;

        if (filterRoomate === "urgent") {
          const expires = roommates_list?.map((r) => {
            const d = new Date(r?.timePosted).getTime();
            return { ...r, exp: d };
          });
          //oldest
          roommates_list = expires?.sort((a, b) => a?.exp - b?.exp);
        }

        if (filterRoomate === "recent") {
          const expires = roommates_list?.map((r) => {
            const d = new Date(r?.timePosted).getTime();
            return { ...r, exp: d };
          });

          roommates_list = expires?.sort((a, b) => b?.exp - a?.exp);
        }

        if (filterRoomate === "1") {
          roommates_list = roommates_list?.filter(
            (post) => post?.gender === "1"
          );
        }

        if (filterRoomate === "0") {
          roommates_list = roommates_list?.filter(
            (post) => post?.gender === "0"
          );
        }

        //Filter if post is disable/reported
        return {
          ...others,
          //Remove post that has been reported
          roommates:
            roommates_list &&
            roommates_list?.filter(
              (post) => !post?.reported || !post?.disabled
            ),
        };
      },
    });

  const [reportRoomatePost, { isLoading: isReporting, error: reportEror }] =
    useReportRoommatePostMutation();

  const [roommate, setRoommate] = useState(null);

  const [notLoggin, setLoginModal] = useState(false);

  const [openReportDialog, setReportDialog] = useState(false);
  if (isLoading || isFetching) {
    //Skeleton
    return (
      <>
        <div className="flex my-3 gap-2 px-4">
          <Skeleton className="md:w-48 w-28 h-18  p-3" />
          <Skeleton className=" grow h-18 p-3 py-5" />
        </div>
        <div className="md:grid *:p-3  *:min-h-[4rem] px-10 grid-cols-3 block  gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} className="px-5 overflow-hidden space-y-6 w-fit ">
              <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
              <Skeleton className="block h-[13vh] my-4 min-w-[300px]  rounded" />
              <div className="flex gap-2">
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (isError) {
    return <DataError refetch={refetch} error={error} />;
  }

  const oneRoomateDetail = (id) => {
    if (user) {
      const r = roommates?.find((r) => r.id === id);
      setRoommate(r);
      setLoginModal("open_sheet");
    } else {
      setLoginModal("open_dialog");
    }
  };

  const reportSinglePost = (id) => {
    if (!user) {
      setLoginModal("open_dialog");
      return;
    }

    if (reason.current.value === "") return;
    reportRoomatePost({
      postId: id,
      reason: reason.current.value,
      email: user?.email,
    })
      .unwrap()
      .then((data) => {
        //alert User
        toast.success(data?.message || "Report sent!");
        //Force Refetch
        setTimeout(() => {
          refetch();
        }, 1500);
      })
      .catch((e) => {
        toast.success(e?.status || "Not Sent!", {
          description: <p>{e?.message} </p>,
        });
      });
  };

  const SharePost = async (roomate) => {
    const text = `
    ${roomate?.description}
   
    Apartment Video
    ${roomate?.room_video || "Not available"}
    
    Contact 
    ${roomate?.contact}

    See more here : ${lIVE_CLIENT_WEB_URL}
    `;
    const title = "Seeking Roomate";

    try {
      await navigator.share({
        title,
        url: `${lIVE_CLIENT_WEB_URL}?roomie=${roomate?.id}`,
        text,
      });
    } catch (error) {
      const encoded = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    }
  };

  const gotoWhatapps = (contact) => {
    if (user) {
      window.open(contact, "_blank");
    } else {
      setLoginModal("open_dialog");
    }
  };
  return (
    <Sheet
      open={notLoggin === "open_sheet"}
      onOpenChange={() => setLoginModal("do-nothing")}
    >
      <article className="flex gap-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="font-mono">
              Filter
              <Settings2Icon />{" "}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {!user && (
              <div>
                <h2>Gender</h2>
                <ul>
                  <Button
                    variant="ghost"
                    className={`${filterRoomate === "all" && "text-primary"}`}
                    onClick={() => setFilteredResult("all")}
                  >
                    Any
                  </Button>
                  <Button
                    variant="ghost"
                    className={`${filterRoomate === "1" && "text-primary"}`}
                    onClick={() => setFilteredResult("1")}
                  >
                    Guy
                  </Button>
                  <Button
                    variant="ghost"
                    className={`${filterRoomate === "0" && "text-primary"}`}
                    onClick={() => setFilteredResult("0")}
                  >
                    Lady
                  </Button>
                </ul>
              </div>
            )}
            <div>
              <h2>Base on Time</h2>
              <ul>
                <Button
                  variant="ghost"
                  className={`${filterRoomate === "urgent" && "text-primary"}`}
                  onClick={() => setFilteredResult("urgent")}
                >
                  Urgent
                </Button>
                <Button
                  variant="ghost"
                  className={`${filterRoomate === "recent" && "text-primary"}`}
                  onClick={() => setFilteredResult("recent")}
                >
                  Recently added
                </Button>
              </ul>
            </div>
          </PopoverContent>
        </Popover>

        {/* <div className="grow">
          <Input placeholder="Search by School Name" />
        </div>*/}
      </article>

      <Dialog
        open={notLoggin === "open_dialog"}
        onOpenChange={() => setLoginModal("do-nothing")}
      >
        <DialogContent>
          <DialogTitle className="text-center font-poppins ">
            Kindly Login To Proceed
          </DialogTitle>
          <Button asChild>
            <Link to="/auth">Login</Link>
          </Button>
          <DialogClose className="text-primary">Close</DialogClose>
        </DialogContent>
      </Dialog>
      {(!roommates || roommates?.length === 0) && (
        <p className="text-center font-poppins text-2xl">Roomates not Found!</p>
      )}

      <ul className="md:grid grid-cols-3 block  gap-5">
        {roommates &&
          roommates?.map((roomate) => (
            <>
              <Dialog
                open={openReportDialog}
                onOpenChange={() => setReportDialog((p) => !p)}
              >
                <DialogContent>
                  <DialogTitle className="text-center font-poppins ">
                    Report post
                  </DialogTitle>
                  <form className="space-y-4 font-poppins">
                    <p>Why do you want to report this post?</p>
                    <p className="text-destructive text-xs ">
                      {reportEror && reportError?.message}
                    </p>
                    <Input
                      ref={reason}
                      className="placeholder:text-muted"
                      placeholder="Does it is looks suspicious?!"
                    />
                    <Button
                      className="w-fit"
                      onClick={() => reportSinglePost(roomate.id)}
                      type="button"
                      variant="destructive"
                    >
                      {isReporting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Report"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Card elClass="px-4 py-1 mb-1 shadow-gray-400 rounded">
                <div className=" items-center flex justify-between">
                  <Popover>
                    <Badge
                      className="rounded-full text-xs capitalize 
                    font-sans_serif bg-transparent  
                    hover:bg-transparent
                    text-primary tracking-wide font-semibold"
                    >
                      {roomate?.school_short}
                      <PopoverTrigger asChild>
                        <Info size={16} className="ml-2" />
                      </PopoverTrigger>
                    </Badge>
                    <PopoverContent className="w-fit text-xs rounded tracking-wide font-poppins">
                      <p>{roomate?.school}</p>
                    </PopoverContent>
                  </Popover>

                  <div>
                    {roomate?.userId !== "admin" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreVertical />
                        </PopoverTrigger>
                        <PopoverContent className="w-fit rounded tracking-wide font-poppins">
                          <Button
                            onClick={() => setReportDialog((p) => !p)}
                            variant="ghost"
                          >
                            Report
                          </Button>

                          <Button
                            onClick={() => SharePost(roomate)}
                            variant="ghost"
                          >
                            Share
                          </Button>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>

                <article className="h-[120px] bg-slate-50  line-clamp-6 font-poppins px-2 tracking-wide my-3">
                  {roomate?.description}
                </article>

                <div className=" my-4 px-1 space-y-1 ">
                  <div className="flex-wrap flex space-y-1  mt-2 text-slate-600 font-bold items-center gap-2 ">
                    <Badge
                      variant="muted"
                      className="rounded-full text-[12px] font-sans_serif tracking-wide font-semibold"
                    >
                      <ContactRound
                        className="text-purple-500 mx-1"
                        width={20}
                        height={20}
                      />
                      {user?.userId ? (
                        roomate?.gender === "1" ? (
                          "Male"
                        ) : (
                          "Lady"
                        )
                      ) : (
                        <span className="">
                          {roomate?.numberOfRoommates} roommate
                          {roomate?.numberOfRoommates > 1 ? "s" : ""}{" "}
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>

                {/*<p>{roomate?.noOfProposals || 0} reached out</p>
                <div className="flex justify-between  rounded py-2 px-3 items-center">
                  <Button
                    className=" rounded"
                    onClick={() => oneRoomateDetail(roomate?.id)}
                    >
                    <SheetTrigger>View</SheetTrigger>
                    </Button>
                    <p className="text-xl font-semibold text-slate-400 font-serif tracking-wide">
                    {roomate?.name?.split(" ")[0]}
                    </p>
                    </div>*/}
                <div className="flex justify-between gap-1">
                  <Button
                    className="w-fit px-4 text-[16px]  rounded font-[300]
                  tracking-wide flex  font-sans_serif"
                    variant="primary"
                    onClick={() => gotoWhatapps(roomate?.contact)}
                  >
                    Chat
                    <ReceiptText />
                  </Button>
                  <Popover>
                    <PopoverTrigger className="" asChild>
                      <Button
                        onClick={() => oneRoomateDetail(roomate?.id)}
                        className="line-clamp-4 font-roboto text-slate-600 text-xs tracking-wide"
                        variant="muted"
                      >
                        {roomate?.name}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <ul>
                        <li>
                          <Button
                            variant="ghost"
                            onClick={() => setReportDialog(true)}
                          >
                            Report
                          </Button>
                        </li>
                        {/*<li>Share Link</li>*/}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </Card>
            </>
          ))}
      </ul>
      <SheetContent side="bottom" className="min-h-[40vh]">
        <RoommateDetail
          onClose={() => setLoginModal("do-nothing")}
          roommate={roommate}
        />
      </SheetContent>
    </Sheet>
  );
};

export default Roomates;
