import { GitHubIcon } from "@/components/icons";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import QuickMessage from "@/components/section/quick-message";
import { DATA } from "@/data/resume";
import { ArrowUpRight, CalendarDays, Linkedin, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="relative overflow-hidden rounded-xl border p-5 pt-12 sm:p-6 sm:pt-12">
      <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-xl border bg-primary px-3.5 py-0.5"><span className="text-sm font-medium text-background">Let&apos;s Connect</span></div>
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-xl"><FlickeringGrid className="h-full w-full" squareSize={2} gridGap={2} style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }} /></div>
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Let&apos;s Connect</h2>
          <p className="mx-auto mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground text-balance sm:text-base">Open to conversations around data engineering, analytics, ML/AI, projects, and opportunities.</p>
        </div>
        <QuickMessage email={DATA.contact.email} />
        <div className="flex items-center gap-3 py-0.5 text-muted-foreground" aria-hidden="true">
          <span className="h-px flex-1 bg-border/70" />
          <span className="text-xs font-medium uppercase tracking-[0.18em]">or</span>
          <span className="h-px flex-1 bg-border/70" />
        </div>
        <div className="rounded-xl border border-border/80 bg-background/70 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"><CalendarDays className="size-4" aria-hidden="true" /></span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight">Schedule a Conversation</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">Pick a time that works for you.</p>
            </div>
          </div>
          <a href={DATA.contact.scheduleUrl} target="_blank" rel="noopener noreferrer" aria-label="Schedule a conversation with Harish" className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <CalendarDays className="size-4" aria-hidden="true" />
            Schedule a Conversation
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <nav aria-label="Contact links" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-border/70 pt-3 text-sm">
          {DATA.contact.social.GitHub.url && <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" aria-label="View Harish&apos;s GitHub" className="inline-flex min-h-8 items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><GitHubIcon className="size-4" aria-hidden="true" />GitHub</a>}
          {DATA.contact.social.LinkedIn.url && <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" aria-label="Connect with Harish on LinkedIn" className="inline-flex min-h-8 items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Linkedin className="size-4" aria-hidden="true" />LinkedIn</a>}
          <a href={DATA.contact.social.email.url} aria-label="Email Harish" className="inline-flex min-h-8 items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Mail className="size-4" aria-hidden="true" />Email</a>
        </nav>
      </div>
    </div>
  );
}
