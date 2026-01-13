import { cn } from "@/lib/utils"

type BlogPostContentProps = {
  body: string[]
}

export default function BlogPostContent({ body }: BlogPostContentProps) {
  return (
    <article className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-sm px-8 py-12 sm:px-12">
      {/* Luci ambientali soffuse per non stancare la vista */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="absolute -left-20 top-20 size-96 rounded-full bg-fuchsia-500/[0.03] blur-[120px]" />
        <div className="absolute -right-20 bottom-20 size-96 rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-8">
        {body.map((paragraph, index) => (
          <p 
            key={index} 
            className={cn(
              "text-lg leading-relaxed text-foreground/80 transition-colors hover:text-foreground",
              // Effetto Drop Cap (Capolettera) sul primo paragrafo
              index === 0 && "first-letter:mr-3 first-letter:float-left first-letter:text-7xl first-letter:font-black first-letter:text-fuchsia-500"
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer interno all'articolo per chiudere la lettura */}
      <div className="mt-16 flex items-center gap-4 border-t border-border/20 pt-8">
        <div className="size-2 rounded-full bg-fuchsia-500 animate-pulse" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
          End of transmission
        </p>
      </div>
    </article>
  )
}