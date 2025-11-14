//import { useIsLoggedInQuery } from "../store/Slices/user"
import { useSearchParams } from "react-router-dom";
import { useSingleRoomateQuery } from "../store/Slices/matches";
import DataError from "./DataError";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function InviteModal({ roomieId, onClose }) {
  const [info] = useSearchParams();
  const { data, isLoading, isFetching, refetch, isError, error } =
    useSingleRoomateQuery({ id: roomieId, invited: true }, { skip: !roomieId }); //Public access to anyone

  if (isLoading || isFetching) {
    //Skeleton
    return (
      <>
        <div className="flex my-3 gap-2 px-4">
          <Skeleton className="md:w-48 w-28 h-18  p-3" />
          <Skeleton className=" grow h-18 p-3 py-5" />
        </div>
      </>
    );
  }

  if (isError) {
    return <DataError refetch={refetch} error={error} />;
  }

  function redirectToWhatsApp() {
    window.open(data?.contact, "_target");
  }

  return (
    <main>
      <h1 className="text-xl tracking-wide font-sans_serif font-medium">
        I need a Roommate
      </h1>

      <p className="text-slate-400 font-poppins text-xs">
        Send a message on WhatsApp they are is looking for a Roomate!
      </p>
      <section className="px-10 my-2">
        <div>
          <Avatar className=" block md:mx-auto h-48 w-48 rounded-full">
            <AvatarImage
              className="object-cover aspect-auto"
              src={data?.photo}
            />
            <AvatarFallback>{data?.name?.split(" ")[0]}</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="mt-3 text-xl text-primary capitalize text-center font-medium font-sans_serif tracking-wider">
          {data?.name}
        </h2>

        <div className="flex flex-wrap gap-4 py-2 justify-between">
          <article>
            <h3 className="text-xs text-slate-500 font-poppins font-semibold">
              Religion
            </h3>
            <p className="text-2xl font-sans_serif">{data?.religion}</p>
          </article>
          <article>
            <h3 className="text-xs text-slate-500 font-poppins font-semibold">
              Institution
            </h3>
            <p className="text-2xl font-sans_serif">{data?.school}</p>
          </article>
        </div>
      </section>
      <div className="*:block *:mx-auto space-y-5">
        <Button onClick={redirectToWhatsApp}>Connect on WhatsApp </Button>
        <Button
          variant="ghost"
          className="ghost text-purple-400 underline"
          onClick={onClose}
        >
          Doesn't fit? Check other options
        </Button>
      </div>
    </main>
  );
}
