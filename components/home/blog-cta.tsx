import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogCTA() {
  return (
    <section className="group relative overflow-hidden rounded-[3rem] border border-border/40 bg-card/40 backdrop-blur-md px-8 py-16 sm:px-14">
      {/* Background Decorativo - Atmosfera Neon */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-fuchsia-500/10 blur-[120px] transition-all group-hover:bg-fuchsia-500/20" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500">
            <Sparkles className="size-3" />
            Knowledge Base
          </div>
          
          <h2 className="max-w-2xl text-4xl font-black leading-[0.9] tracking-tighter sm:text-6xl">
            EXPLORE THE <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-300 bg-clip-text text-transparent">
              COMMUNITY
            </span> BLOG.
          </h2>
          
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground/80">
            Deep technical dives, modular layouts, and operating notes shaped by 
            real-world projects and peer feedback.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <Button 
            size="lg" 
            asChild 
            className="h-14 rounded-2xl bg-fuchsia-500 px-8 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-fuchsia-600 hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
          >
            <Link href="/blog">
              READ ARTICLES <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="h-14 rounded-2xl border-border/40 bg-background/40 px-8 text-xs font-black uppercase tracking-widest backdrop-blur-sm hover:bg-white/5 hover:border-white/20"
          >
            <a href="mailto:gaetanoabbaticchio8@gmail.com?subject=Community%20topic">
              SUGGEST TOPIC
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}