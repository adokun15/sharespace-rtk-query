import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function DataError({ error, refetch = null }) {
  return (
    <Alert>
      <AlertCircle />
      <AlertTitle>{error?.status || "Error"}</AlertTitle>
      <AlertDescription>
        <p>{error?.message || "Something went wrong"}</p>
        <>
          {error?.statusCode === 500 ? (
            <Button onClick={refetch}>Reload</Button>
          ) : error?.statusCode === 503 ? (
            ""
          ) : (
            <Button asChild>
              <Link className="text-center" to="/auth">
                Login
              </Link>
            </Button>
          )}
        </>
      </AlertDescription>
    </Alert>
  );
}
//500(sERVER)

//400(bAD REQUEST)

//401(fORBIDDEN)

//503(UNAVAILABLE)

//404(nOT FOUND)
