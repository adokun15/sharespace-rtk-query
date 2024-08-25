import { Form } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

import { useState } from "react";
import Input from "../../UI/Input";

function EditProfilePic({ mode, upload, cancel }) {
  return (
    <Form className="*:block my-3 *:font-oswald space-y-10">
      <label>
        <p>Profile Picture </p>
        <input type="file" className="bg-slate-300 py-2 px-1" />
      </label>

      <div className="flex space-x-4">
        {mode === "edit" && (
          <Button type="button" outline onClick={cancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" value={mode}>
          Save
        </Button>
      </div>
    </Form>
  );
}
function EditProfileDetail({ mode, save, cancel }) {
  return (
    <Form method="post" className="*:block my-3 *:font-oswald space-y-10">
      {mode.trim().toLowerCase() === "create" && (
        <label>
          <p>A Profile Picture </p>
          <Input type="file" placeholder="Enter a unique username" />
        </label>
      )}
      <label>
        <p>Username </p>
        <Input placeholder="Enter a unique username" />
      </label>
      <div id="gender">
        <p>Gender</p>

        <label htmlFor="gender">
          male
          <input type="radio" />
        </label>

        <label htmlFor="gender">
          female
          <input type="radio" />
        </label>
      </div>
      <label>
        <p>Full Name</p>
        <Input placeholder="Enter FullName" />
      </label>
      <label>
        <p>Date of birth</p>
        <Input type="date" placeholder="Enter FullName" />
      </label>
      <label>
        <p>School</p>
        <Input type="text" placeholder="Enter your University Name" />
      </label>
      <div className="flex space-x-4">
        {mode === "edit" && (
          <Button type="button" outline onClick={cancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" value={mode}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default function ProfileUpdate({ mode }) {
  //Create new Profile IN db

  const dispatch = useDispatch();
  const [editDetail, setEditDetail] = useState(true);

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
        {mode || "User"} Profile{" "}
      </h1>
      {mode === "edit" && (
        <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
          <Button outline={!editDetail} onClick={() => setEditDetail(true)}>
            Profile Detail
          </Button>
          <Button outline={editDetail} onClick={() => setEditDetail(false)}>
            Profile Picture
          </Button>
        </article>
      )}
      <>
        {editDetail && <EditProfileDetail mode={mode} cancel={closeModal} />}
        {!editDetail && mode === "edit" && (
          <EditProfilePic cancel={closeModal} mode={mode} />
        )}
      </>
    </main>
  );
}
