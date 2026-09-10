import BlurFade from "@/components/magicui/blur-fade";
import SectionHeading from "@/components/section/section-heading";
import { allPosts } from "content-collections";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WritingSection({ personalPostSlugs }: { personalPostSlugs: readonly string[] }) {
  const posts = allPosts
    .filter((post) => personalPostSlugs.includes(post._meta.path.replace(/\.mdx$/, "")))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="flex flex-col gap-6">
      <BlurFade delay={0.04}><SectionHeading label="Writing" title="Recent Posts" /></BlurFade>
      <ul className="flex flex-col divide-y divide-border">
        {posts.map((post, index) => (
          <li key={post._meta.path}>
            <BlurFade delay={0.08 + index * 0.04}>
              <Link href={`/blog/${post._meta.path.replace(/\.mdx$/, "")}`} className="group flex items-center justify-between gap-3 rounded-md py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-sm font-medium">{post.title}</h3>
                  <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">{post.publishedAt}</time>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </BlurFade>
          </li>
        ))}
      </ul>
    </section>
  );
}
