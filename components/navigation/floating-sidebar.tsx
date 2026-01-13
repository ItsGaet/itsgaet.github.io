"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Github, Home, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Github", href: "https://github.com/itsgaet", external: true, icon: Github },
]

export default function FloatingSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar - Vertical Dock */}
      <nav className="fixed left-8 top-1/2 z-[100] hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-white/10 bg-black/20 p-3 backdrop-blur-2xl md:flex shadow-[0_0_40px_rgba(0,0,0,0.3)]">
        
        {/* Indicatore superiore decorativo */}
        <div className="size-1.5 rounded-full bg-fuchsia-500 animate-pulse" />

        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link 
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className={cn(
                  "group relative flex size-12 items-center justify-center rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-fuchsia-400"
                )}
              >
                <Icon className="size-5 shrink-0" />
                
                {/* Tooltip Labelling */}
                <span className="absolute left-16 scale-90 rounded-xl border border-white/10 bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 backdrop-blur-md">
                  {item.label}
                </span>

                {/* Puntino attivo laterale */}
                {isActive && (
                  <div className="absolute -left-1 h-4 w-0.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="h-px w-6 bg-white/10" />

        {/* Action extra: Contact */}
        <a 
          href="mailto:gaetanoabbaticchio8@gmail.com"
          className="flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-cyan-400"
        >
          <Mail className="size-5" />
        </a>
      </nav>

      {/* Mobile Nav - Glass Island */}
      <nav className="fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-[2rem] border border-white/10 bg-black/40 p-2 backdrop-blur-3xl md:hidden shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-12 items-center gap-3 rounded-[1.5rem] px-5 transition-all duration-300",
                isActive 
                  ? "bg-fuchsia-500 text-white shadow-lg" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "scale-110")} />
              {isActive && (
                <span className="text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}