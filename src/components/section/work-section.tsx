/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA, type WorkExperience } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/((?:approximately\s+)?(?:\d[\d,.]*)(?:K|M)?\+?%?)/gi);
  return parts.map((part, index) =>
    /\d/.test(part) ? <strong key={`${part}-${index}`} className="font-semibold text-primary">{part}</strong> : part
  );
}

function LogoImage({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="flex size-10 flex-none items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-xs font-semibold text-primary shadow-sm ring-2 ring-primary/10 dark:bg-primary/10">
        {alt.startsWith("U-Sense") ? "US" : alt.startsWith("Wipro") ? "WTL" : alt.split(/\s+/).map((word) => word[0]).join("").slice(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection({ entries = DATA.work }: { entries?: readonly WorkExperience[] }) {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-5">
      {entries.map((work) => (
        <AccordionItem
          key={`${work.company}-${work.title}-${work.start}`}
          value={`${work.company}-${work.title}-${work.start}`}
          className="grid w-full gap-2 border-b-0 border-l-2 border-l-primary/25 pl-4"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-x-3 sm:justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage src={work.logoUrl} alt={work.company} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="flex items-center gap-2 text-lg font-semibold leading-snug">
                    {work.company}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-base text-muted-foreground">
                    {work.title}
                  </div>
                  {work.location && <div className="text-sm text-muted-foreground">{work.location}</div>}
                </div>
              </div>
              <div className="ml-13 flex flex-none items-center gap-1 text-sm tabular-nums text-muted-foreground sm:ml-0 sm:text-right">
                <span>
                  {work.start} to {work.end ?? "Present"}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          {work.summary && <p className="ml-11 text-sm leading-relaxed text-muted-foreground md:text-base">{work.summary}</p>}
          {work.highlights && <ul className="ml-11 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground md:text-base">{work.highlights.slice(0, 4).map((highlight) => <li key={highlight}><HighlightText text={highlight} /></li>)}</ul>}
          <AccordionContent className="p-0 ml-11 md:ml-13 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <div className="space-y-2">
              {work.highlights && work.highlights.length > 0 && (
                <ul className="list-disc space-y-1 pl-4 text-sm md:text-base">
                  {work.highlights.slice(4).map((highlight) => <li key={highlight}><HighlightText text={highlight} /></li>)}
                </ul>
              )}
              {work.additionalHighlights && <ul className="list-disc space-y-1 pl-4 text-sm md:text-base">{work.additionalHighlights.map((highlight) => <li key={highlight}><HighlightText text={highlight} /></li>)}</ul>}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

