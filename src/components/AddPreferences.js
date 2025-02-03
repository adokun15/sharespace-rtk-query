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
export default function AddPreferences({ user }) {
  const [createpost, { isLoading }] = useRoomieSpaceFormMutation();

  //Validate Input
  const formSchema = z.object({
    description: z.string().min(5, "Quote too Short"),
    location: z.string().min(2, "Invalid Location Length"),
    rent: z.number().array(),
    proposal: z.number().array(),
    numberOfRoommates: z.string().max(2),
  });

  const reRoute = useNavigate();

  const form = useForm({
    defaultValues: {
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

    //Check Credit

    if (
      !(user?.credits && proposal_limit > 10 && user?.credits >= 50)
      //!(user?.credits && user?.credits >= 30 && proposal_limit <= 10)
    ) {
      toast.error("Insufficient credits to complete process!");
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

    await createpost(info)
      .unwrap()
      .then((data) => {
        toast.error(data?.message, {
          description: "Check under 'my post' to review post",
        });

        reRoute("/");
      })
      .catch((error) => {
        toast.error(error?.status || "Error", {
          description: error?.message,
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

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(createPostHandler)}
      >
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-xl font-sans_serif">
                Quote
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="min-h-4 rounded"
                  placeholder="Enter descriptions..."
                />
              </FormControl>

              <FormDescription>
                <p>0 / 200</p>
                <p>
                  {user?.targetType === "roomie"
                    ? "Enter a brief of quote about your hostel"
                    : "Enter a brief quote about your lifestyle, budget or what you do not like."}
                </p>
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
                <FormLabel className="font-bold text-xl font-sans_serif">
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
              <FormLabel className="font-bold text-xl font-sans_serif">
                {user?.targetType === "spacer" ? "Rent" : "Budget"}
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[100]}
                  min={100}
                  onValueChange={field.onChange}
                  value={[...field.value]}
                  step={5}
                  max={600}
                />
              </FormControl>
              <FormDescription>
                Enter Your Rent: {field?.value}k
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="proposal"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-xl font-sans_serif">
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
                  a message*{" "}
                </p>
                <p></p>

                <p>
                  {+field?.value > 10 &&
                    "Limit is 10. If you want more an additional 20 credits will be charged."}
                </p>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-xl font-sans_serif">
                Location
              </FormLabel>

              <FormControl>
                <Input {...field} placeholder="Your Location" />
              </FormControl>
              <FormDescription>Where is your hostel located? </FormDescription>
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          className="rounded font-bold tracking-wide"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Upload Post"}
        </Button>
      </form>
    </Form>
  );
}
