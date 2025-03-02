import { AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function DataError({ error, refetch = null }) {
  return (
    <Alert
      className="md:w-3/5 md:px-10 px-3"
      variant={error?.statusCode === 401 && "secondary"}
    >
      <AlertCircle />
      <AlertTitle>{error?.status || "Error"}</AlertTitle>
      <AlertDescription>
        <p>{error?.message || "Something went wrong"}</p>
        <>
          {error?.message?.toLowerCase()?.includes("wrong") ||
          error?.message?.toLowerCase()?.includes("slow") ||
          error?.statusCode === 500 ||
          error?.status === 500 ? (
            <Button variant="destructive" onClick={refetch}>
              Reload
            </Button>
          ) : error?.statusCode === 503 ? (
            ""
          ) : error?.statusCode === 401 ? (
            <Button variant="secondary" asChild>
              <Link className="text-center" to="/auth">
                Login <ArrowRight />
              </Link>
            </Button>
          ) : (
            ""
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
