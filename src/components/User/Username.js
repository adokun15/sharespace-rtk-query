import { useEffect, useRef, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import {
  useIsLoggedInQuery,
  useUsernameMutation,
} from "../../store/Slices/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalAction } from "../../store/Slices/modal";

export default function EditUserName({ mode, cancel }) {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const [Username, { data: username, isError, error, isLoading }] =
    useUsernameMutation();

  const pathname = useLocation();
  const dispatch = useDispatch();

  const [formError, setFormError] = useState("");

  const { data } = useIsLoggedInQuery();

  const updateUserName = async () => {
    //Validate Inputs
    if (!userNameRef?.current?.value) return;

    if (userNameRef?.current?.value.length <= 3) {
      setFormError(`${userNameRef?.current?.value} is too short!`);
      return;
    }

    if (!data?.user?.uid) return;

    await Username({
      id: data?.user?.uid,
      name: userNameRef?.current.value,
    })
      .unwrap()
      .catch((e) => console.log(e?.message));
  };
  useEffect(() => {
    if (pathname?.pathname === "/auth/username" && username) {
      navigate(`/auth/new-photo`);
    }

    if (pathname?.pathname === "/dashboard/profile" && username) {
      setTimeout(() => {
        dispatch(
          ModalAction.toggleEditProfilePopOver({ mode: "Edit", prevs: null })
        );
      }, 1500);
    }
  }, [username, pathname?.pathname, dispatch, navigate]);

  return (
    <>
      {mode?.toLowerCase() === "create" && (
        <h1 className="text-3xl">Create a Unique Username</h1>
      )}
      <form method="post" className="*:block my-3 *:font-oswald space-y-5">
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
          {isError && error?.message}
        </p>
        <p className="capitalize ease-in transition-all my-2 text-xl font-oswald text-red-600 ">
          {!isError && formError ? formError : ""}
        </p>
        {username && username}
        <label className="*:block space-y-2">
          <p>Username </p>
          <Input ref={userNameRef} placeholder="Enter a unique username" />
        </label>
        Must not start with: number, hyphen or alphanumeric character
        <div className="flex space-x-4">
          {mode?.toLowerCase() === "edit" && (
            <Button type="button" outline disabled={isLoading} trigger={cancel}>
              Cancel
            </Button>
          )}
          <Button
            loading={isLoading}
            trigger={updateUserName}
            type="button"
            value={mode}
          >
            submit
          </Button>
        </div>
      </form>
    </>
  );
}
