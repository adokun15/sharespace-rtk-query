import { Form } from "react-router-dom";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

import { useState } from "react";

function EditProfilePic({ upload, cancel }) {
  return (
    <Form className="*:block my-3 *:font-oswald space-y-10">
      <label>
        <p>Profile Picture </p>
        <input type="file" className="bg-slate-300 py-2 px-1" />
      </label>

      <div className="flex space-x-4">
        <Button outline onClick={cancel}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </Form>
  );
}
function EditProfileDetail({ save, cancel }) {
  return (
    <Form className="*:block my-3 *:font-oswald space-y-10">
      <label>
        <p>username </p>
        <input className="bg-slate-300 py-2 px-1" />
      </label>
      <label>
        <p>Email</p>
        <input className="bg-slate-300 py-2 px-1" />
      </label>
      <div className="flex space-x-4">
        <Button outline onClick={cancel}>
          Cancel
        </Button>
        <Button>Save</Button>
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
    <Modal cls="top-[5%] left-[20%] w-[60%]">
      <main>
        <h1 className="text-4xl my-3 ">{mode || "User"} Profile </h1>

        <article className="flex *:rounded text-[16px] *:p-1 my-3 space-x-2">
          <Button outline={!editDetail} onClick={() => setEditDetail(true)}>
            Profile Detail
          </Button>
          <Button outline={editDetail} onClick={() => setEditDetail(false)}>
            Profile Picture
          </Button>
        </article>
        <>
          {editDetail && <EditProfileDetail cancel={closeModal} />}
          {!editDetail && <EditProfilePic cancel={closeModal} />}
        </>
      </main>
    </Modal>
  );
}
