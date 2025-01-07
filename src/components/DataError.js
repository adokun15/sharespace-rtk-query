import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function DataError({ error }) {
  return (
    <Alert>
      <AlertCircle />
      <AlertTitle>{error?.status || "Error"}</AlertTitle>
      <AlertDescription>
        {error?.message || "Somthing went wrong"}
      </AlertDescription>
    </Alert>
  );
}
//500(sERVER)

//400(bAD REQUEST)

//401(fORBIDDEN)

//503(UNAVAILABLE)

//404(nOT FOUND)
