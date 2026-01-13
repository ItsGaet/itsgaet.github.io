import Link from "next/link";
import { ArrowUpRight, Home, Ghost } from "lucide-react";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Decorativo - Luci di emergenza */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-fuchsia-500/5 blur-[160px]" />
        <div className="absolute -top-20 left-[-10%] size-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-1 flex-col items-center justify-center">
          
          {/* Numero 404 Gigante ed Editoriale */}
          <div className="relative">
            <h1 className="text-[12rem] font-black leading-none tracking-tighter opacity-[0.03] sm:text-[20rem]">
              404
            </h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-3xl border border-fuchsia-500/30 bg-fuchsia-500/10 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                <Ghost className="size-8 text-fuchsia-500" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-5xl">
                Lost in <span className="text-fuchsia-500/80 text-shadow-glow">Space.</span>
              </h2>
            </div>
          </div>

          <div className="mt-8 flex max-w-md flex-col items-center gap-8 text-center">
            <p className="text-sm font-medium leading-relaxed text-muted-foreground/60">
              Il segnale si è interrotto. La risorsa che cercavi è stata spostata o non è mai esistita nel nostro database.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="h-12 rounded-full bg-fuchsia-500 px-8 font-bold hover:bg-fuchsia-600 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                <Link href="/blog">
                  BACK TO BLOG <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-border/40 px-8 font-bold hover:bg-white/5">
                <Link href="/">
                  <Home className="mr-2 size-4" /> HOME
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer integrato ma compatto */}
        <section className="mt-12 opacity-80 grayscale transition-all hover:grayscale-0">
          <SocialFooter />
        </section>
      </div>
    </div>
  );
}