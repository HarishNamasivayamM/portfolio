import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { CalendarDays, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import Link from "next/link";

type ContactCard = { title: string; description: string; label: string; href?: string; icon: LucideIcon; disabled?: boolean };

export default function ContactSection() {
  const conversationHref = DATA.contact.scheduleUrl || `mailto:${DATA.contact.email}?subject=${encodeURIComponent("Portfolio Conversation")}&body=${encodeURIComponent("Hi Harish,\n\nI came across your portfolio and would like to connect regarding...")}`;
  const cards: ContactCard[] = [
    { title: "Schedule a conversation", description: "For opportunities, project discussions, or a quick introduction.", label: "Schedule a 20 - 30 min conversation", href: DATA.contact.scheduleUrl || undefined, icon: CalendarDays, disabled: !DATA.contact.scheduleUrl },
    { title: "Email me", description: DATA.contact.email, label: "Send Email", href: DATA.contact.social.email.url, icon: Mail },
    { title: "Connect on LinkedIn", description: "Professional profile and experience", label: "Connect on LinkedIn", href: DATA.contact.social.LinkedIn.url || undefined, icon: Linkedin, disabled: !DATA.contact.social.LinkedIn.url },
    { title: "View GitHub", description: "Code, projects, and experiments", label: DATA.contact.social.GitHub.url ? "View GitHub" : "GitHub URL needed", href: DATA.contact.social.GitHub.url || undefined, icon: Github, disabled: !DATA.contact.social.GitHub.url },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border p-6 pt-14 sm:p-8 sm:pt-14">
      <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1"><span className="text-sm font-medium text-background">Let&apos;s Connect</span></div>
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-xl"><FlickeringGrid className="h-full w-full" squareSize={2} gridGap={2} style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }} /></div>
      <div className="relative flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Let&apos;s Connect</h2>
          <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">Open to conversations around data engineering, analytics, ML/AI, projects, and opportunities.</p>
          <Link href={conversationHref} target={DATA.contact.scheduleUrl ? "_blank" : undefined} rel={DATA.contact.scheduleUrl ? "noopener noreferrer" : undefined} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start a Conversation</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            const content = <><Icon className="size-5 text-primary" aria-hidden="true" /><span className="mt-3 block text-base font-semibold text-foreground">{card.title}</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{card.description}</span><span className={`mt-3 block text-sm font-medium ${card.disabled ? "text-muted-foreground" : "text-primary"}`}>{card.disabled ? "Email me to arrange a time" : card.label}</span></>;
            return card.href ? <Link key={card.title} href={card.href} target={card.href.startsWith("mailto:") ? undefined : "_blank"} rel={card.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="rounded-xl border border-border/80 bg-background/70 p-4 transition-colors hover:border-primary/30 hover:bg-primary/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{content}</Link> : <div key={card.title} aria-disabled="true" className="rounded-xl border border-border/60 bg-muted/20 p-4">{content}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
