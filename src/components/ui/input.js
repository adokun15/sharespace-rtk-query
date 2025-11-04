import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `flex text-base  h-12 w-full  ring-2 ring-primary ring-offset-2
        rounded-xl border-primary border bg-transparent px-3 
        py-1 shadow-sm transition-colors file:border-0
         file:bg-transparent file:text-sm file:font-medium 
         file:text-foreground placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-1
           focus-visible:ring-ring disabled:cursor-not-allowed placeholder:text-slate-400
            disabled:opacity-50 text-[16px]`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
