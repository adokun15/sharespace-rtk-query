import { useGetUserQuery } from "../../store/Slices/user";
import { Button } from "../../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircleIcon, Radio, Sheet } from "lucide-react";
import EmailVerificationComponent from "../../components/User/EmailVerification";
import ProfilePic from "../../components/User/PhotoUpload";
import Profile from "../../components/User/Profile";
import {
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ageHandler } from "../../utils/TimeHandler";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "../../components/ui/tabs";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog";

export default function ProfilePage() {
  const {
    data: user,
    isFetching,
    refetch,
    isLoading,
    error,
    isError,
  } = useGetUserQuery();

  if (isLoading || isFetching) {
    return <LoaderSpinner message="Loading Profile" />;
  }

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  const profile_complete =
    user?.religion && user?.email_verified && user?.photo;

  return (
    <main className="mx-auto container">
      <h1 className="text-2xl font-semibold text-slate-600 font-roboto tracking-wide">
        Profile Account
      </h1>

      <div className="my-6">
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
          <Button
            className="rounded hover:bg-purple-300/15"
            variant="outline"
            asChild
          >
            <Link>Change Photo</Link>
          </Button>
        </div>
        <h3 className="text-3xl font-medium text-center font-roboto mt-4">
          {user?.name}
        </h3>
        <p className="font-oswald text-slate-400 text-center my-1">
          <span className="font-roboto font-bold">
            {user?.credits || 0} Credits
          </span>
        </p>
        <p className="font-oswald text-slate-600 text-center my-1">
          <span className=" font-roboto font-bold">
            Joined : 4th July, 2024
          </span>
        </p>
      </div>

      {profile_complete && (
        <div className="w-full space-y-3 mb-4">
          <Tabs className="space-y-5" defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="credits">Buy Credits</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="grid grid-cols-1 my-3 gap-2  md:grid-cols-2">
                <div className="text-[16px]">
                  <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                    School
                  </p>
                  <p>{user?.profile?.school}</p>
                </div>

                <div className="text-[16px]">
                  <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                    Department*
                  </p>
                  <p>{user?.profile?.department}</p>
                </div>

                <div className="text-[16px]">
                  <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                    Level*
                  </p>
                  <p>{user?.profile?.level}</p>
                </div>

                <div className="text-[16px]">
                  <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                    Age*
                  </p>
                  <p>{ageHandler(user?.dob)} years old</p>
                </div>

                <div className="text-[16px]">
                  <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                    Religion
                  </p>
                  <p>{user?.religion}</p>
                </div>
              </div>
              <Button>Edit profile</Button>
            </TabsContent>
            <TabsContent value="credits">
              <Dialog>
                <article className="space-y-2 shadow px-4 py-2 rounded">
                  <h4 className="text-xl font-bold font-sans_serif">
                    Manage Credit
                  </h4>
                  <p>Buy Credits and find your roommate instantly!</p>
                  <div className="flex gap-3">
                    <Button variant="outline">View History</Button>
                    <DialogTrigger asChild>
                      <Button>Choose Plan</Button>
                    </DialogTrigger>
                  </div>
                </article>

                <DialogContent>
                  <DialogTitle>Select Plan to Continue</DialogTitle>
                  <>
                    <article>
                      <div>
                        <p>60 Credits | NGN100</p>
                      </div>
                      <div>
                        <p>500 Credits | NGN400</p>
                      </div>
                      <div>
                        <p>1000 Credits | NGN700</p>
                      </div>
                    </article>
                    <Button>Buy Now</Button>
                  </>
                </DialogContent>
              </Dialog>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Faqs</h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>What is a credit?</AccordionTrigger>
                    <AccordionContent>
                      Credits are purchase tokens used for exchange of service.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>

          {/*<Sheet>
                <SheetTitle>Credit Payment!</SheetTitle>
                <SheetTrigger>Get Now</SheetTrigger>         
              <SheetContent>
                  <SheetFooter>
                You are going to be redirected to Paystack to complete your
                purchase!
              </SheetFooter>
            
              </SheetContent>
              </Sheet>
              */}
        </div>
      )}
      {!profile_complete && (
        <div className="w-full space-y-3 mb-4">
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Complete your Profile</AlertTitle>
            <AlertDescription>
              Finish setting up your profile and start finding your roommate
            </AlertDescription>
          </Alert>
          {!user?.profile && <Profile mode="create" />}

          {!user?.email_verified && <EmailVerificationComponent />}

          {!user?.photo && <ProfilePic mode="create" uid={user?.userId} />}
        </div>
      )}
    </main>
  );
  /*   return (
      <motion.div>
        <Container elClass="text-main_color">
          <h1 className="text-4xl text-center my-8"> Your Profile</h1>
          <Card elClass="hover:-translate-y-1 transition-all duration-700 ease-in-out">
            <article className="px-[10%] md:flex *:block my-4 items-center">
              <div className=" max-w-[40%] flex justify-center">
                <Image imgSrc={profile?.photourl ? profile?.photourl : ""} />
              </div>
              <div className="space-y-1 w-full py-2 ">
                <p className="text-4xl ml-3  col-span-3">{profile?.fullname}</p>
                <p className="text-xl italic my-4 ml-3 text-slate-400 col-span-3">
                  @{profile?.username}
                </p>
                <div className="flex flex-wrap items-center">
                  <p className="cursor-pointer  w-fit p-2 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all">
                    {profile?.gender}
                  </p>

                  <p className="w-fit p-1 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                    {ageHandler(profile?.dob)} years old
                  </p>
                </div>

                <p className=" w-fit p-1 my-1 rounded ml-3  bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                  {profile?.email}
                </p>
                <p className=" w-fit text-nowrap  p-1 rounded ml-3 bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                  {profile?.school}
                </p>
              </div>
            </article>
            <Button
              trigger={() => {
                dispatch(
                  ModalAction.toggleEditProfilePopOver({ mode: "Edit" })
                );
              }}
            >
              Edit
            </Button>
          </Card>
        </Container>
        <AnimatePresence
          initial={{ scale: 0 }}
          animate={{ scale: 100 }}
          exit={{ scale: 0 }}
        >
          {EditProfilePopOver.isOpened && (
            <>
              <Modal cls="top-[5%] absolute z-[1200] md:left-[20%] left-0 md:w-[60%] w-full">
                <ProfileUpdate mode={EditProfilePopOver.mode?.toLowerCase()} />
              </Modal>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    );
    */
}
