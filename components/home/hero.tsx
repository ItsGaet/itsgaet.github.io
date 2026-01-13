import Link from "next/link"
import { ArrowUpRight, Terminal, Globe, Cpu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-border/40 bg-card/30 backdrop-blur-xl px-8 py-20 sm:px-14 lg:py-28">
      {/* Sfondo Dinamico */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="absolute -left-20 top-[-10%] size-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-[-10%] size-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        
        {/* Sinistra: Main Content */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
              <Terminal className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-500">itsgaet studio // v2.0</p>
              <p className="text-sm font-bold text-muted-foreground/60">Italy — Remote</p>
            </div>
          </div>

          <h1 className="text-5xl font-black leading-[0.85] tracking-tighter sm:text-7xl lg:text-8xl">
            BUILDING <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-300 bg-clip-text text-transparent">SYSTEMS</span> <br />
            NOT JUST UI.
          </h1>

          <p className="max-w-xl text-xl leading-relaxed text-muted-foreground/80">
            Un blog della community dove condivido <span className="text-foreground font-bold">note tecniche</span>, pattern modulari e workflow per chi costruisce prodotti digitali moderni.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="h-14 rounded-2xl bg-fuchsia-500 px-10 text-xs font-black uppercase tracking-widest hover:bg-fuchsia-600 hover:scale-105 transition-all shadow-[0_0_25px_rgba(217,70,239,0.4)]">
              <Link href="/blog">EXPLORE ARCHIVE <ArrowUpRight className="ml-2 size-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 rounded-2xl border-border/40 bg-background/40 px-10 text-xs font-black uppercase tracking-widest backdrop-blur-sm hover:bg-white/5">
              <a href="mailto:gaetanoabbaticchio8@gmail.com">GET IN TOUCH</a>
            </Button>
          </div>

          <div className="flex items-center gap-8 border-t border-border/10 pt-10">
            {[
              { label: "Focus", val: "Design Eng" },
              { label: "Status", val: "Available" },
              { label: "Role", val: "Tech Lead" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">{stat.label}</p>
                <p className="text-sm font-bold text-foreground/80">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Destra: Tech Display Card */}
        <div className="relative lg:mt-4">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/60 p-8 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-red-500/50" />
                <div className="size-2 rounded-full bg-amber-500/50" />
                <div className="size-2 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest">STK_VER: 2026.01</span>
            </div>

            <div className="mt-12 space-y-8">
              {[
                { icon: Globe, title: "Scalable Infra", desc: "Edge-first architectures." },
                { icon: Cpu, title: "Modular Components", desc: "Radix + Tailwind primitives." },
                { icon: Zap, title: "Fast Delivery", desc: "Built for speed and DX." }
              ].map((item, i) => (
                <div key={i} className="group/item flex items-start gap-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/40 bg-background/40 transition-all group-hover/item:border-fuchsia-500/50 group-hover/item:text-fuchsia-500">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Elemento decorativo "Code" */}
            <div className="mt-12 rounded-xl bg-background/60 p-4 font-mono text-[10px] text-fuchsia-500/60">
              <p>{`> Initializing systems...`}</p>
              <p className="text-muted-foreground/30">{`> Component library loaded`}</p>
              <p className="text-emerald-500/60">{`> Build status: Success`}</p>
            </div>
          </div>

          {/* Cerchio decorativo esterno */}
          <div className="absolute -bottom-6 -right-6 -z-10 size-32 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}