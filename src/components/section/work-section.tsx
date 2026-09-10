/* eslint-disable @next/next/no-img-element */
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DATA, type WorkExperience } from "@/data/resume";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/((?:approximately\s+)?(?:\d[\d,.]*)(?:K|M)?\+?%?)/gi);
  return parts.map((part, index) => /\d/.test(part) ? <strong key={`${part}-${index}`} className="font-semibold text-primary">{part}</strong> : part);
}

function LogoImage({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  if (!src || imageError) return <div className="flex size-9 flex-none items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-[0.65rem] font-semibold text-primary shadow-sm ring-2 ring-primary/10 dark:bg-primary/10">{alt.startsWith("U-Sense") ? "US" : alt.startsWith("Wipro") ? "WTL" : alt.split(/\s+/).map((word) => word[0]).join("").slice(0, 3).toUpperCase()}</div>;
  return <img src={src} alt={alt} className="size-9 flex-none overflow-hidden rounded-full border p-1 object-contain shadow ring-2 ring-border" onError={() => setImageError(true)} />;
}

export default function WorkSection({ entries = DATA.work }: { entries?: readonly WorkExperience[] }) {
  return <Accordion type="single" collapsible className="w-full divide-y divide-border/70">
    {entries.map((work) => <AccordionItem key={`${work.company}-${work.title}-${work.start}`} value={`${work.company}-${work.title}-${work.start}`} className="border-0">
      <AccordionTrigger className="gap-4 px-0 py-4 text-left hover:no-underline [&>svg]:hidden data-[state=open]:[&_.work-chevron]:rotate-180">
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div className="flex min-w-0 items-start gap-3"><LogoImage src={work.logoUrl} alt={work.company} /><div className="min-w-0"><p className="truncate text-base font-semibold">{work.company}</p><p className="text-sm font-medium text-foreground/85">{work.title}</p><p className="truncate text-sm text-muted-foreground">{work.location || "Location not specified"}</p><p className="mt-1 line-clamp-1 text-sm leading-relaxed text-muted-foreground">{work.summary}</p></div></div><span className="flex items-center justify-between gap-3 text-sm tabular-nums text-muted-foreground sm:justify-end"><span>{work.start} to {work.end ?? "Present"}</span><ChevronDown className="work-chevron size-4 shrink-0 transition-transform duration-200" aria-hidden="true" /></span></div>
      </AccordionTrigger>
      <AccordionContent className="pb-5 pl-12 pr-0 text-sm leading-relaxed text-muted-foreground sm:pl-12 sm:text-base"><ul className="list-disc space-y-2 pl-4">{work.highlights?.map((highlight) => <li key={highlight}><HighlightText text={highlight} /></li>)}{work.additionalHighlights?.map((highlight) => <li key={highlight}><HighlightText text={highlight} /></li>)}</ul></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
