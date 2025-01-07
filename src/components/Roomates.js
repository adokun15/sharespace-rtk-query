import {
  useRoomateSpaceQuery,
  useSingleRoomateQuery,
} from "../store/Slices/matches";
import Card from "../UI/Card";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import RoommateDetail from "./RoommateDetail";
import { useEffect, useState } from "react";
import { BookOpen, ContactRound, ReceiptText, School } from "lucide-react";
//import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
//import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
//} from "./ui/select";
import { Input } from "./ui/input";
//import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
//import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import DataError from "./DataError";
//import LoaderSpinner from "./LoaderSpinner";

const Roomates = ({ singleRoomateId }) => {
  const {
    error,
    data: roommates,
    isLoading,
    isError,
  } = useRoomateSpaceQuery(null);

  const {
    singleRoomieError,
    data: roomie,
    isError: isSingleRoomieError,
    isLoading: loadingSingleRoomie,
  } = useSingleRoomateQuery(null, { skip: !singleRoomateId });

  const [roommate, setRoommate] = useState(null);

  useEffect(() => {
    if (
      roomie &&
      !loadingSingleRoomie &&
      !isSingleRoomieError &&
      singleRoomateId
    ) {
      setRoommate(roomie);
    }
  }, [isSingleRoomieError, loadingSingleRoomie, roomie, singleRoomateId]);

  if (isLoading) {
    //Skeleton
    return (
      <>
        <div className="flex my-3 gap-2 px-4">
          <Skeleton className="md:w-48 w-28 h-18  p-3" />
          <Skeleton className=" grow h-18 p-3 py-5" />
        </div>
        <div className="md:grid *:p-3  *:min-h-[4rem] px-10 grid-cols-3 block  gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} className="px-5 overflow-hidden space-y-6 w-fit ">
              <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
              <Skeleton className="block h-[13vh] my-4 min-w-[300px]  rounded" />
              <div className="flex gap-2">
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
                <Skeleton className="block h-4 w-12 mb-3 rounded px-3 py-2" />
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (isError) {
    return <DataError error={error} />;
  }

  const oneRoomateDetail = (id) => {
    if (!singleRoomateId) {
      const r = roommates?.find((r) => r.userId === id);
      setRoommate(r);
    }
  };

  return (
    <Sheet>
      <article className="flex gap-10">
        {/*      <Popover>
          <PopoverTrigger asChild>
            <Button>Filter Roommates</Button>
          </PopoverTrigger>
          <PopoverContent>
            <form className="space-y-7">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department (any)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="mb">MicroBiology</SelectItem>
                  <SelectItem value="acc">Accounting</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Level (any)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="christain">Christian</SelectItem>
                  <SelectItem value="muslim">Muslim</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Label>Rent</Label>
                <Slider
                  defaultValue={100}
                  min={100}
                  onValueChange={() => {}}
                  value={100}
                  step={5}
                  max={600}
                />
              </div>
              <Button>filter Roommate</Button>
            </form>
          </PopoverContent>
        </Popover>
*/}
        <div className="grow">
          <Input placeholder="Search by School Name" />
        </div>
      </article>
      <ul className="md:grid *:min-h-[4rem] grid-cols-3 block  gap-5">
        {roommates &&
          roommates?.map((roomate) => (
            <Card elClass="px-4 shadow-gray-400 rounded">
              <div className="mt-2 space-y-4">
                <Badge
                  variant="secondary"
                  className="rounded-full text-[15px] font-sans_serif ring-purple-500 bg-purple-200 tracking-wide font-semibold ring-2"
                >
                  <School width={20} height={20} className="mx-1" />
                  {roomate?.school}
                </Badge>
              </div>
              <article className="line-clamp-4 font-bold px-2 tracking-wide my-3">
                {roomate?.description}
              </article>
              <div className=" my-4 px-1 space-y-1 ">
                <div className="flex-wrap flex space-y-1  mt-2 text-slate-600 font-bold items-center gap-2 ">
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[12px] font-sans_serif tracking-wide font-semibold"
                  >
                    <ContactRound
                      className="text-purple-500 mx-1"
                      width={20}
                      height={20}
                    />
                    <span className="">
                      {roomate?.numberOfRoommates} roommate
                      {roomate?.numberOfRoommates > 1 ? "s" : ""}{" "}
                    </span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[12px] font-sans_serif tracking-wide font-semibold"
                  >
                    <ReceiptText
                      className="text-purple-500 mx-1"
                      width={20}
                      height={20}
                    />
                    <span>{roomate?.rent}k</span>
                  </Badge>
                  <Badge
                    className="rounded-full text-[12px] font-sans_serif tracking-wide font-semibold"
                    variant="secondary"
                  >
                    <BookOpen
                      className="mx-1 text-purple-500"
                      width={20}
                      height={20}
                    />
                    <span>{roomate?.department}</span>
                  </Badge>
                </div>
              </div>
              <p>{roomate?.noOfProposals || 0} reached out</p>
              <div className="flex justify-between  rounded py-2 px-3 items-center">
                <Button
                  className=" rounded"
                  onClick={() => oneRoomateDetail(roomate?.userId)}
                >
                  <SheetTrigger>View</SheetTrigger>
                </Button>
                <p className="text-xl font-semibold text-slate-400 font-serif tracking-wide">
                  {roomate?.name?.split(" ")[0]}
                </p>
              </div>
            </Card>
          ))}
      </ul>
      <SheetContent side="bottom" className="min-h-[40vh]">
        <RoommateDetail
          roommate={roommate}
          error={singleRoomieError}
          loading={loadingSingleRoomie}
        />
      </SheetContent>
    </Sheet>
  );
};

export default Roomates;
