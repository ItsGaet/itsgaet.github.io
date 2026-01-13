import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[10px] font-black tracking-[0.15em] uppercase w-fit whitespace-nowrap shrink-0 transition-all duration-300 [&>svg]:size-3 gap-1.5 focus-visible:ring-1 focus-visible:ring-fuchsia-500/50",
  {
    variants: {
      variant: {
        // Variante principale: Fucsia Neon
        default:
          "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.1)] hover:border-fuchsia-500/50 hover:bg-fuchsia-500/20",
        // Variante Cyan per contrasto
        secondary:
          "border-cyan-500/30 bg-cyan-500/10 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:border-cyan-500/50 hover:bg-cyan-500/20",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400",
        // Variante minimale ma definita
        outline:
          "border-border/40 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }