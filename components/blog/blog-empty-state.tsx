import { SearchX, RefreshCcw } from "lucide-react"

export default function BlogEmptyState() {
  return (
    <div className="col-span-full group relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-md px-8 py-20 text-center shadow-2xl">
      {/* Background Decorativo - Luce Pulsante */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-fuchsia-500/5 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Icona con effetto Glow */}
        <div className="relative flex size-20 items-center justify-center rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 shadow-[0_0_30px_rgba(217,70,239,0.1)]">
          <SearchX className="size-8 text-fuchsia-500/60" />
          <div className="absolute -right-1 -top-1 size-3 rounded-full bg-fuchsia-500 animate-ping" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tighter uppercase text-foreground">
            No signal <span className="text-fuchsia-500">found.</span>
          </h3>
          <p className="mx-auto max-w-[280px] text-sm font-medium leading-relaxed text-muted-foreground/60">
            Non ci sono post per questo filtro. Prova a cambiare tag o resetta la ricerca.
          </p>
        </div>

        {/* Pulsante di Reset suggerito (se hai una funzione onClear) */}
        <button 
          onClick={() => window.location.reload()} // O passagli una prop onReset
          className="group/btn flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all hover:border-fuchsia-500/50 hover:text-fuchsia-500"
        >
          <RefreshCcw className="size-3 transition-transform group-hover/btn:rotate-180 duration-500" />
          Reset Filters
        </button>
      </div>

      {/* Dettaglio Tech in basso */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-20">
          Error Code: 404_POSTS_NOT_FOUND
        </p>
      </div>
    </div>
  )
}