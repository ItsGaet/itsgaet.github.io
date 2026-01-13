import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ChevronLeft } from "lucide-react";

import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostHeader from "@/components/blog/blog-post-header";
import BlogPostSidebar from "@/components/blog/blog-post-sidebar";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} - itsgaet`,
    description: post.summary,
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Luci Ambientali Soffuse - Più profonde durante la lettura */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/[0.07] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pt-12">
        
        {/* Back Button - Minimal & Tech */}
        <nav className="flex items-center">
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 transition-colors hover:text-fuchsia-500"
          >
            <div className="flex size-8 items-center justify-center rounded-full border border-border/40 bg-card/40 transition-all group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10">
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            Back to Archive
          </Link>
        </nav>

        {/* Header Section */}
        <BlogPostHeader post={post} />

        {/* Content & Sidebar Grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] xl:gap-20">
          <div className="space-y-12">
            <BlogPostContent body={post.body} />
            
            {/* Fine articolo - Call to Action o navigazione */}
            <div className="flex items-center justify-between border-t border-border/10 pt-12">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Thank you for reading</span>
                 <p className="text-sm font-medium text-muted-foreground/60">Share your thoughts on this topic.</p>
               </div>
               <Button variant="outline" className="rounded-full border-fuchsia-500/20 hover:bg-fuchsia-500/5 hover:text-fuchsia-500" asChild>
                 <a href={`mailto:gaetanoabbaticchio8@gmail.com?subject=Re: ${post.title}`}>Reply to Post</a>
               </Button>
            </div>
          </div>

          <aside className="relative">
            <div className="sticky top-12">
              <BlogPostSidebar post={post} />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <section className="mt-20 border-t border-border/10 pt-10">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}