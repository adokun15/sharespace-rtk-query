import { useGetUserQuery } from "../../store/Slices/user";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircleIcon, ArrowRight, Camera, Loader2 } from "lucide-react";
import EmailVerificationComponent from "../../components/User/EmailVerification";
import ProfilePic from "../../components/User/PhotoUpload";
import Profile from "../../components/User/Profile";
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
  DialogClose,
} from "../../components/ui/dialog";
import EditPhoto from "../../components/User/EditPhoto";
import EditUser from "../../components/User/EditUser";
import { useEffect, useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import {
  useBuyCreditMutation,
  useConfirmCreditPaymentQuery,
} from "../../store/Slices/credit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormDescription,
} from "../../components/ui/form";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { accountCreationDate } from "../../utils/TimeHandler";

const FormSchema = z.object({
  type: z.enum(["60", "500", "1000"], {
    required_error: "You need to select a plan!",
  }),
});

export default function ProfilePage() {
  const {
    data: user,
    isFetching,
    refetch,
    isLoading,
    error,
    isError,
  } = useGetUserQuery();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  //Search Param
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const auto_open_credit = params.get("credit");

  const [
    pay_credit,
    { isLoading: redirecting, isError: isPaymentError, error: paymentError },
  ] = useBuyCreditMutation();

  const {
    data: paymentConfirmation,
    isLoading: confirmingPayment,
    isError: isPaymentConfirmationError,
    error: paymentConfirmationError,
  } = useConfirmCreditPaymentQuery(reference, { skip: !reference });

  const [controlledDialogModal1, setDialogToggle1] = useState(false);
  const [controlledDialogModal2, setDialogToggle2] = useState(false);

  const [controlledDialogPayment, setDialogTogglePayment] = useState(false);

  useEffect(() => {
    if (reference) {
      //Open Modal
      setDialogTogglePayment(true);
    }
  }, [reference]);

  const redirectToPayment = async (creditInfo) => {
    //PASS to Paystack
    await pay_credit({ creditSize: creditInfo?.type })
      .unwrap()
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  if (isError) {
    return <DataError error={error} refetch={refetch} />;
  }

  const toggleDialogModalUser = () => {
    setDialogToggle1((p) => !p);
  };
  const toggleDialogModalPhoto = () => {
    setDialogToggle2((p) => !p);
  };
  const profile_complete =
    user?.religion && user?.email_verified && user?.photo && !isError;

  return (
    <main className="mx-auto container">
      <h1 className="text-2xl font-semibold text-slate-600 font-roboto tracking-wide">
        Profile Account
      </h1>

      <div className="my-6">
        <Dialog
          open={controlledDialogPayment}
          onOpenChange={() => setDialogTogglePayment((p) => !p)}
        >
          <DialogContent>
            <DialogTitle className="font-sans_serif">
              Payment status - {paymentConfirmation?.status}
            </DialogTitle>
            {confirmingPayment && <p>...</p>}
            {isPaymentConfirmationError && (
              <p className="text-destructive font-poppins">
                {paymentConfirmationError?.message}
              </p>
            )}
            {paymentConfirmation && (
              <article>
                {paymentConfirmation?.status === "success" && (
                  <p className="font-poppins">
                    {" "}
                    Your Payment of <b>NGN{paymentConfirmation?.amount}</b> was
                    successful. <b>{paymentConfirmation?.credit}</b> worth of
                    credits has been added to your account
                  </p>
                )}
                {paymentConfirmation?.status === "failed" && (
                  <p className="font-poppins">
                    {" "}
                    Your Payment of <b>NGN{paymentConfirmation?.amount}</b>{" "}
                    Failed.
                  </p>
                )}
              </article>
            )}

            <DialogClose asChild>
              <Button variant="primary" className="w-fit">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
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
            Joined : {accountCreationDate(user?.dateJoined)}
          </span>
        </p>
      </div>

      {profile_complete && (
        <div className="w-full space-y-3 mb-4">
          <Tabs
            className="space-y-5"
            defaultValue={auto_open_credit ? "credit" : "profile"}
          >
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="credits">Buy Credits</TabsTrigger>
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

                  {/*         <div className="text-[16px]">
                    <p className="cursor-pointer  w-fit p-1 rounded  bg-slate-200  hover:bg-purple-500/90 hover:text-white transition-all">
                      Age*
                    </p>
                    <p>{ageHandler(user?.dob)} years old</p>
                  </div>
*/}
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
            <TabsContent value="credits">
              <Dialog>
                <article className="space-y-2  px-1 py-2 ">
                  <p>Buy Credits and find your roommate instantly!</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      asChild
                      className="hover:bg-slate-200 rounded hover:text-secondary"
                    >
                      <Link to="manage-credit">Manage credit</Link>
                    </Button>
                    <DialogTrigger asChild>
                      <Button>Choose Plan</Button>
                    </DialogTrigger>
                  </div>
                </article>

                <DialogContent>
                  <DialogTitle className="font-sans_serif">
                    Select Plan to Continue
                  </DialogTitle>
                  <>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(redirectToPayment)}
                        className="w-full font-poppins space-y-6"
                      >
                        <FormMessage>
                          {isPaymentError && paymentError?.message}
                        </FormMessage>
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="60" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <p className="">
                                        60 Credits{" "}
                                        <ArrowRight className=" inline text-primary" />{" "}
                                        NGN250
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="500" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <p className="">
                                        500 Credits{" "}
                                        <ArrowRight className=" inline text-primary" />{" "}
                                        NGN1000
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="1000" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <p className="">
                                        1000 Credits{" "}
                                        <ArrowRight className=" inline text-primary" />{" "}
                                        NGN1800
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormDescription>
                                After clicking "buy now", you are going to be
                                redirected to PAYSTACK to complete your payment.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <Button
                          className="rounded"
                          type="submit"
                          variant="primary"
                          disabled={redirecting}
                        >
                          {redirecting ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Buy Now"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                </DialogContent>
              </Dialog>
              {/*
              <div className="px-1 space-y-2">
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
         */}
            </TabsContent>
          </Tabs>
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

          {!user?.photo && <ProfilePic triggerModal={toggleDialogModalPhoto} />}
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
