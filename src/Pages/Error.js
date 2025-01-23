import { Link, useRouteError } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Alert>
      <AlertTitle>An Error Occured</AlertTitle>
      <AlertDescription>
        <p>
          {error?.message || error?.data?.messsage || "Something went wrong"}
        </p>
        <>
          <Button asChild variant="outline">
            <Link className="text-center" to="/">
              Go Home
            </Link>
          </Button>
        </>
      </AlertDescription>
    </Alert>
  );
}
