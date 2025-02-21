import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function ProfilePic({ triggerModal }) {
  return (
    <article className="space-y-2 flex shadow justify-between px-4 py-2 rounded-xl">
      <div>
        <h4 className="text-xl font-sans_serif font-bold">Add Photo</h4>
        <p className="font-poppins text-slate-400">
          Add a Face photo of yourself.
        </p>
      </div>

      <Button onClick={triggerModal} variant="link">
        Add <ChevronRight />
      </Button>
    </article>
  );
}
