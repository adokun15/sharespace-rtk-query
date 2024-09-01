import { useState } from "react";
import Button from "../../UI/Button";
import { useUploadImageMutation } from "../../store/Slices/ImageUpload";
import { cookie_id } from "../../utils/authHandler";

export default function ProfilePic({ mode, cancel }) {
  const [file, setFile] = useState(null);
  const [uploadMediaPhoto, { data, isError, error, isLoading }] =
    useUploadImageMutation();

  const handleUploadChange = (e) => {
    setFile(e?.target?.files[0]);
  };
  const handleUpload = async () => {
    if (file && cookie_id) {
      await uploadMediaPhoto({ uid: cookie_id, file })
        .unwrap()
        .catch((e) => console.log(e?.message));
    }
  };
  console.log(data);
  console.log(isError);
  console.log(error);

  return (
    <>
      {mode.toLowerCase() === "create" && (
        <h1 className="text-3xl">Add a photo</h1>
      )}

      <form className="*:block my-3 *:font-oswald space-y-5">
        <label className="space-y-1">
          <p className="text-xl">Profile Picture </p>
          <input
            type="file"
            onChange={handleUploadChange}
            className="bg-slate-300 w-full py-2 px-1"
          />
        </label>

        <div className="flex space-x-4">
          {mode === "edit" && (
            <Button type="button" outline onClick={cancel}>
              Cancel
            </Button>
          )}
          <Button type="button" onClick={handleUpload} value={mode}>
            {isLoading ? "uploading..." : "Save"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
}
