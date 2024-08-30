import { useRef } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useUsernameMutation } from "../../store/Slices/user";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EditUserName({ mode, save = "", cancel }) {
  const userNameRef = useRef();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [Username, { isError, error, isLoading }] = useUsernameMutation();

  const updateUserName = async () => {
    if (!userNameRef?.current?.value) return;

    await Username({
      id: params.get("user_id"),
      name: userNameRef?.current.value,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        navigate(`/dashboard`);
      })
      .catch((e) => console.log(e?.message));
  };

  return (
    <>
      {mode.toLowerCase() === "create" && (
        <h1 className="text-3xl">Create a Unique Username</h1>
      )}
      <form method="post" className="*:block my-3 *:font-oswald space-y-5">
        {isError && error?.message}
        <label className="*:block space-y-2">
          <p>Username </p>
          <Input ref={userNameRef} placeholder="Enter a unique username" />
        </label>
        Must not start with: number, hyphen or alphanumeric character
        <div className="flex space-x-4">
          {mode === "edit" && (
            <Button type="button" outline onClick={cancel}>
              Cancel
            </Button>
          )}
          <Button onClick={updateUserName} type="button" value={mode}>
            {isLoading ? "..." : "submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
