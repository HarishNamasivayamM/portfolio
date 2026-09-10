"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";
import { BadgeCheck, BookOpen, BriefcaseBusiness, Code2, GraduationCap, Layers3, Mail, UserRound, UsersRound } from "lucide-react";

const sections = [
  ["about", "About", UserRound],
  ["value", "Value", Layers3],
  ["experience", "Experience", BriefcaseBusiness],
  ["skills", "Skills", Code2],
  ["projects", "Projects", Layers3],
  ["research", "Research", BookOpen],
  ["education", "Education", GraduationCap],
  ["certifications", "Certifications", BadgeCheck],
  ["leadership", "Leadership", UsersRound],
  ["contact", "Contact", Mail],
] as const;

export default function SectionRail() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const elements = sections.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const updateFromViewport = () => {
      const candidates = elements.map((element) => ({ id: element.id, distance: Math.abs(element.getBoundingClientRect().top - 120) })).sort((a, b) => a.distance - b.distance);
      if (candidates[0]) setActive(candidates[0].id);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.1, 0.35, 0.65] },
    );
    elements.forEach((element) => observer.observe(element));
    const frame = window.requestAnimationFrame(updateFromViewport);
    window.addEventListener("scroll", updateFromViewport, { passive: true });
    window.addEventListener("hashchange", updateFromViewport);
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame); window.removeEventListener("scroll", updateFromViewport); window.removeEventListener("hashchange", updateFromViewport); };
  }, []);

  return (
    <aside className="fixed top-1/2 z-20 hidden -translate-y-1/2 print:hidden min-[1200px]:block" style={{ left: "max(1rem, calc(50% - 650px))" }} aria-label="Section navigation">
      <nav>
        <Dock orientation="vertical" magnification={48} distance={84} className="gap-1 rounded-2xl border-border/60 bg-background/80 p-2 shadow-sm backdrop-blur-xl">
        {sections.map(([id, label, Icon]) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={active === id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(id);
                }}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <DockIcon className={`border p-0 transition-colors ${active === id ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <Icon className="size-full" aria-hidden="true" />
                </DockIcon>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10} className="rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              <p>{label}</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        ))}
        </Dock>
      </nav>
    </aside>
  );
}
