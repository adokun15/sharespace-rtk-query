//Create Post!!!

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { z } from "zod";
import { useRoomieSpaceFormMutation } from "../../store/Slices/matches";
//import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useGetSchoolsQuery } from "../../store/Slices/user";
//import { saveMessagingDeviceToken } from "../firebase/Messaging";

//Validate Input
const formSchema = z.object({
  school: z.string().min(1),
  level: z.string().min(1),
  department: z.string().min(2),
  gender: z.string().min(1),
  religion: z.string().min(1),

  contact: z.string().min(2),
  room_video: z.string().default("free"),
  school_short: z.string().regex(/^[a-zA-Z]+$/, "Invalid school name"),
  description: z.string().min(5, "Quote too Short"),
  numberOfRoommates: z.string().max(2),
});

export default function CreatePostByAdmin() {
  const [createpost, { isLoading }] = useRoomieSpaceFormMutation();
  //School List
  const {
    data: schools,
    error,
    refetch,
    isError,
    isLoading: loadingSchools,
  } = useGetSchoolsQuery();

  //const reRoute = useNavigate();

  const form = useForm({
    defaultValues: {
      religion: "Not provided",
      department: "Not provided",
      level: "Not provided",
      school: "",
      gender: "",
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

    //Check if Quote;
    if (data?.description && data?.description?.split(" ").length > 200) {
      toast.error("Quote has exceeded its limit :  200 words ");
      return;
    }

    if (data?.school_short?.length > 24) {
      toast.error("School abbreviation is way too long!");
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
      name: "By admin",
      userId: "admin",
      timePosted,

      //Filters: manually
      department: data?.department,
      level: data?.department,
      school: data?.school,
      religion: data?.religion,
      gender: data?.gender,
    };

    await createpost(info)
      .unwrap()
      .then((data) => {
        toast.success(data?.message, {
          description: "Check posts",
        });
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
                  className="resize-none font-poppins tracking-wide flex 
                   text-base h-9 w-full rounded-md 
                   border border-input bg-transparent px-3 
                     py-1 shadow-sm transition-colors  placeholder:text-muted-foreground
                     focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-ring md:text-sm min-h-32 "
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

        <div className="flex *:grow gap-x-2">
          <FormField
            name="school_short"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                  Your School abbreviation (?)
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
                  Max Roommates (?)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

        <FormField
          name="contact"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-[18px] font-[500] font-sans_serif">
                Whatsapp Phone via wa.link (?)
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://wa.link/your_phone" />
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
                Add Your Room video{" "}
                <span className="text-[16px] font-bold underline text-primary">
                  pro
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Upload Room Video" />
              </FormControl>
              <FormDescription>
                Visit catbox.moe upload your video on their cloud and paste the
                link here, we will display for others(logged in users) to see.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="religion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="muslim">Islam</SelectItem>
                  <SelectItem value="Christain">Christain</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Male</SelectItem>
                  <SelectItem value="0">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="school"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute</FormLabel>
              {loadingSchools && <Loader2 className="text-xs animate-spin" />}
              {isError && (
                <>
                  <p className="text-destructive">{error?.message}</p>

                  <Button variant="link" onClick={refetch}>
                    reload
                  </Button>
                </>
              )}

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select School Name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schools?.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="level"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Enter Your Level</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="department"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Your Department" />
              </FormControl>
              <FormDescription>
                Enter In Complete Format eg Public health Science, Mass
                communication.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button
          variant="primary"
          disabled={isLoading}
          className="rounded w-full max-w-md font-bold mx-auto block tracking-wide"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Upload"}
        </Button>
      </form>
    </Form>
  );
}
