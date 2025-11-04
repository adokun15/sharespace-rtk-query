//Create Post!!!

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Button } from "./ui/button.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { z } from "zod";
import { useRoomieSpaceFormMutation } from "../store/Slices/matches";
//import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import InfoPopOver from "./InfoPopOver";
import InfoDialog from "./InfoDialog";
import { SUPPORT_PHONE } from "../lib/utils";
//import { saveMessagingDeviceToken } from "../firebase/Messaging";

//Validate Input
const formSchema = z.object({
  contact: z.string().min(5),
  room_video: z.string().min(0),
  school_short: z.string().regex(/^[a-zA-Z]+$/, "Invalid school name"),
  description: z.string().min(5, "Quote too Short"),
  numberOfRoommates: z.string().max(2),
});

export default function AddPreferences({ user }) {
  const [createpost, { isLoading }] = useRoomieSpaceFormMutation();

  const reRoute = useNavigate();

  const form = useForm({
    defaultValues: {
      contact: "",
      school_short: "",
      description: "",
      numberOfRoommates: "1",
      room_video: "",
    },
    resolver: zodResolver(formSchema),
  });

  const createPostHandler = async (data) => {
    //Validate create here first
    if (!user || !user?.role) {
      toast.warning("You seemed to be logged out!");
      return;
    }

    //Check if Quote;
    if (data?.description && data?.description?.split(" ").length > 200) {
      toast.error("Quote has exceeded its limit :  200 words ");
      return;
    }

    if (data?.description.includes("http")) {
      toast.error("Kindly remove any foreign links. No links allowed");
      return;
    }

    if (data?.school_short?.length > 24) {
      toast.error("School abbreviation is way too long!");
      return;
    }

    if (
      !data?.contact.includes("wa.link/") &&
      !data?.contact.includes("wa.me/")
    ) {
      toast.warning("Invalid Whatsapp link");
      return;
    }

    if (
      data?.room_video?.length > 1 &&
      !data?.room_video?.includes("catbox.moe")
    ) {
      toast.warning("Invalid Video Link", {
        description: (
          <>
            Visit{" "}
            <a
              className="underline"
              href="https://catbox.moe/"
              target="_blank"
              rel="noreferrer"
            >
              Catbox.moe
            </a>
            , upload your video, paste link here, We will take care of the rest!
          </>
        ),
      });
      return;
    }

    const timePosted = new Date().toISOString();

    const info = {
      //Content&Tags
      numberOfRoommates: data?.numberOfRoommates,
      description: data?.description,
      school_short: data?.school_short,
      contact: data?.contact,
      room_video: data?.room_video || null,

      //Primary
      name: user?.name,
      photo: user?.photo,
      userId: user?.userId,
      timePosted,

      //Filters
      department: user?.profile?.department,
      level: user?.profile?.level,
      school: user?.profile?.school,
      religion: user?.religion,
      gender: user?.gender,
    };

    await createpost(info)
      .unwrap()
      .then((data) => {
        toast.success(data?.message, {
          description: "Check under 'my posts' to review post",
        });
        reRoute("/");
      })
      .catch((error) => {
        toast.error(error?.status || "Error", {
          description: error?.message,
          action: {
            // onClick: () => reRoute("/profile?credit=true")
          },
        });
      });
  };

  if (!user?.role) {
    return (
      <div className="text-center space-y-6">
        <p>Kindly complete your profile to continue</p>
        <Button asChild variant="outline">
          <Link to="/onboarding">Complete Profile</Link>
        </Button>
      </div>
    );
  }

  /**
 If your Target is 'toward' student looking for a roomie, then
your post should be a roomie, which means you have 'accomodation'

If your Target is 'toward' student looking for a roommate and accomodation, then
your post should be a spacer, which means you have no 'accomodation' 
 */

  return (
    <Form {...form}>
      <form
        className="font-poppins space-y-8"
        onSubmit={form.handleSubmit(createPostHandler)}
      >
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                Quote
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="resize-none 
                  ring-2 ring-primary ring-offset-2
        rounded-xl border-primary border
                  font-poppins tracking-wide flex 
                   text-base h-9 w-full bg-transparent px-3 
                     py-1 shadow-sm transition-colors  placeholder:text-muted-foreground
                     focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-ring text-[16px] placeholder:text-slate-400 min-h-32 "
                  placeholder="Enter a brief quote"
                ></textarea>
              </FormControl>

              <FormDescription>
                <span className="block">
                  Enter a brief of quote about your hostel or if you are looking
                  for shared accomodation just add your budget, level etc
                </span>
                {field.value?.split(" ").length >= 200 ? (
                  <span className="text-end block text-destructive">
                    Exceeded Limit!
                  </span>
                ) : (
                  <span className="block text-end">
                    {field.value?.split(" ").length} / 200
                  </span>
                )}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="school_short"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" my-3 text-[18px] font-[500] font-sans_serif">
                Your School abbreviation
                <InfoPopOver>
                  The Short name of your school eg KWASU, OAU, UNILAG
                </InfoPopOver>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="University of Lagos e.g UNILAG"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="numberOfRoommates"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                Max Roommates
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How many?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Note: These are the number of people you want to live with
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="contact"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                Whatsapp link{" "}
                <InfoPopOver>
                  This could be a link with wa.me or wa.link that redirect to
                  your contact
                </InfoPopOver>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="wa.link/phone or wa.me/phone " />
              </FormControl>
              <FormDescription>
                Once you generate your code, simply paste it here
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="room_video"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                Add a video of your apartment (optional){" "}
                <InfoDialog>
                  <div className="font-poppins space-y-4">
                    <h1 className="text-[20px] font-[600]">Guide</h1>
                    <p>
                      If you do not have an apartment yet, you can leave this
                      option empty.{" "}
                    </p>
                    <p className="text-[16px]">
                      But if you have an apartment you wish to show others then
                      visit{" "}
                      <a
                        className="text-primary"
                        href="https://catbox.moe"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Catbox website
                      </a>{" "}
                      to upload the video of your hostel{" "}
                    </p>
                    <p>
                      After uploading your video, you will be provided with a
                      url link, copy and paste the url here.
                    </p>
                    <p className="text-slate-500 mt-4">
                      for further support, reach out to{" "}
                      <a
                        className="text-primary"
                        href={SUPPORT_PHONE}
                        target="_blank"
                        rel="noreferrer"
                      >
                        us
                      </a>
                    </p>
                  </div>
                </InfoDialog>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Upload Room Video" />
              </FormControl>
              <FormDescription>
                Visit{" "}
                <a
                  className="text-primary"
                  href="https://catbox.moe"
                  target="_blank"
                  rel="noreferrer"
                >
                  catbox.moe
                </a>{" "}
                upload your video on their cloud and paste the link here, we
                will display for others to see.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          variant="primary"
          disabled={isLoading}
          className="rounded w-full max-w-fit font-bold  block tracking-wide"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Upload"}
        </Button>
      </form>
    </Form>
  );
}
