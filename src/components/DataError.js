import { AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function DataError({ error, refetch = null }) {
  return (
    <Alert
      className="md:w-3/5 md:px-10 px-3"
      variant={error?.statusCode === 401 && "destructive"}
    >
      <AlertCircle />
      <AlertTitle>{error?.status || "Error"}</AlertTitle>
      <AlertDescription>
        <p>{error?.message || "Something went wrong"}</p>
        <>
          {error?.statusCode === 500 ? (
            <Button variant="secondary" onClick={refetch}>
              Reload
            </Button>
          ) : error?.statusCode === 503 ? (
            ""
          ) : (
            <Button variant="destructive" asChild>
              <Link className="text-center" to="/auth">
                Login <ArrowRight />
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
