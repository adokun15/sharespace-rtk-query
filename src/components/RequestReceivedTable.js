import { Loader2, MoreVertical, Settings2Icon } from "lucide-react";
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

export default function RequestReceivedTable() {
  const {
    data: requests,
    isError,
    isFetching,
    error,
    isLoading,
  } = useRequestsFromListQuery();

  const [sendResponse, { isLoading: responding }] =
    useRespondToProposalMutation();
  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <DataError error={error} />;
  }
  /*
department
email
level
message
name
photo
religion
requestId
school
*/

  const respondToRequest = async (type, info) => {
    console.log(type);
    console.log(info);
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
            <h2 className="text-2xl font-sans_serif font-semibold">
              Proposals{" "}
            </h2>
            <p className="text-slate-400 font-sans_serif">
              People that reached out to you. Accepted Proposal will be added to
              Chat, Declined proposal will be removed from this list{" "}
            </p>
          </article>
          <Popover>
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
                Roomie Id
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
                    {roomie?.requestId}
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
                            <Link to="123">View Profile</Link>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={async () => {
                              // decline
                              await respondToRequest("decline", roomie);
                            }}
                          >
                            Declined Request
                          </Button>
                          <Button
                            variant=""
                            onClick={async () => {
                              // accept
                              await respondToRequest("accept", roomie);
                            }}
                          >
                            Accept Request
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
