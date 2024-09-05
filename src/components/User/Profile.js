import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

import { useRef, useState } from "react";
import Input from "../../UI/Input";

import EditProfilePic from "./PhotoUpload.js";
import Select from "../../UI/Select.js";
import EditUserName from "./Username.js";
import { useEditProfileMutation } from "../../store/Slices/ProfileSlice.js";
import { isProfileInputInvalid } from "../../utils/Validator.js";
import { handleDashedString } from "../../utils/TimeHandler.js";
import { useIsLoggedInQuery } from "../../store/Slices/user.js";
function CreateProfileDetail({ mode, cancel }) {
  const ref = useRef();

  const { data } = useIsLoggedInQuery();
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();

  const [createProfile, { isLoading, error, isError }] =
    useEditProfileMutation();
  const navigate = useNavigate();

  const triggerSubmit = async () => {
    let userProfile = {};
    userProfile.user_id = data.user?.uid;
    //Collect credential

    const formdata = new FormData(ref.current);

    for (const [key, value] of formdata.entries()) {
      userProfile[key] = value;
    }

    if (userProfile.fullname === "") {
      setFormError("Full Name space is empty!");
      return;
    }

    if (userProfile.fullname?.length <= 3) {
      setFormError("Length of Name is small");
      return;
    }

    const inputInValid = isProfileInputInvalid(userProfile);

    if (inputInValid) {
      setFormError(inputInValid);
      return;
    }

    if (!userProfile.dob) {
      setFormError("Date of Birth space is empty!");
      return;
    }

    userProfile.dob = handleDashedString(userProfile?.dob);

    let ageLimit = new Date();
    let user_dob = new Date(userProfile?.dob);
    const user_limit_year = ageLimit.getFullYear() - 16;
    const user_limit_month = ageLimit.getMonth() + 1;
    const user_limit_date = ageLimit.getDate();

    const ageLimitInMilli = new Date(
      user_limit_year,
      user_limit_month,
      user_limit_date
    ); //millisecond

    if (user_dob.getTime() > ageLimitInMilli.getTime()) {
      setFormError("You must be atleast 16 years!");
      return;
    } else {
      setFormError("");
    }

    if (!userProfile?.user_id) return;
    await createProfile({
      updateItemValue: userProfile,
      id: userProfile?.user_id,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        dispatch(ModalAction.clearSelect());
        navigate(`/auth/new-preferences`);
      })
      .catch((e) => console.log(e?.message));
    //console.log(userProfile);
  };

  return (
    <form
      ref={ref}
      method="post"
      className="*:block my-3 *:font-oswald space-y-10"
    >
      <p className="capitalize text-xl font-oswald text-red-600 ">
        {isError && error?.message}
      </p>
      <p className="capitalize text-xl font-oswald text-red-600 ">
        {!isError && formError ? formError : ""}
      </p>
      <label>
        <p>Full Name</p>
        <Input name="fullname" placeholder="Enter FullName" />
      </label>
      <label>
        Gender
        <Select
          name="gender"
          items={[
            { value: "Male", name: "Male" },
            { value: "Female", name: "Female" },
            { value: "Other", name: "Others" },
          ]}
        />
      </label>
      <label>
        <p>Date of birth</p>
        <Input name="dob" type="date" placeholder="Enter FullName" />
      </label>
      <label>
        School
        <Select
          name="school"
          items={[
            { value: "Kwara State University", name: "Kwara State University" },
          ]}
        />
      </label>
      <div className="flex space-x-4">
        <Button
          type="button"
          loading={isLoading}
          trigger={triggerSubmit}
          value={mode}
        >
          submit
        </Button>
      </div>
    </form>
  );
}

export default function ProfileUpdate({ mode }) {
  //Create new Profile IN db

  const dispatch = useDispatch();
  const [editDetail, setEditDetail] = useState("username");

  const location = useLocation();
  const closeModal = () => {
    dispatch(
      ModalAction.toggleEditProfilePopOver({
        isOpened: false,
        mode: null,
      })
    );
  };
  return (
    <main>
      <h1 className="text-4xl my-3 first:capitalize ">
        {mode || "User"} Profile
      </h1>

      {(mode === "Edit" || location.pathname === "/dashboard/profile") && (
        <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
          <Button
            outline={editDetail !== "username"}
            trigger={() => setEditDetail("username")}
          >
            Profile Detail
          </Button>
          <Button
            outline={editDetail !== "photo"}
            trigger={() => setEditDetail("photo")}
          >
            Profile Picture
          </Button>
        </article>
      )}
      <>
        {/* Component for Creation Of profile only */}
        {(!editDetail || mode.toLowerCase() === "create") && (
          <CreateProfileDetail cancel={closeModal} />
        )}

        {/* Components for Edits/Update Of profile only */}
        {editDetail === "photo" && mode === "edit" && (
          <EditProfilePic cancel={closeModal} mode={mode} />
        )}
        {editDetail === "username" && mode === "edit" && (
          <EditUserName cancel={closeModal} mode={mode} />
        )}
        {/* Components for Edits/Update Of profile only */}
      </>
    </main>
  );
}
