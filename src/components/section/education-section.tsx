import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Education } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function EducationSection({ entries }: { entries: readonly Education[] }) {
  return (
    <section id="education" className="flex flex-col gap-5">
      <BlurFade delay={0.04}><h2 className="text-xl font-bold tracking-tight">Education</h2></BlurFade>
      <div className="flex flex-col gap-5">
        {entries.map((education, index) => (
          <BlurFade key={`${education.school}-${education.degree}-${education.start}`} delay={0.08 + index * 0.04}>
            <div className="flex items-start gap-3">
              <Avatar className="size-11 border border-primary/25 bg-primary/5 text-primary shadow-sm dark:bg-primary/10">
                <AvatarImage src={education.logoUrl} alt="" className="object-contain" />
                <AvatarFallback className="bg-primary/5 text-xs font-semibold text-primary dark:bg-primary/10" aria-hidden="true">{education.initials}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:justify-between sm:gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="text-base font-semibold leading-snug">
                    {education.href ? (
                      <Link href={education.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {education.school}<ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      </Link>
                    ) : education.school}
                  </h3>
                  <p className="text-base text-muted-foreground">{education.degree}</p>
                  {education.field && <p className="text-sm text-muted-foreground">{education.field}</p>}
                  {education.affiliatedCollege && <p className="text-sm text-muted-foreground">Affiliated college: {education.affiliatedCollege}</p>}
                  {education.gpa && <p className="text-sm text-muted-foreground">GPA: {education.gpa}</p>}
                  {education.location && <p className="text-sm text-muted-foreground">{education.location}</p>}
                </div>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:text-right">
                  {education.start && education.end
                    ? `${education.start} to ${education.end}`
                    : education.start || education.end}
                </span>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
