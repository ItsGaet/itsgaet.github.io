"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "fade",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "solid" | "fade" | "glow" | "neon"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 transition-all duration-700",
        
        // --- ORIZZONTALE ---
        orientation === "horizontal" && [
          "h-[1px] w-full",
          // Fade: Scompare ai lati, ideale per il corpo del blog
          variant === "fade" && "bg-gradient-to-r from-transparent via-border/60 to-transparent",
          // Solid: Definizione netta ma sottile
          variant === "solid" && "bg-border/40",
          // Glow: Effetto luce soffusa fucsia
          variant === "glow" && "bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent",
          // Neon: Una linea laser vera e propria
          variant === "neon" && "bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_10px_rgba(217,70,239,0.4)]"
        ],

        // --- VERTICALE ---
        orientation === "vertical" && [
          "w-[1px] h-full",
          variant === "fade" && "bg-gradient-to-b from-transparent via-border/60 to-transparent",
          variant === "solid" && "bg-border/40",
          variant === "glow" && "bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent",
          variant === "neon" && "bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent shadow-[0_0_10px_rgba(217,70,239,0.4)]"
        ],

        className
      )}
      {...props}
    />
  )
}

export { Separator }