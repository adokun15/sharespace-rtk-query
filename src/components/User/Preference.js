//My post -->
import { Button } from "../ui/button";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import {
  Clock,
  Copy,
  Info,
  Loader2,
  MoreVertical,
  ReceiptText,
  Share,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import {
  useDeleteSingleRoomateMutation,
  useSingleRoomateQuery,
  useUserRoomateSpaceQuery,
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
import Card from "../../UI/Card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

export default function UserRoommateData() {
  const {
    data: user,
    isLoading: userLoading,
    isError: isUserError,
  } = useIsLoggedInQuery();

  const {
    data: r,
    isError,
    error,
    refetch,
    isLoading,
    isFetching,
  } = useUserRoomateSpaceQuery(
    { id: user?.uid, invited: false }, //The User his trying to data
    {
      skip: !user?.uid,
      /*    selectFromResult: (res) => {
        const { data, ...other } = res;

        //Now, Today, Yesterday, days, {21 may, 2024}
        const detectDate = () => {
          const newDate = new Date();
          const postDate = new Date(data?.timePosted);

          if (newDate.getDate() === postDate.getDate()) {
            return "Today";
          }

          if (newDate.getDate() - 1 === postDate.getDate()) {
            return "Yesterday";
          }

          return `${postDate.toLocaleDateString("en-GB")} `;
        };

        return {
          ...other,
          data: { ...data, timePosted: detectDate() },
        };
      },*/
    }
  );

  //console.log(r);
  const [deletePost, { isLoading: deleting }] = useDeleteSingleRoomateMutation({
    skip: !user?.uid,
  });

  //const [contact, setContact] = useState("");
  //const [controlledModal, setControlModal] = useState(false);

  if (isLoading || isFetching || userLoading) {
    return <LoaderSpinner message="Getting your post.." />;
  }

  if (isError || isUserError) {
    return <DataError refetch={refetch} error={error} />;
  }

  async function ShareToWhatsapp() {}
  //fetch wa.link and change preview message
  /*
  async function copyLink() {
    if (!r?.id) {
      toast.error("Failed to copy", { description: "Something went wrong!" });
      return;
    }
    //const toNumber = +contact
    if (!contact || contact.length !== 11 || isNaN(+contact)) {
      toast.error("Failed to copy", { description: "Invalid Input" });
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `https://sharespace.com.ng?roomie=${r?.id}`
      );
      //Alert User
      toast.success("Copied to Clipboard");

      //CLose Modal
      setControlModal((p) => !p);
    } catch (err) {
      toast.error("Failed to copy", { description: err });
    }
  }
*/
  async function DeletePostHandler(id) {
    if (!user?.uid) {
      toast.error("Something went wrong");
    }

    await deletePost(id)
      .unwrap()
      .then((data) => toast.success(data?.message))
      .catch((err) =>
        toast.error("Failed To Delete", { description: err?.message })
      );
  }

  return (
    <main className="w-full space-y-6">
      <ul className="grid md:grid-cols-3 grid-cols-1  gap-5">
        {r &&
          r?.map((roomate, i) => (
            <Card
              key={i}
              elClass="px-4 py-1 mb-1 
              shadow-gray-400 w-full md:max-w-1/3 rounded"
            >
              <div className=" items-center flex justify-between">
                <Popover>
                  <Badge
                    className="rounded-full text-xs capitalize 
                                    font-sans_serif bg-transparent  
                                    hover:bg-transparent
                                    text-primary tracking-wide font-semibold"
                  >
                    {roomate?.school_short}
                    <PopoverTrigger asChild>
                      <Info size={16} className="ml-2" />
                    </PopoverTrigger>
                  </Badge>
                  <PopoverContent className="w-fit text-xs rounded tracking-wide font-poppins">
                    <p>{roomate?.school}</p>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <MoreVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit rounded tracking-wide font-poppins">
                    <Button
                      variant="destructive"
                      className="bg-red-300/80 hover:text-white text-red-600 font-sans_serif rounded"
                      onClick={() => DeletePostHandler(roomate.id)}
                    >
                      {deleting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Delete Post"
                      )}
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              <article className="h-[98px] bg-slate-50  line-clamp-4 font-poppins px-2 tracking-wide my-3">
                {roomate?.description}
              </article>

              <Button className="rounded font-poppins" variant="primary">
                Active
              </Button>
            </Card>
          ))}
      </ul>
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
