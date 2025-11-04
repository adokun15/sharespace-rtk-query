//OnBoarding..

import { Button } from "../../components/ui/button";
import {
  useGetSchoolsQuery,
  useGetUserQuery,
  useSetUserMutation,
} from "../../store/Slices/user";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, Loader2 } from "lucide-react";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import DataError from "../../components/DataError";

export default function OnBoardingPage({ mode, previousData }) {
  //School List
  const {
    data: schools,
    error,
    refetch,
    isError,
    isLoading: loadingSchools,
  } = useGetSchoolsQuery();

  //Get User: Login and is not complete
  const {
    isError: user_isError,
    error: user_error,
    isLoading: user_loading,
    data: user,
    refetch: user_refetch,
  } = useGetUserQuery();

  //Set up profile::
  const [
    setUpProfile,
    { isError: profile_isError, error: profile_error, isLoading: loading },
  ] = useSetUserMutation();

  const router = useNavigate();

  //Validate Input
  const formValidator = z.object({
    school: z.string().min(1),
    level: z.string().min(1),
    department: z.string().min(2),
    gender: z.string().min(1),
    name: z
      .string()
      .regex(/^[a-zA-Z\s-]+$/, "Invalid Character, Use Your Actual name..")
      .max(24, "Your name is way too long, Shorten it.")
      .min(3),
    religion: z.string().min(1),
    //targetType: z.string().min(1),
  });

  const form = useForm({
    resolver: zodResolver(formValidator),

    defaultValues: {
      name: "",
      school: "",
      level: "",
      department: "",
      gender: "",
      religion: "",
      //Can be changed!
      //targetType: "",
    },
  });

  if (user_loading) {
    return (
      <p className="my-[10vh] font-poppins text-center">Preparing form...</p>
    );
  }

  if (user_isError) {
    return <DataError error={user_error} refetch={user_refetch} />;
  }

  if (user?.onboarding_complete) {
    router("/profile");
  }

  const handleSubmit = async (formData) => {
    //Validate Credential
    const { school, department, level, ...others } = formData;

    const data = {
      profile: {
        school,
        department,
        level,
      },
      ...others,
    };

    //Ask if they want to receiver notice on 'New Post'

    //console.log(data);
    await setUpProfile(data)
      .unwrap()
      .then(() => {
        //Clear form
        form.reset();

        //Notice User
        toast("Onboarding successful", {
          position: "bottom-center",
          description:
            "You can now start posting or looking for your roommate ;)",
        });
        //navigate
        router("/profile");
      })
      .catch(({ data }) => {
        toast(data?.message || "Something went wrong", {
          position: "bottom-center",
          description: "Onboarding failed.",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 mx-auto pb-8 md:max-w-lg"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="">
          <h1 className="text-xl font-bold">
            Join us by completing your profile
          </h1>
          <p className="px-3 text-slate-400">
            Let get to know you better, fill in your details below.
          </p>
        </div>

        <div>{profile_isError && "Something is Wrrong"}</div>
        <div className="space-y-4">
          <h1 className=" my-4 font-medium font-poppins">Personal Info</h1>

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Your Name" />
                </FormControl>
              </FormItem>
            )}
          />

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
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>
        <div className="space-y-4">
          <h1 className=" my-4 font-medium font-poppins">School Info</h1>
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
                    ))}{" "}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Can't find your school. Reach out to{" "}
                  <a
                    className="text-primary underline"
                    href={SUPPORT_PHONE}
                    target="_blank"
                    rel="noreferrer"
                  >
                    us
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
                <FormDescription>
                  Enter In Complete Format eg Public health Science, Mass
                  communication.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full rounded">{loading ? "..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
//import { useLocation, useNavigate } from "react-router-dom";
//import Button from "../../UI/Button";
//import { useDispatch } from "react-redux";
//import { ModalAction } from "../../store/Slices/modal";
//
//import { useRef, useState } from "react";
//import Input from "../../UI/Input";
//
//import EditProfilePic from "./PhotoUpload.js";
//import Select from "../../UI/Select.js";
//import EditUserName from "./Username.js";
////import { useEditProfileMutation } from "../../store/Slices/ProfileSlice.js";
//import { isProfileInputInvalid } from "../../utils/Validator.js";
//import { handleDashedString } from "../../utils/TimeHandler.js";
//import { useIsLoggedInQuery } from "../../store/Slices/user.js";
//function CreateProfileDetail({ mode, cancel }) {
//  const ref = useRef();
//
//  const { data } = useIsLoggedInQuery();
//  const [formError, setFormError] = useState("");
//  const dispatch = useDispatch();
//
//  //const [createProfile, { isLoading, error, isError }] =
//  //    useEditProfileMutation();
//  const navigate = useNavigate();
//
//  console.log(data);
//  const triggerSubmit = async () => {
//    let userProfile = {};
//    userProfile.user_id = data.user?.uid;
//    //Collect credential
//
//    const formdata = new FormData(ref.current);
//
//    for (const [key, value] of formdata.entries()) {
//      userProfile[key] = value;
//    }
//
//    if (userProfile.fullname === "") {
//      setFormError("Full Name space is empty!");
//      return;
//    }
//
//    if (userProfile.fullname?.length <= 3) {
//      setFormError("Length of Name is small");
//      return;
//    }
//
//    const inputInValid = isProfileInputInvalid(userProfile);
//
//    if (inputInValid) {
//      setFormError(inputInValid);
//      return;
//    }
//
//    if (!userProfile.dob) {
//      setFormError("Date of Birth space is empty!");
//      return;
//    }
//
//    userProfile.dob = handleDashedString(userProfile?.dob);
//
//    let ageLimit = new Date();
//    let user_dob = new Date(userProfile?.dob);
//    const user_limit_year = ageLimit.getFullYear() - 16;
//    const user_limit_month = ageLimit.getMonth() + 1;
//    const user_limit_date = ageLimit.getDate();
//
//    const ageLimitInMilli = new Date(
//      user_limit_year,
//      user_limit_month,
//      user_limit_date
//    ); //millisecond
//
//    if (user_dob.getTime() > ageLimitInMilli.getTime()) {
//      setFormError("You must be atleast 16 years!");
//      return;
//    } else {
//      setFormError("");
//    }
//
//    if (!userProfile?.user_id) return;
//    //await createProfile({
//    //  updateItemValue: userProfile,
//    //  id: userProfile?.user_id,
//    //})
//    //  .unwrap()
//    //  .then((data) => {
//    //    if (!data) return;
//    //    dispatch(ModalAction.clearSelect());
//    //    navigate(`/auth/new-preferences`);
//    //  })
//    //  .catch((e) => console.log(e?.message));
//    //console.log(userProfile);
//  };
//
//  return (
//    <form
//      ref={ref}
//      method="post"
//      className="*:block my-3 *:font-oswald space-y-10"
//    >
//      <p className="capitalize text-xl font-oswald text-red-600 ">
//        {/*isError && error?.message*/}
//      </p>
//      <p className="capitalize text-xl font-oswald text-red-600 ">
//        {/*!isError && formError ? formError : ""*/}
//      </p>
//      <label>
//        <p>Full Name</p>
//        <Input name="fullname" placeholder="Enter FullName" />
//      </label>
//      <label>
//        Gender
//        <Select
//          name="gender"
//          items={[
//            { value: "Male", name: "Male" },
//            { value: "Female", name: "Female" },
//          ]}
//        />
//      </label>
//      <label>
//        <p>Date of birth</p>
//        <Input name="dob" type="date" placeholder="Enter FullName" />
//      </label>
//      <label>
//        School
//        <Select
//          name="school"
//          items={[
//            { value: "Kwara State University", name: "Kwara State University" },
//          ]}
//        />
//      </label>
//      <div className="flex space-x-4">
//        <Button
//          type="button"
//          //loading={isLoading}
//          trigger={triggerSubmit}
//          value={mode}
//        >
//          submit
//        </Button>
//      </div>
//    </form>
//  );
//}
//
//export default function ProfileUpdate({ mode }) {
//  //Create new Profile IN db
//
//  const dispatch = useDispatch();
//  const [editDetail, setEditDetail] = useState("username");
//
//  const location = useLocation();
//  const closeModal = () => {
//    dispatch(
//      ModalAction.toggleEditProfilePopOver({
//        isOpened: false,
//        mode: null,
//      })
//    );
//  };
//  return (
//    <main>
//      <h1 className="text-4xl my-3 first:capitalize ">
//        {mode || "User"} Profile{" "}
//        {mode === "Create" && (
//          <span className="text-red-600 my-auto inline-block">*</span>
//        )}
//      </h1>
//      {mode === "Create" && (
//        <>
//          <p className="my-4 text-[16px]">Please fill in the correct data</p>
//        </>
//      )}
//      {(mode === "Edit" || location.pathname === "/dashboard/profile") && (
//        <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
//          <Button
//            outline={editDetail !== "username"}
//            trigger={() => setEditDetail("username")}
//          >
//            Profile Detail
//          </Button>
//          <Button
//            outline={editDetail !== "photo"}
//            trigger={() => setEditDetail("photo")}
//          >
//            Profile Picture
//          </Button>
//        </article>
//      )}
//      <>
//        {/* Component for Creation Of profile only */}
//        {(!editDetail || mode.toLowerCase() === "create") && (
//          <CreateProfileDetail cancel={closeModal} />
//        )}
//
//        {/* Components for Edits/Update Of profile only */}
//        {editDetail === "photo" && mode === "edit" && (
//          <EditProfilePic cancel={closeModal} mode={mode} />
//        )}
//        {editDetail === "username" && mode === "edit" && (
//          <EditUserName cancel={closeModal} mode={mode} />
//        )}
//        {/* Components for Edits/Update Of profile only */}
//      </>
//    </main>
//  );
//}
//
