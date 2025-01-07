//Later feature!
import { useState } from "react";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";

import { Sheet, SheetContent, SheetTitle } from "../components/ui/sheet";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFindRoomieSpaceMutation } from "../store/Slices/matches";
import { toast } from "sonner";

export default function MatchForm({ user }) {
  //Open Sheet
  const [isSheetOpen] = useState(false);

  /*const formSchema = z.object({
    rent:
      z.number().gte(100, { message: "Value is Less Than 100k" }) &&
      z.number().lte(900, { message: "Value is Less Than 100k" }),
    religion: z.string().length !== 0,
    department: z.string().length !== 0,
  });
*/

  const [findroomie] = useFindRoomieSpaceMutation();
  const form = useForm({
    //  resolver: zodResolver(formSchema),
    defaultValues: {
      minrent: 100,
      religion: "",
      level: "",
    },
  });

  const SearchRoommate = async (e) => {
    console.log(e);

    if (!user) {
      toast.warning("You seemed to be logged out", {
        description: "Login in to find roommate",
      });
      return;
    }

    //Run Match Function
    await findroomie({
      data: { rent: e?.minrent, level: e?.level, religion: e?.religion },
      user,
    })
      .unwrap()
      .then((data) => console.log(data))
      .catch((e) => console.log(e));

    //setSheetOpen(true);
  };
  return (
    <Sheet open={isSheetOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(SearchRoommate)}>
          <FormField
            name="religion"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <Label>Rent </Label>
          <FormField
            name="minrent"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Slider
                    defaultValue={[100]}
                    min={100}
                    onValueChange={field.onChange}
                    value={[field.value]}
                    step={5}
                    max={300}
                  />
                </FormControl>
                <FormDescription>Your Budget: {+field.value}k</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Expected Level" />
                </FormControl>
                <FormDescription>Enter location</FormDescription>
              </FormItem>
            )}
          />

          <Button>Find Match</Button>
        </form>
      </Form>
      <SheetContent>
        <SheetTitle>Potential Roommate</SheetTitle>
        <ul></ul>
      </SheetContent>
    </Sheet>
  );
}
