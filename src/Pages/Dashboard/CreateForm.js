//I need to know what kind user is this;
import { useGetUserQuery } from "../../store/Slices/user";
import AddPreferences from "../../components/AddPreferences";
import Card from "../../UI/Card";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";
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
    return <LoaderSpinner message="loading" />;
  }
  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  return (
    <Card>
      <h1 className="text-4xl text-center mb-4 text-bold font-sans_serif">
        Create Post
      </h1>
      <p className="mb-3">
        Get more people to chat you. By posting your preferences
      </p>
      <AddPreferences user={user} />
    </Card>
  );
}
