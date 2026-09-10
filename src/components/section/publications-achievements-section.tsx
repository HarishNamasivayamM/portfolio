import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import type { Project, PublicationAchievement } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PublicationsAchievementsSection({ entries, research }: { entries: readonly PublicationAchievement[]; research?: Project }) {
  if (entries.length === 0 && !research) return null;

  return (
    <section id="research" className="flex flex-col gap-5">
      <BlurFade delay={0.04}><h2 className="text-2xl font-bold tracking-tight">Research &amp; Recognition</h2></BlurFade>
      {research && (
        <BlurFade delay={0.08}>
          <ProjectCard
            title={research.title}
            categories={research.categories}
            problem={research.problem}
            build={research.build}
            approach={research.approach}
            scale={research.scale}
            outcome={research.outcome}
            metrics={research.metrics}
            venue={research.venue}
            badge={research.badge}
            research
            featuredMetric={research.featuredMetric}
            featuredMetricLabel={research.featuredMetricLabel}
            paperUrl={research.paperUrl}
          />
        </BlurFade>
      )}
      <div className="flex flex-col gap-3">
        {entries.map((entry, index) => {
          const compactRecognition = Boolean(entry.project);
          return (
          <BlurFade key={`${entry.type}-${entry.title}-${entry.date || ""}`} delay={0.08 + index * 0.04}>
            <article className={`flex flex-col gap-3 rounded-xl border border-award/25 bg-award/[0.035] dark:bg-award/[0.06] ${compactRecognition ? "gap-2 p-4" : "p-5"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge className={entry.type === "Participation" ? "border-border bg-muted text-muted-foreground hover:bg-muted" : "border-award/25 bg-award/10 text-award hover:bg-award/15"}>{entry.badge || entry.type}</Badge>
                {entry.date && <span className="text-xs tabular-nums text-muted-foreground">{entry.date}</span>}
              </div>
              <h3 className="text-base font-semibold">
                {entry.href ? (
                  <Link href={entry.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {entry.title}<ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </Link>
                ) : entry.title}
              </h3>
              <p className="text-sm text-muted-foreground">{entry.organization}</p>
              {entry.project && <p className="text-xs font-medium text-foreground/80">Project: {entry.project}</p>}
              <p className={compactRecognition ? "text-sm leading-relaxed text-muted-foreground" : "text-base leading-relaxed text-muted-foreground"}>{entry.description}</p>
            </article>
          </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
