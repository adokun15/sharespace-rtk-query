import { useParams } from "react-router-dom";
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
import { useRequestsFromListQuery } from "../store/Slices/matches";
import DataError from "./DataError";

export default function SingleRoommateInfo() {
  const { roomieId } = useParams();

  const { singleProposal, error, isError, isLoading, isFetching } =
    useRequestsFromListQuery(roomieId, {});

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
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Proposals</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{roomieId}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="font-poppins">
        <Card className="space-y-2">
          <h2 className="text-2xl font-sans_serif font-semibold">
            Basic Information
          </h2>
          <div className="flex my-2 gap-4 items-center">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>HU</AvatarFallback>
            </Avatar>
            <p className="text-xl">Daniel Amos</p>
          </div>
          <div className="mt-4 divide-y-2">
            <article className="flex justify-between">
              <p>Age</p>
              <p className="font-sans_serif text-xl ">19</p>
            </article>

            <article className="flex py-2 justify-between">
              <p>Religion</p>
              <p className="font-sans_serif text-xl ">Islam</p>
            </article>
          </div>
        </Card>
        <Card elClass=" space-3 min-h-4">
          <h3 className="text-2xl font-sans_serif font-semibold">Message </h3>
          <p>Hi I wanna be roomie!</p>
        </Card>
        <Card elClass="mt-4 ">
          <h3 className="text-2xl font-sans_serif font-semibold">
            School Info
          </h3>
          <div className="divide-y-2">
            <article className="flex py-2 justify-between">
              <p>Level</p>
              <p className="font-sans_serif text-xl ">200</p>
            </article>

            <article className="flex py-2 justify-between">
              <p>Department</p>
              <p className="font-sans_serif text-xl ">Comp. sci</p>
            </article>

            <article className="flex py-2 justify-between">
              <p>School</p>
              <p className="font-sans_serif text-xl ">Kwasu</p>
            </article>
          </div>
        </Card>
      </div>
      <div className="space-x-3">
        <Button>Decline Request</Button>
        <Button>Accept and add to Chat</Button>
      </div>
    </>
  );
}
