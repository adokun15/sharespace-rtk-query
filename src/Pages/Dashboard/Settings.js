import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

export default function Settings() {
  return (
    <main className="mb-4">
      <h2 className="text-4xl">Settings</h2>
      <Card elClass="space-y-4">
        <h2 className="capitalize text-3xl font-roboto font-bold">
          Account removal
        </h2>
        <p className="font-oswald">
          Remove your account permanently from ShareSpace
        </p>
        <Button elclass="bg-red-600 text-white ring-1 ring-red-700 ring-offset-2 font-oswald">
          Delete
        </Button>
      </Card>
      <div className="text-center *:px-2 divide-x-2">
        <Link className=" text-purple-500 underline font-oswald">Terms</Link>
        <Link className=" text-purple-500 underline font-oswald">
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}
