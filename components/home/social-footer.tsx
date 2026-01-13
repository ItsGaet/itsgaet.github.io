import { ArrowUpRight, Github, Instagram, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const socials = [
  { icon: Github, href: "https://github.com/itsgaet", label: "Github", color: "hover:text-[#2ea44f]" },
  { icon: Linkedin, href: "https://linkedin.com/in/itsgaet", label: "LinkedIn", color: "hover:text-[#0077b5]" },
  { icon: Twitter, href: "https://x.com/itsgaet", label: "Twitter", color: "hover:text-fuchsia-500" },
  { icon: Instagram, href: "https://instagram.com/itsgaet", label: "Instagram", color: "hover:text-[#e4405f]" },
]

export default function SocialFooter() {
  const currentYear = 2026 // Come da istruzioni di sistema

  return (
    <footer className="w-full space-y-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        
        {/* Box Principale CTA */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-md p-8 lg:col-span-8">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
            <div className="absolute -left-10 -bottom-10 size-64 rounded-full bg-fuchsia-500/5 blur-[100px]" />
          </div>

          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-500">
                <span className="h-1 w-1 rounded-full bg-fuchsia-500 animate-ping" />
                Available for projects
              </div>
              <h2 className="max-w-md text-3xl font-black leading-tight tracking-tighter sm:text-5xl">
                Let&apos;s build something <span className="text-muted-foreground/40 italic font-medium">calm</span> and useful.
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-2xl bg-fuchsia-500 px-6 text-[11px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:bg-fuchsia-600">
                <a href="mailto:gaetanoabbaticchio8@gmail.com">
                  GET IN TOUCH <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="h-12 rounded-2xl border-border/40 bg-background/40 px-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5">
                <a href="https://github.com/itsgaet" target="_blank" rel="noreferrer">
                  GITHUB PROFILE
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Griglia Social */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-border/40 bg-card/20 p-6 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 ${social.color}`}
            >
              <social.icon className="mb-3 size-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Info bar finale */}
      <div className="flex flex-col items-center justify-between gap-6 border-t border-border/10 pt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 md:flex-row">
        <div className="flex items-center gap-6">
          <p>© {currentYear} ITSGAET</p>
          <span className="h-4 w-px bg-border/40" />
          <p className="text-fuchsia-500/50">Community Notes</p>
        </div>
        
        <div className="flex items-center gap-8">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500/50" />
            Bisceglie, IT
          </p>
          <a href="#top" className="transition-colors hover:text-fuchsia-500">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}