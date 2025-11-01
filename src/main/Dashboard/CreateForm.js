import { useGetUserQuery } from "../../store/Slices/user";
import AddPreferences from "../../components/AddPreferences";
import DataError from "../../components/DataError";
import { Skeleton } from "../../components/ui/skeleton";

//Add data, then Video
export default function CreateRoomieSpaceForm() {
  const {
    isError,
    error,
    data: user,
    isLoading,
    refetch,
    isFetching,
  } = useGetUserQuery();

  if (isLoading || isFetching) {
    return (
      <div className="space-y-10">
        <div className="">
          <Skeleton className="text-center rounded mx-auto w-44 h-12 p-3 hover:bg-purple-300/15" />
        </div>

        <Skeleton className="text-3xl h-5 p-3 w-4/5 font-medium text-center font-roboto mt-4" />

        <div className="mt-5 even:mx-auto odd:mx-0 space-y-3">
          <Skeleton className="text-3xl w-1/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="text-3xl w-2/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="text-3xl w-1/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="font-oswald w-2/5 p-3 text-slate-400 text-center my-1" />
          <Skeleton className="font-oswald p-3 w-1/5 text-slate-600 text-center my-1" />
          <Skeleton className="font-oswald p-3 w-2/5 text-slate-600 text-center my-1" />
        </div>
        <div>
          <Skeleton className="rounded w-28 h-12 p-3 hover:bg-purple-300/15" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  return (
    <div className=" max-w-2xl mx-auto p-3  min-h-40 mt-30  ">
      <h1 className="text-3xl border-b-primary border-b-2 w-fit  text-bold font-sans_serif">
        Create Post
      </h1>
      <p className="mb-8 text-slate-500">
        Get more visitor in your contacts asap, this will take less than a
        minute
      </p>
      <AddPreferences user={user} />
    </div>
  );
}
