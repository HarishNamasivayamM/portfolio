import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import CertificationsSection from "@/components/section/certifications-section";
import EducationSection from "@/components/section/education-section";
import GitHubActivitySection from "@/components/section/github-activity-section";
import LeadershipSection from "@/components/section/leadership-section";
import ProjectsSection from "@/components/section/projects-section";
import PublicationsAchievementsSection from "@/components/section/publications-achievements-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import ValueSection from "@/components/section/value-section";
import { FaMicrosoft } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { ArrowDown, FileText, Github } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-14 pb-24 sm:gap-16 sm:pb-20">
      <section id="hero" className="w-full">
        <div className="mx-auto flex w-full max-w-2xl flex-col justify-between gap-2 gap-y-6 md:flex-row">
          <div className="order-2 min-w-0 max-w-[560px] space-y-4 md:order-1">
            <BlurFadeText
              className="text-sm font-medium tracking-wide text-primary"
              delay={BLUR_FADE_DELAY}
              text={DATA.role}
            />
            <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
              <h1 className="text-3xl font-semibold leading-tight tracking-tighter sm:text-4xl lg:text-[2.75rem]">
                Hi, I&apos;m {DATA.name.split(" ")[0]}
              </h1>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="max-w-[540px] text-base leading-relaxed text-muted-foreground md:text-lg">{DATA.breadth}</p>
              <p className="mt-1 text-sm text-muted-foreground">{DATA.location}</p>
            </BlurFade>
            <div className="flex flex-wrap gap-2 pt-1">
              {DATA.contact.social.Resume.url ? <Link href={DATA.contact.social.Resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><FileText className="size-4" aria-hidden="true" />Resume</Link> : <span title="Add your resume URL in src/data/resume.tsx" aria-disabled="true" className="inline-flex min-h-10 cursor-not-allowed items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-3.5 py-2 text-sm font-semibold text-muted-foreground"><FileText className="size-4" aria-hidden="true" />Resume</span>}
              {DATA.contact.social.GitHub.url && <Link href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Github className="size-4" aria-hidden="true" />GitHub</Link>}
              {DATA.contact.social.LinkedIn.url && <Link href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><DATA.contact.social.LinkedIn.icon className="size-4" aria-hidden="true" />LinkedIn</Link>}
              <Link href="#projects" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowDown className="size-4" aria-hidden="true" />Projects</Link>
            </div>
            <div className="grid max-w-xl grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-2">
              {DATA.certifications.slice(0, 2).map((certification) => (
                <div key={certification.name} className="flex items-start gap-2.5 rounded-md border border-primary/20 bg-primary/[0.035] px-3 py-2 dark:bg-primary/[0.07]">
                  {certification.issuer === "Google Cloud" ? <SiGooglecloud className="mt-0.5 size-4 shrink-0 text-[#4285f4]" aria-hidden="true" /> : <FaMicrosoft className="mt-0.5 size-4 shrink-0 text-[#737373] dark:text-[#d4d4d4]" aria-hidden="true" />}
                  <div><p className="text-sm font-semibold leading-snug text-foreground">{certification.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{certification.issuer}{certification.subtitle && `   ·   ${certification.subtitle}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY} className="order-1 mx-auto md:order-2 md:mx-0 md:pt-1">
            <Avatar className="size-24 rounded-full border border-primary/20 bg-primary/5 shadow-lg ring-4 ring-muted md:size-32 dark:bg-primary/10">
              <AvatarImage alt="Profile photo placeholder" src={DATA.avatarUrl} />
              <AvatarFallback className="bg-primary/5 text-lg font-semibold tracking-tight text-primary dark:bg-primary/10 md:text-2xl">{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </section>
      <section id="about" className="w-full">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h2 className="text-xl font-bold tracking-tight">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="prose max-w-[680px] text-pretty font-sans text-base leading-7 text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <ValueSection />
      <section id="experience" className="flex w-full flex-col gap-5">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h2 className="text-xl font-bold tracking-tight">Work Experience</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <WorkSection />
        </BlurFade>
      </section>
      <SkillsSection coreStack={DATA.coreStack} groups={DATA.skillGroups} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <ProjectsSection />
      </BlurFade>
      <PublicationsAchievementsSection entries={DATA.publicationsAchievements} research={DATA.projects.find((project) => project.research)} />
      <EducationSection entries={DATA.education} />
      <CertificationsSection certifications={DATA.certifications} delay={BLUR_FADE_DELAY} />
      <LeadershipSection entries={DATA.leadership} />
      <GitHubActivitySection config={DATA.githubActivity} />
      <WritingSection personalPostSlugs={DATA.writing.personalPostSlugs} />
      <section id="contact" className="w-full scroll-mb-24 sm:scroll-mb-20">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
