"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { scrollToTop } from "@/lib/scroll-to-section";
import { Github, Home, Search } from "lucide-react";
import { useCallback, type MouseEvent, type ReactNode } from "react";

const LinkedInIcon = DATA.contact.social.LinkedIn.icon;

function DockLink({ href, label, children, external = false, onClick }: { href: string; label: string; children: ReactNode; external?: boolean; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={href} aria-label={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={onClick}>
          <DockIcon className="rounded-3xl size-full cursor-pointer border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {children}
          </DockIcon>
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"><p>{label}</p><TooltipArrow className="fill-primary" /></TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  const openSearch = useCallback(() => window.dispatchEvent(new Event("portfolio:open-search")), []);
  return (
    <div className="portfolio-dock pointer-events-none fixed inset-x-0 bottom-0 z-30 print:hidden sm:bottom-2 min-[1200px]:hidden" data-floating-control>
      <Dock magnification={48} distance={80} className="pointer-events-auto relative z-50 mx-auto flex h-11 w-max gap-1 rounded-full border bg-card/85 p-1 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl">
        <DockLink href="/" label="Home" onClick={(event) => { event.preventDefault(); scrollToTop(); }}><Home className="size-full" /></DockLink>
        <Separator />
        {DATA.contact.social.GitHub.url ? <DockLink href={DATA.contact.social.GitHub.url} label="GitHub" external><Github className="size-full" /></DockLink> : <span title="Add GitHub URL" aria-label="GitHub URL needed" aria-disabled="true"><DockIcon className="rounded-3xl size-full border border-border bg-muted/40 p-0 text-muted-foreground/50"><Github className="size-full" /></DockIcon></span>}
        {DATA.contact.social.LinkedIn.url && <DockLink href={DATA.contact.social.LinkedIn.url} label="LinkedIn" external><LinkedInIcon className="size-full" /></DockLink>}
        <Separator />
        <Tooltip>
          <TooltipTrigger asChild><button type="button" aria-label="Search" onClick={openSearch}><DockIcon className="rounded-3xl size-full cursor-pointer border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Search className="size-full" /></DockIcon></button></TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"><p>Search</p><TooltipArrow className="fill-primary" /></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild><DockIcon className="rounded-3xl size-full cursor-pointer border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><ModeToggle className="size-full cursor-pointer" /></DockIcon></TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground"><p>Theme</p><TooltipArrow className="fill-primary" /></TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}

function Separator() {
  return <span className="mx-1 h-2/3 w-px self-center bg-border" aria-hidden="true" />;
}
