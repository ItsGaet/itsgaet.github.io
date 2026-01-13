import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import FloatingSidebar from "@/components/navigation/floating-sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "itsgaet - tech notes",
  description:
    "Technical notes on frontend, tooling, and lightweight architectures. Field notes, experiments, and details that make the difference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
    >
      {/* selection:bg-fuchsia-500/30 colora l'evidenziazione del testo */}
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
        
        {/* Overlay Texture (opzionale, rimuovilo se non vuoi caricare l'immagine esterna) */}
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <FloatingSidebar />
        
        <div className="relative pb-24 transition-all duration-500 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  );
}