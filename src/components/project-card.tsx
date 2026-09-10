"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BarChart3, BookOpen, Boxes, Database, Github, Map, MonitorUp, Network } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createElement } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  if (imageError) return null;
  return (
    // Project media can be remote once a verified asset is configured.
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" src={src} alt={alt} className="aspect-[1.8] w-full object-cover" onError={() => setImageError(true)} />
  );
}

function projectIcon(categories: readonly string[]) {
  const isAnalytics = categories.some((category) => category === "Analytics" || category === "BI");
  const isAi = categories.some((category) => category === "AI" || category === "RAG");
  const isHackathon = categories.includes("Hackathon");
  return isHackathon ? Map : isAi ? Network : isAnalytics ? BarChart3 : Database;
}

function ProjectCover({ categories, title }: { categories: readonly string[]; title: string }) {
  const Icon = projectIcon(categories);
  return <div className="relative flex aspect-[1.8] items-center justify-center overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/[0.14] via-background to-muted/50 dark:from-primary/[0.2] dark:to-muted/20" aria-hidden="true"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />{createElement(Icon, { className: "relative size-12 text-primary/70" })}<span className="sr-only">Abstract {title} project cover</span></div>;
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

function CategoryBadges({ categories }: { categories: readonly string[] }) {
  return categories.map((category) => (
    <Badge
      key={category}
      variant="secondary"
      className={cn(
        "text-xs",
        category === "Data Engineering" && "bg-primary/10 text-primary",
        (category.includes("Analytics") || category === "BI") && "bg-analytics/10 text-analytics",
        (category === "Data Science" || category === "Machine Learning" || category === "Forecasting") && "bg-research/10 text-research",
        (category === "AI" || category.includes("RAG") || category === "Applied Data Science" || category === "Computer Vision") && "bg-research/10 text-research",
        category === "Hackathon" && "bg-award/10 text-award",
        (category === "Big Data" || category === "Databricks" || category === "Geospatial") && "bg-primary/10 text-primary",
      )}
    >
      {category}
    </Badge>
  ));
}

export function ProjectCard({ title, categories, problem, build, approach, scale, outcome, metrics, venue, badge, date, status, research, featuredMetric, featuredMetricLabel, githubUrl, demoUrl, architectureUrl, caseStudyUrl, paperUrl, coverImage, demoVideo, image, video, className }: Props) {
  const links = [
    githubUrl && { label: "GitHub", href: githubUrl, icon: Github },
    demoUrl && { label: "Demo", href: demoUrl, icon: MonitorUp },
    architectureUrl && { label: "Architecture", href: architectureUrl, icon: Boxes },
    caseStudyUrl && { label: "Case Study", href: caseStudyUrl, icon: BookOpen },
    paperUrl && { label: "View Paper", href: paperUrl, icon: ArrowUpRight },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Github }[];

  return (
    <article className={cn("flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground transition-colors", research ? "border-research/30 bg-research/[0.025] hover:border-research/45 dark:bg-research/[0.06]" : "border-border hover:border-primary/25 hover:bg-primary/[0.015]", className)}>
      {demoVideo || video ? <video src={demoVideo || video} muted playsInline preload="none" className="aspect-[1.8] w-full object-cover" /> : coverImage || image ? <ProjectImage src={coverImage || image || ""} alt={`${title} project preview`} /> : <ProjectCover categories={categories} title={title} />}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {research && <Badge className="border-research/25 bg-research/10 text-research hover:bg-research/15">IEEE Research   ·   ICAIC 2026</Badge>}
            <CategoryBadges categories={categories} />
          </div>
          <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-semibold leading-snug tracking-tight">{title}</h3>{(date || status) && <span className="shrink-0 text-xs text-muted-foreground">{date || status}</span>}</div>
          {venue && <p className="text-sm leading-relaxed text-muted-foreground">{venue}</p>}
          {badge && <p className="inline-flex rounded-md border border-award/25 bg-award/10 px-2.5 py-1 text-sm font-medium text-award">{badge}</p>}
        </div>

        {featuredMetric && (
          <div className={cn("rounded-lg border px-3.5 py-3", research ? "border-research/20 bg-research/[0.06]" : "border-primary/15 bg-primary/[0.055] dark:bg-primary/[0.08]")}>
            <p className={cn("text-lg font-semibold", research ? "text-research" : "text-primary")}>{featuredMetric}</p>
            {featuredMetricLabel && <p className="text-sm text-muted-foreground">{featuredMetricLabel}</p>}
          </div>
        )}

        <dl className="space-y-3 text-base leading-relaxed">
          <div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Problem</dt><dd className="mt-1 text-muted-foreground">{problem}</dd></div>
          {build && <div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">What I built</dt><dd className="mt-1 text-muted-foreground">{build}</dd></div>}
          {scale && <div><dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Scale</dt><dd className="mt-1 text-muted-foreground">{scale}</dd></div>}
          <div className={cn("rounded-lg border px-3.5 py-3", research ? "border-research/15 bg-research/[0.05]" : "border-primary/10 bg-primary/[0.04]")}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Outcome</dt>
            <dd className="mt-1 text-foreground/90">{outcome}</dd>
            {metrics && <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">{metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>}
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {approach.map((item) => <Badge key={item} variant="outline" className="min-h-6 px-2 py-0.5 text-xs font-medium">{item}</Badge>)}
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            {links.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", research ? "text-research hover:bg-research/10" : "text-primary hover:bg-primary/10")}>
                <Icon className="size-4" aria-hidden="true" />{label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function CompactProjectCard({ title, categories, outcome, approach, githubUrl, demoUrl, caseStudyUrl, architectureUrl, paperUrl, className }: Pick<Props, "title" | "categories" | "outcome" | "approach" | "githubUrl" | "demoUrl" | "caseStudyUrl" | "architectureUrl" | "paperUrl" | "className">) {
  const links = [githubUrl && { label: "GitHub", href: githubUrl, icon: Github }, demoUrl && { label: "Demo", href: demoUrl, icon: MonitorUp }, caseStudyUrl && { label: "Case Study", href: caseStudyUrl, icon: BookOpen }, architectureUrl && { label: "Architecture", href: architectureUrl, icon: Boxes }, paperUrl && { label: "View Paper", href: paperUrl, icon: ArrowUpRight }].filter(Boolean) as { label: string; href: string; icon: typeof Github }[];
  const Icon = projectIcon(categories);
  return (
    <article className={cn("flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.015]", className)}>
      <div className="flex items-center justify-between gap-2"><div className="flex size-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary" aria-hidden="true">{createElement(Icon, { className: "size-4" })}</div><div className="flex flex-wrap justify-end gap-1.5"><CategoryBadges categories={categories.slice(0, 2)} /></div></div>
      <h3 className="text-base font-semibold leading-snug">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
      <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
        {approach.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
      </div>
      {links.length > 0 && <div className="flex flex-wrap gap-2 border-t border-border pt-3">{links.map(({ label, href, icon: Icon }) => <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1 text-sm font-medium text-primary hover:underline"><Icon className="size-3.5" aria-hidden="true" />{label}</Link>)}</div>}
    </article>
  );
}
