"use client";

import { DATA } from "@/data/resume";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type SearchItem = { title: string; type: string; snippet: string; section: string };

function buildIndex(): SearchItem[] {
  return [
    { title: "About", type: "Section", snippet: DATA.summary, section: "about" },
    { title: "Experience", type: "Section", snippet: "Work experience, roles, and measurable contributions", section: "experience" },
    ...DATA.work.map((entry) => ({ title: `${entry.title}   ·   ${entry.company}`, type: "Experience", snippet: entry.summary ?? entry.highlights?.[0] ?? "", section: "experience" })),
    { title: "Where I Add Value", type: "Section", snippet: "Data engineering, analytics, data science, MLOps, and applied AI capabilities", section: "value" },
    { title: "Technical Skills", type: "Section", snippet: DATA.coreStack.map((skill) => skill.name).join("   ·   "), section: "skills" },
    { title: "Projects", type: "Section", snippet: "Featured projects and more project work", section: "projects" },
    ...DATA.projects.filter((project) => !project.research).map((project) => ({ title: project.title, type: "Project", snippet: project.outcome, section: "projects" })),
    { title: "Research & Recognition", type: "Section", snippet: "Research publications, awards, and recognition", section: "research" },
    ...(DATA.projects.filter((project) => project.research).map((project) => ({ title: project.title, type: "Research", snippet: project.outcome, section: "research" }))),
    ...DATA.publicationsAchievements.map((entry) => ({ title: entry.title, type: entry.type, snippet: entry.description, section: "research" })),
    ...DATA.education.map((entry) => ({ title: entry.degree, type: "Education", snippet: entry.school, section: "education" })),
    { title: "Education", type: "Section", snippet: "Academic background and degrees", section: "education" },
    { title: "Certifications", type: "Section", snippet: "Professional certifications and credentials", section: "certifications" },
    ...DATA.certifications.map((entry) => ({ title: entry.name, type: "Certification", snippet: `${entry.issuer}${entry.subtitle ? `   ·   ${entry.subtitle}` : ""}`, section: "certifications" })),
    { title: "Leadership", type: "Section", snippet: "Leadership, activities, and community involvement", section: "leadership" },
    ...DATA.leadership.map((entry) => ({ title: entry.organization, type: "Leadership", snippet: entry.roles.map((role) => role.title).join("   ·   "), section: "leadership" })),
    { title: "Contact", type: "Section", snippet: DATA.contact.email, section: "contact" },
  ];
}

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return index.slice(0, 8);
    return index.filter((item) => `${item.title} ${item.type} ${item.snippet}`.toLowerCase().includes(normalized)).slice(0, 8);
  }, [index, query]);

  function goTo(item: SearchItem) {
    setOpen(false);
    scrollToSection(item.section);
  }

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, input, [href]')).filter((element) => !element.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  useEffect(() => {
    const openSearch = () => { setQuery(""); setSelected(0); setOpen(true); };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
      if (event.key === "/" && !typing) { event.preventDefault(); openSearch(); }
      if (!open) return;
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowDown") { event.preventDefault(); setSelected((value) => Math.min(value + 1, Math.max(results.length - 1, 0))); }
      if (event.key === "ArrowUp") { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
      if (event.key === "Enter" && results[selected]) { event.preventDefault(); goTo(results[selected]); }
    };
    window.addEventListener("portfolio:open-search", openSearch);
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("portfolio:open-search", openSearch); window.removeEventListener("keydown", onKeyDown); };
  }, [open, results, selected]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search portfolio" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl" onKeyDown={trapFocus}>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this portfolio..." className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" aria-label="Search portfolio content" />
          <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close search"><X className="size-4" /></button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length > 0 ? results.map((item, index) => (
            <button type="button" key={`${item.type}-${item.title}`} onClick={() => goTo(item)} className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === index ? "bg-primary/10" : "hover:bg-muted"}`}>
              <span className="flex items-center justify-between gap-3"><span className="truncate text-sm font-semibold">{item.title}</span><span className="shrink-0 text-xs text-muted-foreground">{item.type}</span></span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.snippet}</span>
            </button>
          )) : <p className="px-3 py-8 text-center text-sm text-muted-foreground">No matching portfolio content.</p>}
        </div>
        <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">Use arrow keys to navigate   ·   Enter to open   ·   Esc to close</p>
      </div>
    </div>
  );
}
