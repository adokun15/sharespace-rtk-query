import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  useDeleteChatMutation,
  useReportChatMutation,
} from "../store/Slices/matches";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Loader2, MoreVertical } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useGetUserQuery } from "../store/Slices/user";
import { toast } from "sonner";

export default function ChatNavigator({ users, spaceId, chatDisabled }) {
  //Upload photo and leave session
  const {
    error,
    isError,
    data: currentUser,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserQuery();

  const oneUserLeft = users?.length === 1;

  const [openReportDialog, setReportDialog] = useState(false);
  const [controlledLeaveModal, setLeaveModal] = useState(false);

  const reason_report = useRef();
  const reason_chat = useRef();

  const reRoute = useNavigate();

  const [leaveSession, { isLoading: isLeaving }] = useDeleteChatMutation();
  const [reportchat, { isLoading: isReporting }] = useReportChatMutation();

  if (isError) {
    const messageAction =
      error?.statusCode === 401 ? reRoute("/auth") : refetch();
    const message = error?.statusCode === 401 ? "re-login here" : "reload";

    return (
      <div className="*:inline">
        <p>{error?.message}</p>
        <Button variant="link" onClick={messageAction}>
          {message}
        </Button>
      </div>
    );
  }

  if (!currentUser || isFetching || isLoading) return;

  const other_user_id = users?.filter((id) => id !== currentUser?.userId);
  const reportHandler = async () => {
    //Check if reason is valid
    if (!reason_report.current.value) return;

    await reportchat({
      spaceId,
      reason: reason_report?.current?.value,
      email: currentUser?.email,
    })
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        reRoute("/space");
      })
      .catch((e) => {
        toast.error(e?.message);
      });
  };

  const handleLeaveSession = async () => {
    //Check if reason is valid!
    if (!oneUserLeft && !reason_chat?.current?.value) {
      toast.warning("Reason space is empty!");
    }

    const data = {
      requestId: other_user_id,
      spaceId,
      name: currentUser?.name,
    };

    data.reason = !oneUserLeft ? reason_chat?.current?.value : "Deleting!";

    await leaveSession(data)
      .unwrap()
      .then((res) => {
        //Close REPORT MODAL
        setLeaveModal(false);
        //rEDIRECT TO '/space'
        reRoute("/space");
        //alert User
        toast.success(res?.message);
      })
      .catch((e) => toast.error(e?.message));
  };

  //const uploadPhotoToSpace = async()=>{}
  return (
    <>
      <Dialog
        open={openReportDialog}
        onOpenChange={() => setReportDialog((p) => !p)}
      >
        <DialogContent>
          <DialogTitle className="text-center font-poppins ">
            Report Chat
          </DialogTitle>
          <form>
            <p>Why do you want to report this chat?</p>
            <textarea
              placeholder="Enter a brief message..."
              ref={reason_report}
              className="resize-none font-poppins tracking-wide flex 
                   text-base h-9 w-full rounded-md 
                   border border-input bg-transparent px-3 
                     py-1 shadow-sm transition-colors  placeholder:text-muted-foreground
                     focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-ring md:text-sm min-h-32 "
            ></textarea>

            <Button
              onClick={async () => await reportHandler()}
              type="button"
              variant="destructive"
            >
              {isReporting ? <Loader2 className="animate-spin" /> : "Report"}
            </Button>
          </form>
          <DialogClose asChild className="text-primary">
            <Button variant="link">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Sheet
        open={controlledLeaveModal}
        onOpenChange={() => setLeaveModal((p) => !p)}
      >
        <nav className="py-2 my-1 relative flex justify-between">
          <div className="inline-flex w-1/2 items-center space-x-3">
            <Link to="/space">
              <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
            </Link>

            {/*
        <div className="flex">
          {users[0]?.photourl && (
            <Image h={45} w={45} imgSrc={users[0].photourl} />
          )}
          {users[1]?.photourl && (
            <Image h={45} w={45} imgSrc={users[1].photourl} />
          )}
        </div>
        */}
          </div>

          <div className={`inline-block transition-all space-y-2 `}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <span>
                    <MoreVertical />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit rounded">
                <ul className="font-poppins *:block text-xl">
                  {/*}  <Button disabled={true} variant="ghost">
                  Send Photo (Coming soon)
                  </Button>*/}

                  {(!oneUserLeft || !chatDisabled) && (
                    <Button
                      variant="ghost"
                      onClick={() => setReportDialog(true)}
                    >
                      Report
                    </Button>
                  )}

                  {!oneUserLeft || !chatDisabled ? (
                    <SheetTrigger asChild>
                      <Button variant="ghost">Leave Chat</Button>
                    </SheetTrigger>
                  ) : (
                    <Button onClick={handleLeaveSession} variant="ghost">
                      {isLeaving ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Delete Chat"
                      )}
                    </Button>
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          <SheetContent side="bottom" className="space-y-4">
            <SheetTitle>Leave Chat</SheetTitle>
            <textarea
              placeholder="Why do want to leave?"
              ref={reason_chat}
              className="resize-none font-poppins tracking-wide flex 
                   text-base h-9 w-full rounded-md 
                   border border-input bg-transparent px-3 
                     py-1 shadow-sm transition-colors  placeholder:text-muted-foreground
                     focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-ring md:text-sm min-h-32 "
            ></textarea>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLeaveSession}
            >
              {isLeaving ? (
                <Loader2 className="animate-spin" />
              ) : (
                " Yes, I want to leave"
              )}
            </Button>
          </SheetContent>
        </nav>
      </Sheet>
    </>
  );
}
