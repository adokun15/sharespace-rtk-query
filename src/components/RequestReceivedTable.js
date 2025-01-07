import { MoreVertical, Settings2Icon } from "lucide-react";
//import { useRequestsFromListQuery } from "../store/Slices/matches";
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
import { Input } from "./ui/input";
import { useRequestsFromListQuery } from "../store/Slices/matches";
import DataError from "./DataError";

export default function RequestReceivedTable() {
  const {
    data: requests,
    isError,
    isFetching,
    error,
    isLoading,
  } = useRequestsFromListQuery();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <DataError error={error} />;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Proposals</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card elClass="overflow-x-auto w-full relative space-y-6">
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

        <table className="w-full text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 text-nowrap py-3">
                Roomie Id
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">message</th>
              <th className="px-6 py-3">Budget</th>
              <th className="px-6 py-3">Religion</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
                </td>
                <td className="px-6 py-4  hover:underline">View</td>
              </tr>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
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
                        <Button variant="outline">Accept Request</Button>
                        <Button variant="destructive">Declined Request</Button>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
                </td>
                <td className="px-6 py-4  hover:underline">View</td>
              </tr>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
                </td>
                <td className="px-6 py-4  hover:underline">View</td>
              </tr>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
                </td>
                <td className="px-6 py-4  hover:underline">View</td>
              </tr>
              <tr
                className={` border-l  
                     border-b `}
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Some123
                </th>
                <td
                  className={`px-6 text-nowrap py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Daniel Amos</p>
                </td>
                <td
                  className={`px-6  py-4 font-bold font-roboto tracking-wider`}
                >
                  <p className="line-clamp-1">
                    I saw your hostel and i like it alot you get because it is
                    dope
                  </p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>120k</p>
                </td>
                <td
                  className={`px-6 py-4 font-bold font-roboto tracking-wider`}
                >
                  <p>Christian</p>
                </td>
                <td className="px-6 py-4  hover:underline">View</td>
              </tr>
            </>
          </tbody>
        </table>
      </Card>
    </>
  );
}
