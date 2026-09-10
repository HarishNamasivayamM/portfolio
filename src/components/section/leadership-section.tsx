import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { LeadershipEntry } from "@/data/resume";

export default function LeadershipSection({ entries }: { entries: readonly LeadershipEntry[] }) {
  return (
    <section id="leadership" className="flex w-full flex-col gap-5">
      <BlurFade delay={0.04}><div className="flex items-center gap-2"><span className="h-5 w-1 rounded-full bg-research" aria-hidden="true" /><h2 className="text-2xl font-bold">Leadership &amp; Activities</h2></div></BlurFade>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {entries.map((entry, index) => (
          <BlurFade key={entry.organization} delay={0.08 + index * 0.04}>
            <article className={`h-full rounded-xl border border-research/15 bg-card p-5 transition-colors hover:border-research/25 ${entry.secondary ? "opacity-80" : ""}`}>
              <div className="flex items-start gap-3">
                <Avatar className="size-10 shrink-0 border border-research/20 bg-research/5">
                  <AvatarFallback className="bg-research/5 text-[0.65rem] font-semibold text-research dark:bg-research/10" aria-hidden="true">{entry.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold leading-snug">{entry.organization}</h3>
              </div>
              <div className="relative mt-4 flex flex-col gap-3 pl-13">
                <span className="absolute bottom-2 left-[0.4rem] top-2 w-px bg-research/25" aria-hidden="true" />
                {entry.roles.map((role) => (
                  <div key={`${role.title}-${role.start}`} className="relative">
                    <span className="absolute -left-[2.25rem] top-1.5 size-2.5 rounded-full border-2 border-research bg-card" aria-hidden="true" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-base font-medium">{role.title}</span>
                      <span className="text-sm text-muted-foreground">{role.start} to {role.end}</span>
                    </div>
                  </div>
                ))}
              </div>
              {entry.description && <p className="mt-3 pl-13 text-base leading-relaxed text-muted-foreground">{entry.description}</p>}
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
