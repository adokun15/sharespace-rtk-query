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
import { Slider } from "./ui/slider";
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
//import { saveMessagingDeviceToken } from "../firebase/Messaging";
export default function AddPreferences({ user }) {
  const [createpost, { isLoading }] = useRoomieSpaceFormMutation();

  //Validate Input
  const formSchema = z.object({
    //New
    duration: z.string().min(2),
    rentType: z.string().min(2),
    school_short: z.string().min(2, "This name is way too short!"),

    description: z.string().min(5, "Quote too Short"),
    location: z.string().min(2, "Invalid Location Length"),
    rent: z.number().array(),
    proposal: z.number().array(),
    numberOfRoommates: z.string().max(2),
  });

  const reRoute = useNavigate();

  const form = useForm({
    defaultValues: {
      //New
      school_short: "",
      duration: "a session",
      rentType: "fixed",
      description: "",
      location: "",
      rent: [150],
      proposal: [10],
      numberOfRoommates: "1",
    },
    resolver: zodResolver(formSchema),
  });

  const createPostHandler = async (data) => {
    //Validate create here first
    if (!user || !user?.targetType) {
      toast.warning("You seemed to be logged out!");
      return;
    }

    const { numberOfRoommates, rent, proposal, ...others } = data;

    const proposal_limit =
      typeof proposal === "number" ? proposal : proposal[0];

    //Check Credit: increased
    if (
      !(user?.credits && proposal_limit > 100 && user?.credits >= 120) && //Credits >= 50, proposal_limit > 10,
      !(user?.credits && user?.credits >= 100 && proposal_limit <= 120) // credits > 30, proposal_limit <= 10
    ) {
      toast.warning("Insufficient credits to complete process!", {
        action: {
          label: "Buy Credit",
          onClick: () => reRoute("/profile?credit=true"),
        },
      });
      return;
    }

    //Check if Quote;
    if (data?.description && data?.description?.split(" ").length > 200) {
      toast.error("Quote has exceeded its limit :  200 words ");
      return;
    }

    const timePosted = new Date().toISOString();

    const info = {
      ...others,
      numberOfRoommates: +numberOfRoommates,
      target: user?.targetType,
      proposal: proposal_limit,
      name: user?.name,
      department: user?.profile?.department,
      level: user?.profile?.level,
      school: user?.profile?.school,
      religion: user?.religion,
      gender: user?.gender,
      id: user?.userId,
      photo: user?.photo,
      timePosted,
    };

    const BudgetRent = user?.targetType === "roomie" ? "rent" : "budget";

    info[BudgetRent] = typeof rent === "number" ? rent : rent[0];

    //Request Device permission to send notification
    //Send a Notice to all Student in the school about your post

    /*await saveMessagingDeviceToken(user?.userId).catch((err) => {
      toast.error(err?.status);
    });
*/
    await createpost(info)
      .unwrap()
      .then((data) => {
        toast.success(data?.message, {
          description: "Check under 'my post' to review post",
        });
        reRoute("/");
      })
      .catch((error) => {
        toast.error(error?.status || "Error", {
          description: error?.message,
          action: {
            // onClick: () => reRoute("/profile?credit=true")
          },
          //Stay longer, add button to buy credit
        });
      });
  };

  if (!user?.targetType) {
    return (
      <div className="text-center space-y-6">
        <p>Kindly complete your profile to continue</p>
        <Button asChild variant="outline">
          <Link to="/profile">Complete Profile</Link>
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
        className="space-y-8"
        onSubmit={form.handleSubmit(createPostHandler)}
      >
        {user?.targetType === "roomie" && (
          <>
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl font-sans_serif">
                    Duration of Rent
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How Long?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="less than 3 months">
                        Less than 3 months
                      </SelectItem>
                      <SelectItem value="less than 6 months">
                        Less than 6 months
                      </SelectItem>
                      <SelectItem value="one semester">One Semester</SelectItem>
                      <SelectItem value="a session">A session</SelectItem>
                      <SelectItem value="a year">A year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    <p>How long will the rent last for?</p>
                  </FormDescription>
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          name="rentType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">
                Is it a fixed or negotiable price?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What is it going to be?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="school_short"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">
                Short Name of your School : {user?.profile?.school}
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
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">Quote</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="resize-none font-poppins tracking-wide flex 
                   text-base h-9 w-full rounded-md 
                   border border-input bg-transparent px-3 
                     py-1 shadow-sm transition-colors  placeholder:text-muted-foreground
                     focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-ring md:text-sm min-h-32 "
                  placeholder="Enter descriptions..."
                ></textarea>
              </FormControl>

              <FormDescription>
                <p>
                  {user?.targetType === "roomie"
                    ? "Enter a brief of quote about your hostel"
                    : "Enter a brief quote about your lifestyle, budget or what you do not like."}
                </p>
                {field.value?.split(" ").length >= 200 ? (
                  <p className="text-end text-destructive">Exceeded Limit!</p>
                ) : (
                  <p className="text-end">
                    {field.value?.split(" ").length} / 200
                  </p>
                )}
              </FormDescription>
            </FormItem>
          )}
        />

        {user?.targetType === "roomie" && (
          <FormField
            name="numberOfRoommates"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-xl font-sans_serif">
                  Number of Roommates
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
        )}
        <FormField
          name="rent"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">
                {user?.targetType === "spacer" ? "Budget" : "Rent"}
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[100]}
                  min={100}
                  onValueChange={field.onChange}
                  value={[...field.value]}
                  step={5}
                  max={user?.targetType === "spacer" ? 350 : 700}
                />
              </FormControl>
              <FormDescription>
                Enter Your {user?.targetType === "spacer" ? "budget" : "rent"}:{" "}
                {field?.value}k
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">
                Location
              </FormLabel>

              <FormControl>
                <Input {...field} placeholder="Your Location" />
              </FormControl>
              <FormDescription>
                {user?.targetType === "spacer"
                  ? "Where do you prefer to stay?"
                  : "Where is your hostel located?"}{" "}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="proposal"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-xl font-sans_serif">
                Proposal limit
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[10]}
                  min={1}
                  onValueChange={field.onChange}
                  value={[...field.value]}
                  step={1}
                  max={50}
                />
              </FormControl>
              <FormDescription>
                <p>
                  {field?.value} proposals. *Number of people that can send you
                  a roommate request*{" "}
                </p>

                <p>
                  {+field?.value > 10 &&
                    "Limit is 10. If you want more an additional 20 credits will be charged."}
                </p>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          variant="primary"
          disabled={isLoading}
          className="rounded font-bold mx-auto block tracking-wide"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Upload Post (100 credits)"
          )}
        </Button>
      </form>
    </Form>
  );
}
