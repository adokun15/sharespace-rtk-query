import { Button } from "../ui/button";
import { Input } from "../../components/ui/input";
import {
  useEditUserMutation,
  useGetSchoolsQuery,
} from "../../store/Slices/user";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { SUPPORT_EMAIL } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export default function EditUser({ onClose, prevData }) {
  const [editUser, { isLoading: loading }] = useEditUserMutation();

  //School List
  const {
    data: schools,
    error,
    isError,
    refetch,
    isLoading: loadingSchools,
  } = useGetSchoolsQuery();

  const form = useForm({
    defaultValues: {
      school: prevData?.school || "",
      level: prevData?.level || "",
      department: prevData?.department || "",
    },
  });

  const handleEditUser = async (data) => {
    const user = { profile: {} };

    if (data?.school !== prevData?.school) {
      user.profile.school = data?.school;
      //Cos of Firebase that why it this ugly!
      user.profile.level = prevData?.level;
      user.profile.department = data?.department;
    }

    if (data?.level !== prevData?.level) {
      user.profile.level = data?.level;
      user.profile.school = prevData?.school;
      user.profile.department = prevData?.department;
    }

    if (data?.department !== prevData?.department) {
      user.profile.department = data?.department;
      user.profile.school = prevData?.school;
      user.profile.level = prevData?.level;
    }

    if (
      !user?.profile?.level &&
      !user.profile.department &&
      !user.profile.school
    ) {
      toast.error("Error: No Changes Made Yet");
      return;
    }

    await editUser(user)
      .unwrap()
      .then((data) => {
        //Close modal
        onClose();

        //alert user: "changes made"
        toast.success(data);
      })
      .catch(({ data }) => {
        //alert user: "ERROR"
        toast.error(data?.status || "Something WENT wrong!", {
          description: data?.message,
        });
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleEditUser)}>
        <>
          <FormField
            name="school"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                {loadingSchools && <Loader2 className="text-xs animate-spin" />}
                {isError && (
                  <>
                    <p className="text-destructive">{error?.message}</p>
                    <Button variant="link" onClick={refetch}>
                      reload
                    </Button>
                  </>
                )}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Can't find your school? Reach out to{" "}
                  <a
                    className="text-primary underline"
                    href={SUPPORT_EMAIL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Me
                  </a>{" "}
                  to include your school
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              </FormItem>
            )}
          />
        </>
        <Button>{loading ? "..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
