import { Button } from "../ui/button";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import Card from "../../UI/Card";
import { Copy, ReceiptText, Share } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useSingleRoomateQuery } from "../../store/Slices/matches";
import DataError from "../DataError";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function UserRoommateData() {
  const { data: user } = useIsLoggedInQuery();

  const {
    data: r,
    isError,
    error,
    isLoading,
    isFetching,
  } = useSingleRoomateQuery(user?.uid);

  if (isLoading || isFetching) {
    return <p>Loader Skeleton</p>;
  }

  if (isError) {
    return <DataError error={error} />;
  }

  async function copyLink() {
    if (!r?.id) {
      toast.error("Failed to copy", { description: "Something went wrong!" });
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `https://sharespace.com.ng?roomie=${r?.id}`
      );
      toast.success("Copied to Clipboard");
    } catch (err) {
      toast.error("Failed to copy", { description: err });
    }
  }

  console.log(r);
  console.log(error);
  return (
    <main className="md:min-w-[450px]">
      <div className="flex flex-wrap px-3 items-center justify-between">
        <article>
          <h1 className="text-2xl font-semibold font-sans_serif">Your Post</h1>
          <p className="text-slate-400 text-[16px] font-sans_serif">
            View Post Information and proposals
          </p>
        </article>
        <div className="gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Share />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to send you a proposal.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={`https://sharespace.com.ng?roomie=${r?.id}`}
                    readOnly
                  />
                </div>
                <Button
                  onClick={copyLink}
                  type="submit"
                  size="sm"
                  className="px-3"
                >
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="rounded" asChild>
            <Link to="/space/proposals">
              <ReceiptText />
              <span>View Proposals</span>
            </Link>
          </Button>
        </div>
      </div>
      <Card elClass="mx-auto max-w-[680px]">
        <div className="border-b-2 flex flex-wrap  justify-between">
          <h2 className="text-xl font-semibold font-sans_serif tracking-wider">
            {r?.name}
          </h2>
          <p>
            <span className="font-sans_serif font-semibold ">
              {r?.proposal}{" "}
            </span>
            people have reach out to you
          </p>
        </div>
        <section className="md:flex px-10 gap-3 items-center my-4">
          <Avatar className="h-[120px] block md:mx-auto rounded-full w-[120px]">
            <AvatarImage src={r?.photo} />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-3 gap-4 ">
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Age
              </h3>
              <p className="text-2xl font-sans_serif">19</p>
            </article>
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
                Proposal Limit
              </h3>
              <p className="text-2xl font-sans_serif">{r?.proposal}</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Time posted
              </h3>
              <p className="text-2xl font-sans_serif">{"No done yet"}</p>
            </article>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold font-sans_serif tracking-wider">
            Quote
          </h2>
          <p className="italic px-4 w-full text-slate-500 text-wrap ">
            {r?.description}{" "}
          </p>
        </section>
      </Card>
      <Card elClass="flex flex-wrap justify-around min-h-6">
        <article>
          <h3 className="text-xs text-slate-500 font-poppins font-semibold">
            School
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
      </Card>
      <Button variant="destructive">Delete Post</Button>
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
