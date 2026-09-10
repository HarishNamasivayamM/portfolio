"use client";

import { BadgeCheck, BookOpen, BriefcaseBusiness, Code2, GraduationCap, Layers3, Mail, UserRound, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

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
      const current = elements.reduce((selected, element) => element.getBoundingClientRect().top <= 180 ? element : selected, elements[0]);
      if (current) setActive(current.id);
    };
    const frame = window.requestAnimationFrame(updateFromViewport);
    window.addEventListener("scroll", updateFromViewport, { passive: true });
    window.addEventListener("resize", updateFromViewport);
    window.addEventListener("hashchange", updateFromViewport);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", updateFromViewport); window.removeEventListener("resize", updateFromViewport); window.removeEventListener("hashchange", updateFromViewport); };
  }, []);

  return <aside className="fixed top-1/2 z-20 hidden -translate-y-1/2 print:hidden min-[1200px]:block" style={{ left: "max(1rem, calc(50% - 33rem))" }} aria-label="Section navigation"><nav className="w-40 rounded-2xl border border-border/60 bg-background/85 p-2 shadow-sm backdrop-blur-xl"><ul className="flex flex-col gap-1">{sections.map(([id, label, Icon]) => <li key={id}><a href={`#${id}`} aria-label={label} aria-current={active === id ? "true" : undefined} onClick={(event) => { event.preventDefault(); scrollToSection(id); }} className={`group flex h-9 w-full origin-left items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-[transform,background-color,color,box-shadow] duration-200 hover:scale-[1.06] hover:bg-muted hover:text-foreground focus-visible:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${active === id ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground"}`}><span className={`flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors ${active === id ? "border-primary/30 bg-primary/10 text-primary" : "border-border/70 bg-background text-muted-foreground group-hover:border-primary/25 group-hover:text-primary"}`}><Icon className="size-3.5" aria-hidden="true" /></span><span>{label}</span></a></li>)}</ul></nav></aside>;
}
