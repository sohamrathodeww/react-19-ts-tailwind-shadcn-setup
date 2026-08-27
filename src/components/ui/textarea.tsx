import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-xl border border-white/10 bg-white/3 px-3.5 py-2.5 text-base transition-all duration-300 outline-none placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 md:text-sm shadow-inner",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
