import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse min-w-[4rem] rounded-md bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
