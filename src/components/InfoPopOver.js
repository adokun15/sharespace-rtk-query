import { Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

//Mini Details explanation
export default function InfoPopOver({ children }) {
  return (
    <Popover className="">
      <PopoverTrigger className="">
        <Info size={16} className="ml-2" />
      </PopoverTrigger>
      <PopoverContent className="w-fit text-xs rounded tracking-wide font-poppins">
        {children}
      </PopoverContent>
    </Popover>
  );
}
