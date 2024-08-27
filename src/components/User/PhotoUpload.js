import Button from "../../UI/Button";

export default function ProfilePic({ mode, cancel }) {
  return (
    <>
      {mode.toLowerCase() === "create" && (
        <h1 className="text-3xl">Add a photo</h1>
      )}

      <form className="*:block my-3 *:font-oswald space-y-5">
        <label className="space-y-1">
          <p className="text-xl">Profile Picture </p>
          <input type="file" className="bg-slate-300 w-full py-2 px-1" />
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
      </form>
    </>
  );
}
