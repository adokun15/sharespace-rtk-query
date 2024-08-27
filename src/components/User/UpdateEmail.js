import Button from "../../UI/Button";
import Input from "../../UI/Input";

export default function UpdateEmail({ mode, save = "", cancel }) {
  return (
    <>
      <form method="post" className="*:block my-3 *:font-oswald space-y-5">
        <label className="*:block space-y-2">
          <p>Email </p>
          <Input placeholder="Enter your new Email Address" />
        </label>
        <div className="flex space-x-4">
          <Button type="button" outline onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit" value={mode}>
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
