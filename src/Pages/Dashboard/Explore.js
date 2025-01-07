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
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import SingleRoommateInfo from "@/src/components/SingleRoomieData";
import InviteModal from "@/src/components/InviteModal";

//Depends on request claim what we be recommended
const ExplorePage = () => {
  const { data: user } = useIsLoggedInQuery();
  const token = localStorage.getItem("sharespace_token");

  const [param_id, setParamId] = useState(null);
  const [roomie_param] = useSearchParams();

  const [isRoomieInviteOpen, setRoomieInviteOpen] = useState(false);

  const SetDefaultRoomateId = (id) => {
    setParamId(id);
  };
  //once mount open modal
  useEffect(() => {
    if (roomie_param.get("roomie")) {
      setRoomieInviteOpen((p) => !p);
    }
  }, [roomie_param]);

  return (
    <>
      <main className="mb-20 space-y-3 w-full">
        <h2 className="text-3xl font-semibold font-sans_serif">Explore</h2>
        {/* Work on Later */}
        <Dialog
          open={isRoomieInviteOpen}
          onOpenChange={() => setRoomieInviteOpen((p) => !p)}
        >
          <DialogContent>
            <InviteModal
              onClose={() => setRoomieInviteOpen(false)}
              roomieId={roomie_param.get("roomie")}
              triggerSingleModal={SetDefaultRoomateId}
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
              <Roomates singleRoomateId={param_id} />
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
