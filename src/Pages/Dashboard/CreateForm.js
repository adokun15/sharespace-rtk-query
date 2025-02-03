import { useGetUserQuery } from "../../store/Slices/user";
import AddPreferences from "../../components/AddPreferences";
import Card from "../../UI/Card";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";
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
      <Card className="space-y-8">
        <h2>
          <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
          <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
        </h2>
        <article>
          <div>
            <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
          </div>
        </article>
      </Card>
    );
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <h1 className="text-4xl text-center mb-4 text-bold font-sans_serif">
        Create Post
      </h1>
      {user?.targetType && (
        <p className="mb-3">
          Get more people to reach you. By posting your{" "}
          {user?.targetType === "spacer"
            ? "Your preferences"
            : "about your hostel"}
        </p>
      )}
      <AddPreferences user={user} />
    </div>
  );
}
