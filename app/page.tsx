import BlogCTA from "@/components/home/blog-cta";
import HomeHero from "@/components/home/hero";
import SocialFooter from "@/components/home/social-footer";

export default function Home() {
  return (
    // Aggiunto un gradiente radiale di base per dare profondità al centro
    <div id="top" className="relative min-h-screen overflow-hidden bg-background [background-image:radial-gradient(circle_at_center,rgba(217,70,239,0.03),transparent_70%)]">
      
      {/* Background Decorativo Dinamico */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {/* Cerchio Fuchsia in alto a destra */}
        <div className="absolute -top-32 right-[-5%] h-[600px] w-[600px] rounded-full bg-fuchsia-500/10 blur-[180px] animate-pulse duration-[10s]" />
        
        {/* Cerchio Cyan a metà a sinistra */}
        <div className="absolute top-[30%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        
        {/* Cerchio Deep Purple in basso al centro */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-fuchsia-600/5 blur-[200px]" />
        
        {/* Griglia Tech Sottile (opzionale, per look più "dev") */}
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 py-12 sm:px-10 md:gap-32 md:py-24 lg:px-16">
        
        {/* Hero Section - Più spazio verticale per farla respirare */}
        <section className="w-full">
          <HomeHero />
        </section>

        {/* Sezione Blog - Usiamo un gap maggiore per distaccarla */}
        <section className="w-full relative">
          {/* Separatore decorativo minimale prima del blog */}
          <div className="mb-12 flex items-center gap-4 opacity-20">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Selected Works</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground" />
          </div>
          <BlogCTA />
        </section>

        {/* Footer Section */}
        <section className="w-full pb-8">
          <SocialFooter />
        </section>

      </main>

      {/* Credit laterale "Verticale" - Tipico design wide premium */}
      <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 rotate-90 flex-col items-center gap-4 md:flex">
        <span className="h-12 w-px bg-border/40" />
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
          Scroll to explore
        </span>
      </div>
    </div>
  );
}