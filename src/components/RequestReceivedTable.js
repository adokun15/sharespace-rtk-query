import { ArrowRight, Loader2, MoreVertical } from "lucide-react";
import Card from "../UI/Card";
import { Button } from "./ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link } from "react-router-dom";
import {
  useRequestsFromListQuery,
  useRespondToProposalMutation,
} from "../store/Slices/matches";
import DataError from "./DataError";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export default function RequestReceivedTable() {
  const {
    data: requests,
    isError,
    isFetching,
    refetch,
    error,
    isLoading,
  } = useRequestsFromListQuery();

  const [sendResponse, { isLoading: responding }] =
    useRespondToProposalMutation();

  if (isLoading || isFetching) {
    return (
      <Card elClass="w-full relative overflow-auto  space-y-6">
        <article className="space-y-2">
          <Skeleton className="h-4 w-2/5 m-3 rounded-xl p-3 py-1" />
          <Skeleton className="h-4 m-3 w-4/5 rounded-xl p-3 py-1 " />
        </article>

        <table className="overflow-x-scroll md:w-full w-[600px] text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 text-nowrap py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>
              <th className="px-6 py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>
              <th className="px-6 py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>
              <th className="px-6 py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>{" "}
              <th className="px-6 py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>
              <th className="px-6 py-3">
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index} className={` border-l border-b `}>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </th>
                  <td
                    className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                  >
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </td>
                  <td
                    className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                  >
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </td>
                  <td
                    className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                  >
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </td>
                  <td
                    className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                  >
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </td>
                  <td className="px-6 py-4  hover:underline">
                    <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </Card>
    );
  }
  if (isError) {
    <DataError error={error} refetch={refetch} />;
  }

  const respondToRequest = async (type, info) => {
    await sendResponse({
      reply: type,
      request: {
        requestId: info?.requestId,
        photo: info?.photo,
        name: info?.name,
        // age: info?.age,
        //Add more Info to this later --
      },
    })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => [console.log(e)]);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Proposals</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card elClass="w-full relative space-y-6">
        <div className="flex justify-between items-center px-4">
          <article className="space-y-2">
            <h2 className="text-2xl font-sans_serif font-bold">Proposals</h2>
            <p className="text-slate-400 font-poppins">
              Accepted proposal will be added to chat list, Declined proposal
              will be removed from this list{" "}
            </p>
          </article>
          {/*<Popover>
            <PopoverTrigger>
              <Button>
                <Settings2Icon />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <p>Religion</p>
              <p>Level</p>
            </PopoverContent>
          </Popover>
       */}
        </div>

        {responding && (
          <p>
            <Loader2 className="animate-spin my-2" />
          </p>
        )}

        <table className="overflow-x-auto w-full text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 text-nowrap py-3">
                Roomie
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">message</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Religion</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <>
              {requests?.map((roomie) => (
                <tr
                  className={` border-l  
                  border-b `}
                >
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Avatar>
                      <AvatarImage src={roomie?.photo} />
                      <AvatarFallback>
                        {roomie?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </th>
                  <td
                    className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                  >
                    <p>{roomie?.name}</p>
                  </td>
                  <td
                    className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                  >
                    <p className="line-clamp-1">{roomie?.message}</p>
                  </td>
                  <td
                    className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                  >
                    <p>{roomie?.level}</p>
                  </td>
                  <td
                    className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                  >
                    <p>{roomie?.religion}</p>
                  </td>
                  <td className="px-6 py-4  hover:underline">
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical />
                      </PopoverTrigger>
                      <PopoverContent>
                        <ul className="*:block">
                          <Button variant="ghost" asChild>
                            <Link to={roomie?.requestId}>View Profile</Link>
                          </Button>

                          <Button
                            variant="ghost"
                            className="*:inline gap-3 text-secondary "
                            onClick={async () => {
                              // accept
                              await respondToRequest("accept", roomie);
                            }}
                          >
                            <span>Accept Request</span>
                            <ArrowRight className="text-primary rounded-full ml-4 animate-pulse" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-destructive"
                            onClick={async () => {
                              // decline
                              await respondToRequest("decline", roomie);
                            }}
                          >
                            Declined Request
                          </Button>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </Card>
    </>
  );
}
