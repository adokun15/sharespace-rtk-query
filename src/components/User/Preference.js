import { Form } from "react-router-dom";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";
export default function UserPreferenceData({ mode }) {
  //Add Preferenced Data!
  const dispatch = useDispatch();

  return (
    <main>
      <Modal cls="top-[5%] left-[20%] w-[60%]">
        <main>
          <h1 className="text-4xl my-3 ">
            {mode || "Edit"} your personal Preferences for other users.{" "}
          </h1>
          <Form className="*:block *:font-oswald space-y-10">
            <label>
              <p>School </p>
              <input className="bg-slate-300 py-2 px-1" />
            </label>
            <label>
              <p>Level </p>
              <input className="bg-slate-300 py-2 px-1" />
            </label>
            <label>
              <p>Age</p>
              <input className="bg-slate-300 py-2 px-1" />
            </label>
            <div className="flex space-x-4">
              <Button
                outline
                onClick={() =>
                  dispatch(
                    ModalAction.toggleEditPreferencePopOver({
                      isOpened: false,
                      mode: null,
                    })
                  )
                }
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </Form>
        </main>
      </Modal>
    </main>
  );
}
