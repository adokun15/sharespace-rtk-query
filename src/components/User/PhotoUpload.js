import { useState } from "react";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useUploadImageMutation } from "../../store/Slices/uploads";
import { Input } from "../ui/input";

export default function ProfilePic({ mode, cancel, uid }) {
  const [file, setFile] = useState(null);

  const [uploadMyProfile, { data, isError, error, isLoading }] =
    useUploadImageMutation();

  const handleUploadChange = (e) => {
    setFile(e?.target?.files[0]);
  };

  const handleUpload = async () => {
    if (file && file.type === "image/jpeg" && uid) {
      await uploadMyProfile({ uid, file })
        .unwrap()
        .then((data) => {
          console.log(data);
          if (data && mode === "create") {
            //Close modal
            //Send toast
          }
          if (data && mode === "edit") {
            //Close modal
            //Send toast
          }
        })
        .catch((e) => {
          //Send toast
          console.log(e?.message);
        });
    }
  };

  return (
    <Sheet>
      <article className="space-y-2 shadow px-4 py-2 rounded">
        <h4 className="text-xl font-bold font-sans">
          <FontAwesomeIcon icon={faCircleDot} /> Add Photo
        </h4>
        <p>Add a Face photo of yourself.</p>
        <Button>
          <SheetTrigger>Add</SheetTrigger>
        </Button>
      </article>
      <SheetContent>
        <SheetTitle>Add a photo</SheetTitle>

        <form className="*:block my-3 *:font-oswald space-y-5">
          <p className="capitalize text-xl font-oswald text-red-600 ">
            {/*isError && error?.message*/}
          </p>
          {/*data && data*/}
          <label className="space-y-1">
            <p className="text-xl">Profile Picture </p>
            <Input
              type="file"
              onChange={handleUploadChange}
              className="bg-slate-300 w-full py-2 px-1"
            />
          </label>

          <div className="flex space-x-4">
            <Button
              loading={isLoading}
              type="button"
              elclass="disabled:bg-purple-400"
              trigger={handleUpload}
              disabled={!file}
              value={mode}
            >
              Save
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
