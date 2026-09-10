"use client";

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
    <aside className="fixed top-1/2 z-20 hidden -translate-y-1/2 print:hidden xl:block" style={{ left: "max(1rem, calc(50% - 650px))" }} aria-label="Section navigation">
      <nav className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/80 p-2 shadow-sm backdrop-blur-xl">
        {sections.map(([id, label, Icon]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(id);
            }}
            className={`flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <Icon className="size-[18px] shrink-0" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
