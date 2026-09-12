/* eslint-disable @next/next/no-img-element */
"use client";

import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BarChart3, BookOpen, Boxes, ChevronDown, Database, Map, MonitorUp, Network, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { createElement, useId, useState } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) return null;
  return <img loading="lazy" src={src} alt={alt} className="aspect-[3.5] w-full object-cover" onError={() => setImageError(true)} />;
}

function projectIcon(categories: readonly string[]) {
  const isAnalytics = categories.some((category) => category === "Analytics" || category === "BI");
  const isAi = categories.some((category) => category === "AI" || category === "RAG");
  const isHackathon = categories.includes("Hackathon");
  return isHackathon ? Map : isAi ? Network : isAnalytics ? BarChart3 : Database;
}

function ProjectCover({ categories, title }: { categories: readonly string[]; title: string }) {
  return <div className="relative flex aspect-[3.5] items-center justify-center overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/[0.14] via-background to-muted/50 dark:from-primary/[0.2] dark:to-muted/20" aria-hidden="true"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />{createElement(projectIcon(categories), { className: "relative size-8 text-primary/70" })}<span className="sr-only">Abstract {title} project cover</span></div>;
}

interface Props {
  title: string;
  categories: readonly string[];
  problem: string;
  build?: string;
  approach: readonly string[];
  scale?: string;
  outcome: string;
  metrics?: readonly string[];
  venue?: string;
  badge?: string;
  date?: string;
  status?: string;
  research?: boolean;
  featuredMetric?: string;
  featuredMetricLabel?: string;
  websiteUrl?: string;
  sourceUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureUrl?: string;
  caseStudyUrl?: string;
  paperUrl?: string;
  coverImage?: string;
  demoVideo?: string;
  image?: string;
  video?: string;
  className?: string;
}

type LinkItem = { label: string; href: string; icon: LucideIcon | typeof GitHubIcon };

const categoryPriority: Record<string, number> = {
  "Data Engineering": 1,
  Analytics: 1,
  BI: 1,
  "Data Science": 1,
  "Machine Learning": 1,
  "Applied Data Science": 1,
  AI: 1,
  RAG: 1,
  Healthcare: 1,
  Cybersecurity: 1,
  "Computer Vision": 1,
  Geospatial: 1,
  Forecasting: 1,
  "Financial Analytics": 1,
  "Big Data": 1,
  Databricks: 1,
  Research: 1,
  Hackathon: 2,
};

function CategoryBadges({ categories }: { categories: readonly string[] }) {
  return [...categories]
    .sort((left, right) => (categoryPriority[left] ?? 1) - (categoryPriority[right] ?? 1))
    .map((category) => <Badge key={category} variant="secondary" className={cn("text-xs", category === "Data Engineering" && "bg-primary/10 text-primary", (category.includes("Analytics") || category === "BI") && "bg-analytics/10 text-analytics", (category === "Data Science" || category === "Machine Learning" || category === "Forecasting") && "bg-research/10 text-research", (category === "AI" || category.includes("RAG") || category === "Applied Data Science" || category === "Computer Vision") && "bg-research/10 text-research", category === "Hackathon" && "bg-award/10 text-award", (category === "Big Data" || category === "Databricks" || category === "Geospatial") && "bg-primary/10 text-primary")}>{category}</Badge>);
}

function ProjectMetadata({ categories, badge, research = false }: { categories: readonly string[]; badge?: string; research?: boolean }) {
  return <div className="flex min-h-[3.25rem] flex-wrap items-center gap-1.5">
    <CategoryBadges categories={categories} />
    {research && <Badge className="border-research/25 bg-research/10 text-research hover:bg-research/15">IEEE Research · ICAIC 2026</Badge>}
    {badge && <Badge className="border-award/25 bg-award/10 text-award hover:bg-award/15">{badge}</Badge>}
  </div>;
}

function projectLinks({ websiteUrl, sourceUrl, githubUrl, demoUrl, architectureUrl, caseStudyUrl, paperUrl }: Pick<Props, "websiteUrl" | "sourceUrl" | "githubUrl" | "demoUrl" | "architectureUrl" | "caseStudyUrl" | "paperUrl">) {
  const websiteHref = websiteUrl || demoUrl;
  const sourceHref = sourceUrl || githubUrl;
  return [websiteHref && { label: "Website", href: websiteHref, icon: MonitorUp }, sourceHref && { label: "Source", href: sourceHref, icon: GitHubIcon }, architectureUrl && { label: "Architecture", href: architectureUrl, icon: Boxes }, caseStudyUrl && { label: "Case Study", href: caseStudyUrl, icon: BookOpen }, paperUrl && { label: "View Paper", href: paperUrl, icon: ArrowUpRight }].filter(Boolean) as LinkItem[];
}

function ProjectLinks({ links, research = false }: { links: LinkItem[]; research?: boolean }) {
  if (links.length === 0) return null;
  return <div className="flex flex-wrap gap-2 border-t border-border pt-3">{links.map(({ label, href, icon: Icon }) => <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", research ? "text-research hover:bg-research/10" : "text-primary hover:bg-primary/10")}><Icon className="size-4" aria-hidden="true" />{label}</Link>)}</div>;
}

export function ProjectCard({ title, categories, problem, build, approach, scale, outcome, metrics, venue, badge, date, status, research, featuredMetric, featuredMetricLabel, websiteUrl, sourceUrl, githubUrl, demoUrl, architectureUrl, caseStudyUrl, paperUrl, coverImage, demoVideo, image, video, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const links = projectLinks({ websiteUrl, sourceUrl, githubUrl, demoUrl, architectureUrl, caseStudyUrl, paperUrl });

  return <article className={cn("flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground transition-colors", research ? "border-research/30 bg-research/[0.025] hover:border-research/45 dark:bg-research/[0.06]" : "border-border hover:border-primary/25 hover:bg-primary/[0.015]", className)}>
    {demoVideo || video ? <video src={demoVideo || video} muted playsInline preload="none" className="aspect-[3.5] w-full object-cover" /> : coverImage || image ? <ProjectImage src={coverImage || image || ""} alt={`${title} project preview`} /> : <ProjectCover categories={categories} title={title} />}
    <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:p-4">
      <div className="space-y-2">
        <ProjectMetadata categories={categories} badge={badge} research={research} />
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold leading-snug tracking-tight md:min-h-[4.5rem]">{title}</h3>
          {(date || status) && <span className="shrink-0 text-xs text-muted-foreground">{date || status}</span>}
        </div>
        {venue && <p className="line-clamp-1 text-sm leading-relaxed text-muted-foreground">{venue}</p>}
      </div>
      {featuredMetric && <div className={cn("rounded-lg border px-3.5 py-2.5", research ? "border-research/20 bg-research/[0.06]" : "border-primary/15 bg-primary/[0.055] dark:bg-primary/[0.08]")}><p className={cn("text-lg font-semibold", research ? "text-research" : "text-primary")}>{featuredMetric}</p>{featuredMetricLabel && <p className="text-sm text-muted-foreground">{featuredMetricLabel}</p>}</div>}
      <p className={cn("text-sm leading-relaxed text-muted-foreground", !expanded && "line-clamp-2")}>{outcome}</p>
      <div id={detailsId} hidden={!expanded} className="space-y-3 pt-1 text-sm leading-relaxed"><dl className="space-y-3"><div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Problem</dt><dd className="mt-1 text-muted-foreground">{problem}</dd></div>{build && <div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">What I built</dt><dd className="mt-1 text-muted-foreground">{build}</dd></div>}{scale && <div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Scale</dt><dd className="mt-1 text-muted-foreground">{scale}</dd></div>}<div className={cn("rounded-lg border px-3.5 py-3", research ? "border-research/15 bg-research/[0.05]" : "border-primary/10 bg-primary/[0.04]")}><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Outcome</dt><dd className="mt-1 text-foreground/90">{outcome}</dd>{metrics && <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>}</div></dl></div>
      <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3">
        <div className="flex min-w-0 flex-wrap gap-1.5">{approach.slice(0, 6).map((item) => <Badge key={item} variant="outline" className="min-h-6 px-2 py-0.5 text-xs font-medium">{item}</Badge>)}</div>
        <button type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded((value) => !value)} className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="sr-only">{expanded ? "Hide" : "Show"} details for {title}</span>{expanded ? "Hide" : "Details"}<ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" /></button>
      </div>
      <ProjectLinks links={links} research={research} />
    </div>
  </article>;
}

export function CompactProjectCard({ title, categories, problem, build, scale, outcome, approach, badge, websiteUrl, sourceUrl, githubUrl, demoUrl, caseStudyUrl, architectureUrl, paperUrl, className }: Pick<Props, "title" | "categories" | "problem" | "build" | "scale" | "outcome" | "approach" | "badge" | "websiteUrl" | "sourceUrl" | "githubUrl" | "demoUrl" | "caseStudyUrl" | "architectureUrl" | "paperUrl" | "className">) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const links = projectLinks({ websiteUrl, sourceUrl, githubUrl, demoUrl, caseStudyUrl, architectureUrl, paperUrl });
  return <article className={cn("flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.015]", className)}>
    <div className="flex min-h-[3.25rem] flex-wrap items-center gap-1.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary" aria-hidden="true">{createElement(projectIcon(categories), { className: "size-4" })}</div>
      <CategoryBadges categories={categories} />
      {badge && <Badge className="border-award/25 bg-award/10 text-award hover:bg-award/15">{badge}</Badge>}
    </div>
    <h3 className="min-h-[3.5rem] text-base font-semibold leading-snug">{title}</h3>
    <p className={cn("text-sm leading-relaxed text-muted-foreground", !expanded && "line-clamp-2")}>{outcome}</p>
    <div id={detailsId} hidden={!expanded} className="space-y-2 border-t border-border/70 pt-3 text-sm leading-relaxed text-muted-foreground"><p><span className="font-semibold text-foreground">Problem:</span> {problem}</p>{build && <p><span className="font-semibold text-foreground">What I built:</span> {build}</p>}{scale && <p><span className="font-semibold text-foreground">Scale:</span> {scale}</p>}<p><span className="font-semibold text-foreground">Outcome:</span> {outcome}</p><div><span className="font-semibold text-foreground">Technologies:</span><div className="mt-2 flex flex-wrap gap-1.5">{approach.map((item) => <Badge key={item} variant="outline" className="min-h-6 px-2 py-0.5 text-xs font-medium">{item}</Badge>)}</div></div></div>
    <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">{approach.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
    <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
      <button type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded((value) => !value)} className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{expanded ? "Hide details" : "Details"}<ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" /></button>
      {links.length > 0 && <div className="flex flex-wrap justify-end gap-2"><ProjectLinks links={links} /></div>}
    </div>
  </article>;
}
