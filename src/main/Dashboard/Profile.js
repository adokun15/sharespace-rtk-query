import { useGetUserQuery } from "../../store/Slices/user";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { Camera, Dot, Infinity } from "lucide-react";
//import EmailVerificationComponent from "../../components/User/EmailVerification";
//import ProfilePic from "../../components/User/PhotoUpload";
//import Profile from "../../components/User/Profile";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "../../components/ui/tabs";
import DataError from "../../components/DataError";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  //DialogClose,
} from "../../components/ui/dialog";
import EditPhoto from "../../components/User/EditPhoto";
import EditUser from "../../components/User/EditUser";
import { useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { useNavigate } from "react-router-dom";

import { accountCreationDate } from "../../utils/TimeHandler";
import Settings from "src/components/Settings";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

export default function ProfilePage() {
  const {
    data: user,
    isFetching,
    refetch,
    isLoading,
    error,
    isError,
  } = useGetUserQuery();

  const [controlledDialogModal1, setDialogToggle1] = useState(false);
  const [controlledDialogModal2, setDialogToggle2] = useState(false);

  const router = useNavigate();

  if (isLoading || isFetching) {
    return (
      <div className="space-y-10">
        <div className="items-end justify-center flex gap-3">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="rounded w-16 p-3 hover:bg-purple-300/15" />
        </div>

        <div className="mt-5 even:mx-auto odd:mx-0 space-y-3">
          <Skeleton className="text-3xl w-2/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="text-3xl w-1/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="text-3xl w-2/5 p-3 font-medium text-center font-roboto mt-4" />
          <Skeleton className="font-oswald w-1/5 p-3 text-slate-400 text-center my-1" />
          <Skeleton className="font-oswald p-3 w-2/5 text-slate-600 text-center my-1" />
          <Skeleton className="font-oswald p-3 w-1/5 text-slate-600 text-center my-1" />
        </div>
        <div>
          <Skeleton className="mx-auto rounded w-24 h-12 p-3 hover:bg-purple-300/15" />
        </div>
      </div>
    );
  }
  // const profile_complete = user?.religion && user?.email_verified && user?.photo && ;
  if (user?.userId && !user?.onboarding_complete && !isError && !user?.role) {
    router("/onboarding");
  }

  if (user?.userId && user?.onboarding_complete && user?.role !== "user") {
    router("/admin");
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  const toggleDialogModalUser = () => {
    setDialogToggle1((p) => !p);
  };

  const toggleDialogModalPhoto = () => {
    setDialogToggle2((p) => !p);
  };
  return (
    <main className="mx-auto space-y-4 container">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Your profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <Dialog
          open={controlledDialogModal2}
          onOpenChange={toggleDialogModalPhoto}
        >
          <div className="items-end justify-center flex gap-3">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.photo} />
              <AvatarFallback>
                {user?.name
                  ?.split(" ")
                  ?.map((name) => name[0])
                  .join("") || "NULL"}
              </AvatarFallback>
            </Avatar>
            <DialogTrigger asChild>
              <Button
                className="rounded hover:bg-purple-700/95"
                variant="outline"
              >
                <Camera />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle> Face Photo Upload </DialogTitle>
              <EditPhoto
                uid={user?.userId}
                onClose={toggleDialogModalPhoto}
                imgUrl={user?.photo}
              />
            </DialogContent>
          </div>
        </Dialog>
        <div className="space-y-2">
          <p className="text-3xl  font-medium text-center font-roboto mt-4">
            {user?.name}
          </p>
          <p className="my-4 flex gap-2 justify-center font-roboto text-slate-400 text-center ">
            <span
              className="
             font-medium"
            >
              {user?.role === "user" && "Student"}
            </span>
            <Dot className="text-primary text-xl" />
            <span className="text-slate-400 font-medium">
              posts limit :{" "}
              <span className="font-bold text-primary">
                {user?.isPro ? <Infinity className="inline" /> : user?.limit}
              </span>
            </span>
          </p>
          <p className="font-oswald text-slate-600 text-center my-1">
            <span className=" font-roboto font-bold">
              Joined : {accountCreationDate(user?.dateJoined)}
            </span>
          </p>
        </div>
      </div>

      {user?.role && user?.onboarding_complete && (
        <div className="max-w-lg mx-auto space-y-3 mb-4">
          <Tabs className="space-y-5" defaultValue={"profile"}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Dialog
                open={controlledDialogModal1}
                onOpenChange={toggleDialogModalUser}
              >
                <div className="grid grid-cols-1 my-3 gap-2  md:grid-cols-2">
                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      School
                    </p>
                    <p>{user?.profile?.school}</p>
                  </div>

                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Department
                    </p>
                    <p>{user?.profile?.department}</p>
                  </div>

                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Level
                    </p>
                    <p>{user?.profile?.level}</p>
                  </div>

                  <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Religion
                    </p>
                    <p>{user?.religion}</p>
                  </div>
                </div>
                <DialogTrigger asChild>
                  <Button>Edit profile</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle>Change profile Setting </DialogTitle>
                  <EditUser
                    prevData={{
                      department: user?.profile?.department,
                      school: user?.profile?.school,
                      level: user?.profile?.level,
                    }}
                    onClose={toggleDialogModalUser}
                  />
                </DialogContent>
              </Dialog>
            </TabsContent>
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  );
}
