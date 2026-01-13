import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-500/50",
  {
    variants: {
      variant: {
        // Il bottone principale: Pieno fucsia con glow
        default:
          "bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:bg-fuchsia-600 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        // Variante tech: Rossa/Arancio per errori
        destructive:
          "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]",
        // Variante Glass: Bordo traslucido e sfondo sfocato
        outline:
          "border border-border/40 bg-background/40 backdrop-blur-sm text-foreground hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5 hover:text-fuchsia-500",
        // Variante Cyan per azioni secondarie
        secondary:
          "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02]",
        // Variante minima: Solo testo che si illumina
        ghost:
          "bg-transparent text-muted-foreground hover:text-fuchsia-500 hover:bg-fuchsia-500/5",
        link:
          "text-fuchsia-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-xl px-4 text-[9px]",
        lg: "h-14 rounded-[1.25rem] px-10 text-xs gap-3",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-14 rounded-2xl",
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
  const Comp = asChild ? Slot : "button"

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