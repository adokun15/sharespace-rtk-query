import { Button } from "../ui/button";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import { Clock, Copy, ReceiptText, Share } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import {
  useDeleteSingleRoomateMutation,
  useSingleRoomateQuery,
} from "../../store/Slices/matches";
import DataError from "../DataError";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import LoaderSpinner from "../LoaderSpinner";
import { useState } from "react";

export default function UserRoommateData() {
  const {
    data: user,
    isLoading: userLoading,
    refetch: userRefetch,
    error: userError,
    isError: isUserError,
  } = useIsLoggedInQuery();

  const {
    data: r,
    isError,
    error,
    refetch,
    isLoading,
    isFetching,
  } = useSingleRoomateQuery(
    { id: user?.uid, invited: false }, //The User his trying to data
    { skip: !user?.uid }
  );

  const [deletePost, { isLoading: deleting }] = useDeleteSingleRoomateMutation({
    skip: !user?.uid,
  });

  const [contact, setContact] = useState("");
  const [controlledModal, setControlModal] = useState(false);

  if (isLoading || isFetching || userLoading) {
    return <LoaderSpinner message="Getting your post.." />;
  }

  if (isError || isUserError) {
    return (
      <DataError refetch={userRefetch || refetch} error={userError || error} />
    );
  }

  async function copyLink() {
    if (!r?.id) {
      toast.error("Failed to copy", { description: "Something went wrong!" });
      return;
    }

    //const toNumber = +contact
    if (!contact || contact.length !== 10 || isNaN(+contact)) {
      toast.error("Failed to copy", { description: "Invalid Input" });
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `https://sharespace.com.ng?roomie=${r?.id}&wn=${contact}`
      );
      //Alert User
      toast.success("Copied to Clipboard");

      //CLose Modal
      setControlModal((p) => !p);
    } catch (err) {
      toast.error("Failed to copy", { description: err });
    }
  }

  async function DeletePostHandler() {
    if (!user?.uid) {
      toast.error("Something went wrong");
    }
    await deletePost(user?.uid)
      .unwrap()

      .then((data) => toast.success(data?.message))
      .catch((err) =>
        toast.error("Failed To Delete", { description: err?.message })
      );
  }
  return (
    <main className="md:min-w-[450px] space-y-6">
      <div className="flex flex-wrap px-3 items-center justify-between">
        <article>
          <h1 className="text-2xl font-semibold font-sans_serif">Your Post</h1>
          <p className="text-slate-400 text-[16px] font-sans_serif">
            {r?.target === "roomie"
              ? "Roommate"
              : r?.target === "spacer"
              ? "Accomodation"
              : ""}{" "}
            Post
          </p>
        </article>
        <div className="gap-3">
          <Dialog
            open={controlledModal}
            onOpenChange={() => setControlModal((p) => !p)}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Share />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  <h1 className="text-xl font-serif">Share Post link</h1>
                </DialogTitle>
              </DialogHeader>
              <div className=" ">
                <div className="grid flex-1 gap-2">
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-2xl">(+234)</p>
                    <Input
                      value={contact}
                      maxLength={10}
                      onChange={(e) => {
                        setContact(e?.target?.value);
                      }}
                      id="contact"
                      placeholder="Enter your WhatsApp Contact"
                    />
                  </div>
                  <p className="my-3 text-xs break-all">
                    {`https://sharespace.com.ng?roomie=${r?.id}`}
                    <span
                      className={`transition duration-500 ease-in-out ${
                        contact ? "visible" : "invisible"
                      }`}
                    >{`&wn=${contact}`}</span>
                  </p>
                </div>
                <Button
                  disabled={contact.length !== 10}
                  onClick={copyLink}
                  type="submit"
                  variant=""
                  size="sm"
                  className="w-full px-3"
                >
                  <span className="">Copy Link</span>
                  <Copy />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogDescription>
                  Share link to friends or group to find your roommate quicker.{" "}
                  {/*  <Link
                    to="#"
                    className="text-purple-500 underline tracking-wider"
                  >
                    Share to WhatApp
                  </Link>
                */}
                </DialogDescription>

                {/*<DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>*/}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mx-auto max-w-[680px]">
        <div className="flex justify-between border-b-2 ">
          <p>
            <span className="font-sans_serif font-semibold ">
              {r?.noOfProposals} / {r?.proposal}{" "}
            </span>
            people have reach out to you
          </p>
          <p className="flex gap-2">
            <Clock />
            <span>2h ago</span>
          </p>
        </div>
        <section className="px-10 my-2">
          <div>
            <Avatar className="h-[120px] block md:mx-auto rounded-full w-[120px]">
              <AvatarImage src={r?.photo} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="mt-3 text-xl text-purple-500 font-medium font-sans_serif tracking-wider">
            Personal
          </h2>

          <div className="md:grid grid-col-3 space-y-4 md:space-y-0 md:ml-10 py-2 justify-between">
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Religion
              </h3>
              <p className="text-2xl font-sans_serif">{r?.religion}</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Rent
              </h3>
              <p className="text-2xl font-sans_serif">{r?.rent}k</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Location
              </h3>
              <p className="text-2xl font-sans_serif">{r?.location}</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Institution
              </h3>
              <p className="text-2xl font-sans_serif">{r?.school}</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Department
              </h3>
              <p className="text-2xl font-sans_serif">{r?.department}</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Level
              </h3>
              <p className="text-2xl font-sans_serif">{r?.level}</p>
            </article>
          </div>
        </section>

        <section className="px-10 my-1">
          <h2 className="text-xl text-purple-500 font-medium font-sans_serif tracking-wider">
            Quote
          </h2>
          <p className="italic px-4 w-full text-slate-500 text-wrap ">
            {r?.description}{" "}
          </p>
        </section>
      </div>
      <div className="flex gap-3">
        <Button variant="destructive" onClick={DeletePostHandler}>
          {deleting ? "deleting..." : "Delete Post"}
        </Button>
        <Button className="rounded" asChild>
          <Link to="/space/proposals">
            <ReceiptText />
            <span>View Proposals</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}

/**
 * 
  const [habits, setHabits] = useState([]);
  const [habitsEntriesString, setHabitsEntryString] = useState("");

  const habitHandler = (e) => {
    setHabitsEntryString(e?.target.value);
    };
    
  const removefromHabitList = (h) => {
    setHabits((prevstate) => {
      const newHabit = prevstate?.filter((habit) => h !== habit);
      return newHabit;
      });
  };

  useEffect(() => {
    if (habitsEntriesString && habitsEntriesString.includes(" ")) {
      setHabits((p) => [...p, habitsEntriesString]);

      setTimeout(() => {
        setHabitsEntryString("");
      }, 100);
    }
  }, [habitsEntriesString]);

  const offFocusHabit = () => {
    if (habitsEntriesString !== "") {
      setHabits((p) => [...p, habitsEntriesString]);
      setHabitsEntryString("");
    }
  };

 */
