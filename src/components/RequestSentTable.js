import {
  ChevronRight,
  Loader2,
  MoreVertical,
  Settings2Icon,
} from "lucide-react";
import {
  useRequestsToListQuery,
  useWithdrawProposalMutation,
} from "../store/Slices/matches";
import Card from "../UI/Card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import DataError from "./DataError";
import LoaderSpinner from "./LoaderSpinner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function RequestSentTable() {
  const {
    data: requests,
    isError,
    isFetching,
    error,
    refetch,
    isLoading,
  } = useRequestsToListQuery();

  const [withdrawAttempt, { isLoading: isRemoving }] =
    useWithdrawProposalMutation();

  if (isLoading || isFetching) {
    return <LoaderSpinner message="loading ;)" />;
  }

  if (isError) {
    return <DataError refetch={refetch} error={error} />;
  }

  //Remobve from both place: Roomie Proposal and your attempt
  const withdrawFromProposal = async (attemptId) => {
    await withdrawAttempt(attemptId)
      .unwrap()
      .then((data) => {
        toast.success(data);
      })
      .catch((e) => {
        toast.error(e?.message);
      });
  };

  return (
    <Card elClass="font-poppins w-full overflow-x-auto relative space-y-6">
      <div className="flex justify-between items-center px-4">
        <article className="space-y-2">
          <h2 className="text-2xl font-sans_serif font-semibold">
            Applied Roommate Post
          </h2>
          <p className="text-slate-400 font-sans_serif">
            List of students that you sent a roommate request to!
          </p>
        </article>
        {/*
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Settings2Icon />
              <span>Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Status</h2>

            <ul>
              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                Any
              </Button>

              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                pending
              </Button>

              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                Accepted
              </Button>

              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                Declined
              </Button>
            </ul>

            <h2>Religion</h2>
            <ul>
              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                Christain
              </Button>

              <Button
                variant="ghost"
                //               className={`${filterRoomate === "1" && "text-primary"}`}
                //                 onClick={() => setFilteredResult("1")}
              >
                Muslim
              </Button>
            </ul>

            <h2>Budget</h2>
            <div>
              <Slider />
            </div>
          </PopoverContent>
        </Popover>
*/}
      </div>
      {isRemoving && (
        <p>
          <Loader2 className="animate-spin" />
        </p>
      )}

      <table className="overflow-x-auto  min-w-full text-gray-500  text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 text-nowrap py-3">
              User{" "}
            </th>
            <th className="px-6 py-3">message</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <>
            {requests &&
              requests?.map((roomie) => (
                <tr className={`border-l border-b `}>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <p>{roomie?.receiver?.name}</p>
                  </th>
                  <td
                    className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                  >
                    <p className="line-clamp-1">{roomie?.message}</p>
                  </td>
                  <td className={`px-6 py-4 font-roboto tracking-wider`}>
                    <Badge
                      className={`   capitalize
                        text-primary rounded-full
                       hover:text-white
                        bg-primary/20 
                        ${
                          roomie?.status.toLowerCase() === "declined" &&
                          "bg-destructive/20 text-destructive hover:bg-destructive"
                        }
                        ${
                          roomie?.status.toLowerCase() === "pending" &&
                          "bg-yellow-300 text-yellow-600 hover:bg-yellow-500"
                        }
                        
                        `}
                    >
                      {roomie?.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 hover:underline">
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit">
                        <>
                          {roomie?.status === "pending" && (
                            <Button
                              variant="ghost"
                              disabled={isRemoving}
                              onClick={async () =>
                                await withdrawFromProposal(
                                  roomie?.receiver?.requestId
                                )
                              }
                            >
                              Withdraw request
                            </Button>
                          )}

                          {roomie?.status === "accepted" && (
                            <article className="font-poppins">
                              <p>{roomie?.message}</p>
                              <p>Religion : {roomie?.receiver?.religion}</p>
                              <p>
                                You will pay NGN{roomie?.room?.budget}K to
                                complete the rent.
                              </p>
                              <p>Location: {roomie?.room?.location}</p>
                              <p>School : {roomie?.receiver?.school}</p>
                              <Button variant="link">
                                <Link to={`/space`}>
                                  View chats <ChevronRight className="inline" />
                                </Link>
                              </Button>
                            </article>
                          )}

                          {roomie?.status === "declined" && (
                            <Button disabled={true}>Remove Request</Button>
                          )}
                        </>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
          </>
        </tbody>
      </table>

      {/*requests?.length === 0 && (
        <p>No Request sent Yet. Create A Roomate Request Post</p>
      )*/}
    </Card>
  );
}
