/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA, type WorkExperience } from "@/data/resume";
import { ChevronDown } from "lucide-react";

function LogoImage({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    const initials = alt
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

    return (
      <div className="flex size-8 flex-none items-center justify-center rounded-full border bg-muted p-1 text-[0.6rem] font-semibold text-primary shadow ring-2 ring-border md:size-10">
        {initials}
      </div>
    );
  }

  return <img src={src} alt={alt} className="size-8 flex-none overflow-hidden rounded-full border p-1 object-contain shadow ring-2 ring-border md:size-10" onError={() => setImageError(true)} />;
}

export default function WorkSection({
  entries = DATA.work,
}: {
  entries?: readonly WorkExperience[];
}) {
  const [openValue, setOpenValue] = useState("");
  const [tooltipValue, setTooltipValue] = useState<string | null>(null);

  return (
    <Accordion type="single" collapsible value={openValue} onValueChange={setOpenValue} className="grid w-full gap-6">
      {entries.map((work) => {
        const value = `${work.company}-${work.title}-${work.start}`;
        const isOpen = openValue === value;

        return (
          <AccordionItem key={value} value={value} className="grid w-full gap-2 border-b-0">
            <AccordionTrigger aria-label={`${isOpen ? "Hide" : "View"} details for ${work.company}`} onFocus={() => setTooltipValue(value)} onBlur={() => setTooltipValue(null)} className="group cursor-pointer rounded-none p-0 transition-colors hover:no-underline [&>svg]:hidden">
              <div className="flex w-full items-center justify-between gap-x-3 text-left">
                <div className="flex min-w-0 flex-1 items-center gap-x-3">
                  <LogoImage src={work.logoUrl} alt={work.company} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2 font-semibold leading-none">
                      <span className="truncate">{work.company}</span>
                      <Tooltip open={tooltipValue === value} onOpenChange={(open) => setTooltipValue(open ? value : null)}>
                        <TooltipTrigger asChild>
                          <span onMouseEnter={() => setTooltipValue(value)} onMouseLeave={() => setTooltipValue(null)} className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground group-focus-visible:bg-muted group-focus-visible:text-foreground">
                            <ChevronDown className={`size-3.5 stroke-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">{isOpen ? "Hide details" : "View details"}</TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">{work.title}</div>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-1 text-right text-xs tabular-nums text-muted-foreground">
                  <span>{work.start} - {work.end ?? "Present"}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ml-13 p-0 text-xs text-muted-foreground sm:text-sm">
              <div className="space-y-2 leading-relaxed">
                {work.location && <p>{work.location}</p>}
                {work.summary && <p>{work.summary}</p>}
                {work.highlights && work.highlights.length > 0 && (
                  <ul className="list-disc space-y-1 pl-4">
                    {work.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                )}
                {work.additionalHighlights && work.additionalHighlights.length > 0 && (
                  <ul className="list-disc space-y-1 pl-4">
                    {work.additionalHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
