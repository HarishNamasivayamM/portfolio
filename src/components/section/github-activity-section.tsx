/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import SectionHeading from "@/components/section/section-heading";
import type { GitHubActivity } from "@/data/resume";
import Link from "next/link";

export default function GitHubActivitySection({ config }: { config: GitHubActivity | null }) {
  // No provider requests or simulated contributions before configuration exists.
  if (!config?.profileUrl || !config.imageUrl || !config.alt) return null;

  return (
    <section id="github" className="flex flex-col gap-6">
      <BlurFade delay={0.04}><SectionHeading label="GitHub" title="Contribution Activity" /></BlurFade>
      <BlurFade delay={0.08}>
        <figure className="flex flex-col gap-3 rounded-xl border border-border p-4">
          <img src={config.imageUrl} alt={config.alt} loading="lazy" className="h-auto w-full" />
          <figcaption className="text-center text-sm">
            <Link href={config.profileUrl} target="_blank" rel="noopener noreferrer" className="rounded-sm underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              View on GitHub
            </Link>
          </figcaption>
        </figure>
      </BlurFade>
    </section>
  );
}
