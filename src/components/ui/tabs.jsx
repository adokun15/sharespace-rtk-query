import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      `inline-flex h-9 items-center justify-center 
      w-full md:max-w-[400px] bg-none py-4 px-1 gap-3 
      text-muted-foreground rounded`,
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `overflow-x-hidden w-full font-poppins 
      tracking-wide inline-flex items-center 
      justify-center whitespace-nowrap 
      px-3 py-3 text-sm font-medium
      ring-offset-background transition-all
       outline-none rounded-xl
       disabled:pointer-events-none
              disabled:opacity-50 data-[state=active]:text-white data-[state=active]:bg-secondary bg-slate-300
     text-foreground focus-visible:bg-secondary/60
      data-[state=active]:shadow`,
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
