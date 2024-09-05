import { useEffect, useState } from "react";
import Button from "../../UI/Button";
import { useUploadImageMutation } from "../../store/Slices/ImageUpload";

import { useIsLoggedInQuery } from "../../store/Slices/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

export default function ProfilePic({ mode, cancel }) {
  const [file, setFile] = useState(null);

  const [uploadMediaPhoto, { data, isError, error, isLoading }] =
    useUploadImageMutation();

  const { data: currentuser } = useIsLoggedInQuery();

  const handleUploadChange = (e) => {
    setFile(e?.target?.files[0]);
  };

  const navigate = useNavigate();

  const pathname = useLocation();
  const dispatch = useDispatch();

  const handleUpload = async () => {
    //console.log(file);
    if (file && file.type === "image/jpeg" && currentuser?.user?.uid) {
      await uploadMediaPhoto({ uid: currentuser?.user?.uid, file })
        .unwrap()
        .then((data) => {
          if (data && mode === "Create") {
          }
          if (data && mode === "Edit") {
          }
        })
        .catch((e) => console.log(e?.message));
    }
  };

  useEffect(() => {
    if (pathname?.pathname === "/auth/new-photo" && data) {
      navigate("/dashboard");
    }

    if (pathname?.pathname === "/dashboard/profile" && data) {
      setTimeout(() => {
        dispatch(
          ModalAction.toggleEditProfilePopOver({ mode: "Edit", prevs: null })
        );
      }, 1500);
    }
  }, [data, pathname?.pathname, dispatch, navigate]);

  return (
    <>
      {mode?.toLowerCase() === "create" && (
        <h1 className="text-3xl">Add a photo</h1>
      )}

      <form className="*:block my-3 *:font-oswald space-y-5">
        <p className="capitalize text-xl font-oswald text-red-600 ">
          {isError && error?.message}
        </p>
        {data && data}
        <label className="space-y-1">
          <p className="text-xl">Profile Picture </p>
          <input
            type="file"
            onChange={handleUploadChange}
            className="bg-slate-300 w-full py-2 px-1"
          />
        </label>

        <div className="flex space-x-4">
          {mode?.toLowerCase() === "edit" && (
            <Button type="button" outline={true} trigger={cancel}>
              Cancel
            </Button>
          )}
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
    </>
  );
}
