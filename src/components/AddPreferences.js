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

import { Input } from "./ui/input";
//import { z } from "zod";
import { useRoomieSpaceFormMutation } from "../store/Slices/matches";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export default function AddPreferences({ user }) {
  const [createpost] = useRoomieSpaceFormMutation();

  const [formerror, setFormError] = useState("");
  const form = useForm({
    defaultValues: {
      rent: 150,
      location: "",
      description: "",
      proposal: 10,
      numberOfRoommates: 1,
    },
  });

  //Validate Input
  //  const formSchema = z.object({});

  const createPostHandler = async (data) => {
    //Validate create here first
    /*  if (!user) {
      setFormError("You seemed to be logged out!");
      return;
    }

    if (
      !(user?.credits && user?.credits > 30 && user?.proposal <= 10) ||
      !(user?.credits && user?.proposal > 10 && user?.credits > 50)
    ) {
      setFormError("Insufficient credits to complete process!");
      return;
    }
*/
    const {
      rent: [rent],
      proposal: [proposal],
      ...others
    } = data;

    const timePosted = new Date().toISOString();
    const info = {
      ...others,
      target: user?.targetType,
      age: user?.dob,
      rent,
      proposal,
      name: user?.name,
      department: user?.profile?.department,
      level: user?.profile?.level,
      school: user?.profile?.school,
      religion: user?.religion,
      id: user?.userId,
      photo: user?.photo,
      socials: user?.socials,
      timePosted,
    };

    console.log(info);
    console.log(user?.credits);
    await createpost(info)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(createPostHandler)}
      >
        {formerror && <p>{formerror}</p>}
        <FormField
          name="numberOfRoommates"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Roommates</FormLabel>
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
          name="rent"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[100]}
                  min={100}
                  onValueChange={field.onChange}
                  value={[field.value]}
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
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=""
                  placeholder="enter description"
                />
              </FormControl>
              <FormDescription>
                <p>0 / 200</p>
                <p>
                  Enter A brief of yourself and what kind of roomate you are
                  looking for
                </p>
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="proposal"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal limit</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[10]}
                  min={1}
                  onValueChange={field.onChange}
                  value={[field.value]}
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
              <FormLabel>Location</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Your Location" />
              </FormControl>
              <FormDescription>Where is your hostel located? </FormDescription>
            </FormItem>
          )}
        />
        <Button className="bg-purple-500 text-blue-950 rounded font-bold tracking-wide">
          Create Roomie Post
        </Button>
      </form>
    </Form>
  );
}
