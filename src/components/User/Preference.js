import pic from "../../image/undraw/undraw_Active_support_re_b7sj.png";
import { Button } from "../ui/button";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import Card from "../../UI/Card";
import { ReceiptText } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useSingleRoomateQuery } from "../../store/Slices/matches";
import DataError from "../DataError";
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
        <Button className="rounded" asChild>
          <Link to="/space/proposals">
            <ReceiptText />
            <span>View Proposals</span>
          </Link>
        </Button>
      </div>
      <Card elClass="mx-auto max-w-[680px]">
        <div className="border-b-2 flex flex-wrap  justify-between">
          <h2 className="text-xl font-semibold font-sans_serif tracking-wider">
            Daniel AMOS
          </h2>
          <p>
            <span className="font-sans_serif font-semibold ">10 / 15 </span>
            people have reach out to you
          </p>
        </div>
        <section className="md:flex px-10 gap-3 items-center my-4">
          <Avatar className="h-[120px] block md:mx-auto rounded-full w-[120px]">
            <AvatarImage src={pic} />
            <AvatarFallback>tN</AvatarFallback>
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
              <p className="text-2xl font-sans_serif">Islam</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Rent
              </h3>
              <p className="text-2xl font-sans_serif">270k</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Location
              </h3>
              <p className="text-2xl font-sans_serif">Westend</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Proposal Limit
              </h3>
              <p className="text-2xl font-sans_serif">15</p>
            </article>
            <article>
              <h3 className="text-xs text-slate-500 font-poppins font-semibold">
                Time posted
              </h3>
              <p className="text-2xl font-sans_serif">1 hour ago</p>
            </article>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold font-sans_serif tracking-wider">
            Quote
          </h2>
          <p className="italic px-4 w-full text-slate-500 text-wrap ">
            Hello this was what i wrote earlier! ada aad adasds aasfa adasd adad
            adasd a dada adads ada daa dasad adas adawdq sfdsf ssfd swef wfwef
            wfwef w fwf wfwfw wfwef wfwfe wfwefw wfwfw wfwef wfwfw3 wfwwf wf
            wfwfwwe wf wfwww
          </p>
        </section>
      </Card>
      <Card elClass="flex flex-wrap justify-around min-h-6">
        <article>
          <h3 className="text-xs text-slate-500 font-poppins font-semibold">
            School
          </h3>
          <p className="text-2xl font-sans_serif">Kwara State University</p>
        </article>
        <article>
          <h3 className="text-xs text-slate-500 font-poppins font-semibold">
            Department
          </h3>
          <p className="text-2xl font-sans_serif">Computer Science</p>
        </article>
        <article>
          <h3 className="text-xs text-slate-500 font-poppins font-semibold">
            Level
          </h3>
          <p className="text-2xl font-sans_serif">300</p>
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
