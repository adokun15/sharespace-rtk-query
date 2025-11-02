import { useGetUserQuery } from "../../store/Slices/user";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CreatePostByAdmin from "./create";
import { useNavigate } from "react-router-dom";
import DataError from "../../components/DataError";

//Admin: Make Post;
export default function AdminPage() {
  const router = useNavigate();

  const {
    isError: user_isError,
    error: user_error,
    isLoading: user_loading,
    data: user,
    refetch: user_refetch,
  } = useGetUserQuery();

  if (user_loading) {
    return (
      <p className="my-[10vh] font-poppins text-center">
        Admin Page Loading...
      </p>
    );
  }

  if (user_isError) {
    return <DataError error={user_error} refetch={user_refetch} />;
  }

  //REDIRECT  IF ROLE IS USER TO PROFILE OR ELSE rEEOUTE HOME
  if (user?.role === "user") {
    router("/profile");
  }

  return (
    <Tabs className="space-y-5 w-full" defaultValue="users">
      <TabsList>
        <TabsTrigger value="users">All Users</TabsTrigger>
        <TabsTrigger value="posts">All posts</TabsTrigger>
        <TabsTrigger value="create">Create Post</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <CreatePostByAdmin />
      </TabsContent>
      <TabsContent value="users"></TabsContent>
      <TabsContent value="posts"></TabsContent>
    </Tabs>
  );
}
