import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-98",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border border-white/10 shadow-[0_4px_20px_0_rgba(109,40,217,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_0_rgba(109,40,217,0.45)] hover:brightness-110",
        outline:
          "glass-lvl3 text-foreground hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg",
        secondary:
          "glass-lvl2 text-foreground hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/15 hover:shadow-md",
        ghost:
          "hover:bg-white/5 hover:text-white active:bg-white/8",
        destructive:
          "bg-destructive/20 text-red-200 border border-destructive/30 shadow-[0_4px_16px_0_rgba(239,68,68,0.15)] hover:-translate-y-0.5 hover:bg-destructive/30 hover:border-destructive/40 hover:shadow-[0_8px_24px_0_rgba(239,68,68,0.25)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 rounded-xl",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 rounded-lg px-3.5 text-xs",
        lg: "h-11 gap-2 px-6 rounded-xl text-base",
        icon: "size-10 rounded-xl",
        "icon-xs":
          "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8.5 rounded-lg",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
