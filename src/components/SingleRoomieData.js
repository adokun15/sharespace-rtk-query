import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Card from "../UI/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  useRequestsFromListQuery,
  useRespondToProposalMutation,
} from "../store/Slices/matches";
import DataError from "./DataError";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SingleRoommateInfo() {
  const { roomieId } = useParams();

  const reRoute = useNavigate();

  const { singleProposal, error, isError, isLoading, isFetching } =
    useRequestsFromListQuery(null, {
      skip: !roomieId,
      selectFromResult: (res) => {
        const { data, ...other } = res;
        return {
          other,
          singleProposal: data?.find(
            (proposal) => proposal?.requestId === roomieId
          ),
        };
      },
    });

  const [spinnerType, setSelectTypeLoader] = useState("");

  const [sendResponse, { isLoading: responding }] =
    useRespondToProposalMutation();

  const respondToRequest = async (e) => {
    const type = e.target.dataset.type;

    //tYPE
    setSelectTypeLoader(type);

    await sendResponse({
      reply: type,
      request: {
        requestId: singleProposal?.requestId,
        photo: singleProposal?.photo,
        name: singleProposal?.name,
        // age: info?.age,
        //Add more Info to this later --
      },
    })
      .unwrap()
      .then((data) => {
        toast.success(data);
        reRoute("/space");
      })
      .catch((e) => toast.error(e?.message));
  };

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <DataError error={error} />;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/space/proposals">Proposals</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{singleProposal?.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="font-poppins">
        <Card className="space-y-2 p-3">
          <h2 className="text-2xl font-sans_serif font-semibold">
            Basic Information
          </h2>
          <div className="flex my-2 gap-4 items-center">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                {singleProposal?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl">{singleProposal?.name}</p>
          </div>
          <div className="mt-4 divide-y-2 ">
            {/*  <article className="flex justify-between">
              <p>Age</p>
              <p className="font-sans_serif text-xl ">19</p>
            </article>
          */}
            <article className="flex py-2 justify-between">
              <p>Religion</p>
              <p className="font-sans_serif text-xl ">
                {singleProposal?.religion}
              </p>
            </article>
          </div>
        </Card>
        <Card elClass=" space-3 min-h-4 p-3">
          <h3 className="text-2xl font-sans_serif font-semibold">Message </h3>
          <p>{singleProposal?.message}</p>
        </Card>
        <Card elClass="mt-4 p-3">
          <h3 className="text-2xl font-sans_serif font-semibold">
            School Info
          </h3>
          <div className="divide-y-2">
            <article className="flex py-2 justify-between">
              <p>Level</p>
              <p className="font-sans_serif text-xl ">
                {singleProposal?.level}
              </p>
            </article>

            <article className="flex py-2 justify-between">
              <p>Department</p>
              <p className="font-sans_serif text-xl ">
                {singleProposal?.department}
              </p>
            </article>

            <article className="flex py-2 justify-between">
              <p>School</p>
              <p className="font-sans_serif text-xl ">
                {singleProposal?.school}
              </p>
            </article>
          </div>
        </Card>
      </div>

      <div className="space-x-3">
        <Button
          data-type="decline"
          className="bg-red-300/80 hover:text-white text-red-600 font-sans_serif rounded"
          onClick={respondToRequest}
        >
          {spinnerType === "decline" && responding ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Decline Request"
          )}
        </Button>
        <Button data-type="accept" onClick={respondToRequest}>
          {spinnerType === "accept" && responding ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Accept and add to Chat"
          )}
        </Button>
      </div>
    </>
  );
}
