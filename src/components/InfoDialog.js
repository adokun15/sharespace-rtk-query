//Pop a Modal to Expain Stuff

import { Info } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export default function InfoDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Info size={16} className="ml-2" />
      </DialogTrigger>
      <DialogContent>
        {children}
        <DialogClose asChild>
          <Button className="w-full rounded-xl">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
