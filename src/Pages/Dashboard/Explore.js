import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Roomates from "../../components/Roomates";
import RequestSentTable from "../../components/RequestSentTable";
import UserRoommateData from "../../components/User/Preference";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import InviteModal from "../../components/InviteModal";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

//Depends on request claim what we be recommended
const ExplorePage = () => {
  const {
    data: user,
    error,
    isLoading,
    isFetching,
    refetch: loadUser,
  } = useIsLoggedInQuery();

  const token = localStorage.getItem("sharespace_token");

  const reRoute = useNavigate();

  const [roomie_param] = useSearchParams();

  const [isRoomieInviteOpen, setRoomieInviteOpen] = useState(false);

  //once mount open modal
  useEffect(() => {
    if (roomie_param.get("roomie")) {
      setRoomieInviteOpen((p) => !p);
    }
  }, [roomie_param]);

  const handleReRoute = () => {
    if (error?.status === 500) {
      toast.error("Something went Wrong", {
        action: {
          label: "Reload",
          onClick: () => loadUser(),
        },
      });
      return;
    }

    if (!user || error?.status === 401) {
      toast.warning("Login or Create an account to proceed", {
        action: {
          label: "login",
          onClick: () => reRoute("/auth"),
        },
      });
      return;
    }

    reRoute("/create");
  };

  return (
    <>
      <main className="mb-20 space-y-3 w-full">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold font-sans_serif">Explore</h2>
          <Button className="rounded" onClick={handleReRoute}>
            {isLoading || isFetching ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Plus /> <span>Create post</span>
              </>
            )}
          </Button>
        </div>

        <Dialog
          open={isRoomieInviteOpen}
          className="max-h-[80%] max-w-[90%]"
          onOpenChange={() => setRoomieInviteOpen((p) => !p)}
        >
          <DialogContent className="overflow-scroll">
            <InviteModal
              onClose={() => setRoomieInviteOpen(false)}
              roomieId={roomie_param.get("roomie")}
            />
          </DialogContent>
        </Dialog>

        {user && token ? (
          <Tabs className="space-y-5" defaultValue="roommates">
            <TabsList>
              <TabsTrigger value="roommates">Roomates Posts</TabsTrigger>
              <TabsTrigger value="proposal">Applied Posts</TabsTrigger>
              <TabsTrigger value="mypost">My post</TabsTrigger>
            </TabsList>
            <TabsContent value="roommates">
              {/* Work on Later on Roomate itSelf*/}
              <Roomates />
            </TabsContent>

            <TabsContent value="proposal">
              <RequestSentTable />
            </TabsContent>

            <TabsContent value="mypost">
              <UserRoommateData />
            </TabsContent>
          </Tabs>
        ) : (
          <Roomates />
        )}
      </main>
    </>
  );
};

export default ExplorePage;
