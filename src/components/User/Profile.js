import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

import { useRef, useState } from "react";
import Input from "../../UI/Input";

import EditProfilePic from "./PhotoUpload.js";
import Select from "../../UI/Select.js";
import UpdateEmail from "./UpdateEmail.js";
import EditUserName from "./Username.js";
import { useEditProfileMutation } from "../../store/Slices/ProfileSlice.js";
function CreateProfileDetail({ mode, save, cancel }) {
  const ref = useRef();
  const [params] = useSearchParams();

  const [createProfile, { isLoading, error, isError }] =
    useEditProfileMutation();
  const navigate = useNavigate();

  const triggerSubmit = async () => {
    let userProfile = {};
    userProfile.user_id = params.get("user_id");
    //Collect credential

    const formdata = new FormData(ref.current);

    for (const [key, value] of formdata.entries()) {
      userProfile[key] = value;
    }
    console.log(userProfile);
    if (!userProfile?.user_id) return;

    await createProfile({
      updateItemValue: userProfile,
      id: userProfile?.user_id,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        navigate(`/auth/new-preferences?user_id=${userProfile?.user_id}`);
      })
      .catch((e) => console.log(e?.message));
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
      <label>
        <p>Full Name</p>
        <Input name="fullname" placeholder="Enter FullName" />
      </label>
      <label>
        Gender
        <Select
          name="gender"
          items={[
            { value: "male", name: "Male" },
            { value: "female", name: "Female" },
            { value: "other", name: "Others" },
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
            { value: "kwasu", name: "Kwara State University" },
            { value: "ui", name: "University of Ibadan" },
            { value: "unilorin", name: "University of Ilorin" },
          ]}
        />
      </label>
      <div className="flex space-x-4">
        <Button type="button" onClick={triggerSubmit} value={mode}>
          {isLoading ? "..." : "submit"}
        </Button>
      </div>
    </form>
  );
}

export default function ProfileUpdate({ mode }) {
  //Create new Profile IN db

  const dispatch = useDispatch();
  const [editDetail, setEditDetail] = useState("username");

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

      {mode === "edit" && (
        <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
          <Button
            outline={editDetail !== "username"}
            onClick={() => setEditDetail("username")}
          >
            Profile Detail
          </Button>
          <Button
            outline={editDetail !== "photo"}
            onClick={() => setEditDetail("photo")}
          >
            Profile Picture
          </Button>
          <Button
            outline={editDetail !== "email"}
            onClick={() => setEditDetail("email")}
          >
            Email Address
          </Button>
        </article>
      )}
      <>
        {/* Component for Creation Of profile only */}
        {(!editDetail || mode.toLowerCase() === "create") && (
          <CreateProfileDetail cancel={closeModal} />
        )}
        {/* Component for Creation Of profile only */}

        {/* Components for Edits/Update Of profile only */}
        {editDetail === "photo" && mode === "edit" && (
          <EditProfilePic cancel={closeModal} mode={mode} />
        )}
        {editDetail === "email" && mode === "edit" && (
          <UpdateEmail cancel={closeModal} mode={mode} />
        )}
        {editDetail === "username" && mode === "edit" && (
          <EditUserName cancel={closeModal} mode={mode} />
        )}
        {/* Components for Edits/Update Of profile only */}
      </>
    </main>
  );
}
