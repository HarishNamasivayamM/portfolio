import BlurFade from "@/components/magicui/blur-fade";
import type { Certification } from "@/data/resume";
import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { SiGooglecloud } from "react-icons/si";

interface CertificationsSectionProps {
  certifications: readonly Certification[];
  delay?: number;
}

export default function CertificationsSection({
  certifications,
  delay = 0,
}: CertificationsSectionProps) {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold tracking-tight">Certifications</h2>
        </BlurFade>
        <div className="flex w-full flex-col gap-2">
          {certifications.map((certification) => (
            <BlurFade
              key={`${certification.issuer}-${certification.name}-${certification.year || certification.date || ""}`}
              delay={delay + 0.04}
            >
              <div className="flex flex-col gap-2 rounded-xl border border-primary/15 px-5 py-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.025] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={certification.issuer === "Google Cloud" ? "flex size-11 shrink-0 items-center justify-center rounded-full border border-analytics/20 bg-analytics/5 text-analytics dark:bg-analytics/10" : "flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary dark:bg-primary/10"} aria-hidden="true">
                    {certification.issuer === "Google Cloud" ? <SiGooglecloud className="size-5" /> : <Layers3 className="size-5" />}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <h3 className="text-base font-semibold leading-tight">
                      {certification.href ? (
                        <Link
                          href={certification.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {certification.name}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </Link>
                      ) : (
                        certification.name
                      )}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground">
                      {certification.issuer}{certification.subtitle && `   ·   ${certification.subtitle}`}
                    </p>
                    {certification.credentialId && <p className="font-sans text-sm text-muted-foreground">Credential ID: {certification.credentialId}</p>}
                  </div>
                </div>
                {(certification.year || certification.date) && (
                  <span className="flex-none text-sm tabular-nums text-muted-foreground sm:text-right">
                    {certification.year || certification.date}
                  </span>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
