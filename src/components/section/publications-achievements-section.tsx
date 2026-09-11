"use client";

import BlurFade from "@/components/magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Project, PublicationAchievement } from "@/data/resume";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

function DetailsButton({ expanded, onClick, controls }: { expanded: boolean; onClick: () => void; controls: string }) {
  return (
    <button type="button" aria-expanded={expanded} aria-controls={controls} onClick={onClick} className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {expanded ? "Hide" : "Details"}
      <ChevronDown className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );
}

function ResearchCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="flex h-full flex-col rounded-xl border border-research/30 bg-research/[0.025] p-4 dark:bg-research/[0.06] sm:p-5">
      <Badge className="w-fit border-research/25 bg-research/10 text-research hover:bg-research/15">IEEE Research · ICAIC 2026</Badge>
      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight">{project.title}</h3>
      {project.venue && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.venue}</p>}
      {(project.featuredMetric || project.featuredMetricLabel) && (
        <div className="mt-4 border-y border-research/15 py-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Research outcome</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {project.featuredMetric && <span className="text-base font-semibold text-research">{project.featuredMetric}</span>}
            {project.featuredMetricLabel && <span className="text-sm text-muted-foreground">{project.featuredMetricLabel}</span>}
          </div>
        </div>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.outcome}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.approach.slice(0, 5).map((item) => <Badge key={item} variant="outline" className="min-h-6 px-2 py-0.5 text-xs">{item}</Badge>)}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-research/15 pt-3">
        <DetailsButton expanded={expanded} onClick={() => setExpanded((value) => !value)} controls={detailsId} />
        {project.paperUrl && <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-research transition-colors hover:bg-research/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowUpRight className="size-4" aria-hidden="true" />View Paper</Link>}
      </div>
      <div id={detailsId} hidden={!expanded} className="mt-3 space-y-2 border-t border-research/15 pt-3 text-sm leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground">Problem:</span> {project.problem}</p>
        {project.build && <p><span className="font-semibold text-foreground">What I built:</span> {project.build}</p>}
        {project.scale && <p><span className="font-semibold text-foreground">Scale:</span> {project.scale}</p>}
        {project.metrics && <ul className="list-disc space-y-1 pl-4">{project.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>}
      </div>
    </article>
  );
}

function WinnerCard({ entry }: { entry: PublicationAchievement }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="flex h-full flex-col rounded-xl border border-award/25 bg-award/[0.035] p-4 dark:bg-award/[0.06] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <Badge className="border-award/25 bg-award/10 text-award hover:bg-award/15">{entry.badge || "Winner"}</Badge>
        {entry.date && <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{entry.date}</span>}
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{entry.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.organization}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
      <div className="mt-auto flex items-center border-t border-award/15 pt-3">
        <DetailsButton expanded={expanded} onClick={() => setExpanded((value) => !value)} controls={detailsId} />
      </div>
      <div id={detailsId} hidden={!expanded} className="mt-3 border-t border-award/15 pt-3 text-sm leading-relaxed text-muted-foreground">
        {entry.project && <p><span className="font-semibold text-foreground">Project:</span> {entry.project}</p>}
      </div>
    </article>
  );
}

function HackathonRecognition({ entry }: { entry: PublicationAchievement }) {
  const finalist = entry.badge?.includes("Finalist") ?? false;
  const badgeClass = finalist
    ? "border-award/25 bg-award/10 text-award hover:bg-award/15"
    : "border-border bg-muted text-muted-foreground hover:bg-muted";

  return (
    <AccordionItem value={`${entry.type}-${entry.title}`} className={`rounded-xl border px-4 ${finalist ? "border-award/30 bg-award/[0.035] dark:bg-award/[0.06]" : "border-border bg-card"}`}>
      <AccordionTrigger className="gap-3 py-4 hover:no-underline [&>svg]:size-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-left">
          <Badge className={badgeClass}>{entry.badge || entry.type}</Badge>
          <span className={finalist ? "font-semibold" : "font-medium"}>{entry.title}</span>
          {entry.date && <span className="text-xs tabular-nums text-muted-foreground">{entry.date}</span>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 border-t border-border/70 pt-3 text-sm leading-relaxed text-muted-foreground">
          <p>{entry.organization}</p>
          {entry.project && <p><span className="font-semibold text-foreground">Project:</span> {entry.project}</p>}
          <p>{entry.description}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function PublicationsAchievementsSection({ entries, research }: { entries: readonly PublicationAchievement[]; research?: Project }) {
  if (entries.length === 0 && !research) return null;

  const winner = entries.find((entry) => entry.badge === "Winner");
  const recognitions = entries
    .filter((entry) => entry !== winner)
    .sort((left, right) => Number(Boolean(right.badge?.includes("Finalist"))) - Number(Boolean(left.badge?.includes("Finalist"))));

  return (
    <section id="research" className="flex flex-col gap-5">
      <BlurFade delay={0.04}><h2 className="text-xl font-bold tracking-tight">Research &amp; Recognition</h2></BlurFade>
      {(research || winner) && (
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {research && <BlurFade delay={0.08} className="h-full"><ResearchCard project={research} /></BlurFade>}
          {winner && <BlurFade delay={0.1} className="h-full"><WinnerCard entry={winner} /></BlurFade>}
        </div>
      )}
      {recognitions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Hackathon Recognition</h3>
          <Accordion type="multiple" className="flex flex-col gap-3">
            {recognitions.map((entry, index) => <BlurFade key={`${entry.type}-${entry.title}-${entry.date || ""}`} delay={0.12 + index * 0.04}><HackathonRecognition entry={entry} /></BlurFade>)}
          </Accordion>
        </div>
      )}
    </section>
  );
}
