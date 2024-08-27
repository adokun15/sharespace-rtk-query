import Button from "../../UI/Button";
import Input from "../../UI/Input";

export default function EditUserName({ mode, save = "", cancel }) {
  return (
    <>
      {mode.toLowerCase() === "create" && (
        <h1 className="text-3xl">Create a Unique Username</h1>
      )}
      <form method="post" className="*:block my-3 *:font-oswald space-y-5">
        <label className="*:block space-y-2">
          <p>Username </p>
          <Input placeholder="Enter a unique username" />
        </label>
        Must not start with: number, hyphen or alphanumeric character
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
      </form>
    </>
  );
}
