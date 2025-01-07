import { MoreVertical, Settings2Icon } from "lucide-react";
import { useRequestsToListQuery } from "../store/Slices/matches";
import Card from "../UI/Card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import DataError from "./DataError";

export default function RequestSentTable() {
  const {
    data: requests,
    isError,
    isFetching,
    error,
    isLoading,
  } = useRequestsToListQuery();

  if (isLoading || isFetching) {
    return <p>Loading skeleton...</p>;
  }

  if (isError) {
    return <DataError error={error} />;
  }
  return (
    <Card elClass="overflow-x-auto w-full relative space-y-6">
      <div className="flex justify-between items-center px-4">
        <article className="space-y-2">
          <h2 className="text-2xl font-sans_serif font-semibold">
            Applied Roommate Post
          </h2>
          <p className="text-slate-400 font-sans_serif">
            List of students that you want to roommate with{" "}
          </p>
        </article>
        <Button>
          <Settings2Icon />
          <span>Filter</span>
        </Button>
      </div>

      <table className="w-full text-gray-500  text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 text-nowrap py-3">
              Roomie Id
            </th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">message</th>
            <th className="px-6 py-3">Status</th>
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
              <td className={`px-6  py-4 font-bold font-roboto tracking-wider`}>
                <p className="line-clamp-1">
                  I saw your hostel and i like it alot you get because it is
                  dope
                </p>
              </td>
              <td className={`px-6 py-4 font-bold font-roboto tracking-wider`}>
                <p>Abandoned</p>
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
              <td className={`px-6  py-4 font-bold font-roboto tracking-wider`}>
                <p className="line-clamp-1">
                  I saw your hostel and i like it alot you get because it is
                  dope
                </p>
              </td>
              <td className={`px-6 py-4 font-bold font-roboto tracking-wider`}>
                <p>Abandoned</p>
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
              <td className={`px-6  py-4 font-bold font-roboto tracking-wider`}>
                <p className="line-clamp-1">
                  I saw your hostel and i like it alot you get because it is
                  dope
                </p>
              </td>
              <td className={`px-6 py-4 font-bold font-roboto tracking-wider`}>
                <p>Abandoned</p>
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
              <td className={`px-6  py-4 font-bold font-roboto tracking-wider`}>
                <p className="line-clamp-1">
                  I saw your hostel and i like it alot you get because it is
                  dope
                </p>
              </td>
              <td className={`px-6 py-4 font-roboto tracking-wider`}>
                <Badge>Accepted</Badge>
              </td>
              <td className="px-6 py-4  hover:underline">
                <MoreVertical />
              </td>
            </tr>
          </>
        </tbody>
      </table>

      {/*requests?.length === 0 && (
        <p>No Request sent Yet. Create A Roomate Request Post</p>
      )*/}
    </Card>
  );
}
