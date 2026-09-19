import BlurFade from "@/components/magicui/blur-fade";
import { VerifiedCredentialBadge } from "@/components/verified-credential-badge";
import type { Certification } from "@/data/resume";
import { ArrowUpRight, Layers3 } from "lucide-react";
import Image from "next/image";
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
          {certifications.map((certification) => {
            const cardClassName = "flex flex-col gap-2 rounded-xl border border-primary/15 px-5 py-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.025] sm:flex-row sm:items-center sm:justify-between sm:gap-3";
            const content = (
              <>
                <div className="flex min-w-0 items-center gap-3">
                  <div className={certification.logoUrl ? "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-background p-0.5" : certification.issuer === "Google Cloud" ? "flex size-11 shrink-0 items-center justify-center rounded-full border border-analytics/20 bg-analytics/5 text-analytics dark:bg-analytics/10" : "flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary dark:bg-primary/10"} aria-hidden="true">
                    {certification.logoUrl ? <Image src={certification.logoUrl} alt="" width={48} height={48} className="size-full object-contain" /> : certification.issuer === "Google Cloud" ? <SiGooglecloud className="size-5" /> : <Layers3 className="size-5" />}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <h3 className="min-w-0 text-base font-semibold leading-tight">
                      <span>{certification.name}</span>
                      {certification.href && <span className="ml-2 inline-flex shrink-0 items-center gap-1.5 align-middle whitespace-nowrap">
                        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        <VerifiedCredentialBadge />
                      </span>}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground">
                      {certification.issuer}{certification.subtitle && `   ·   ${certification.subtitle}`}
                    </p>
                  </div>
                </div>
                {(certification.year || certification.date || certification.expiresOn) && (
                  <span className="flex flex-none flex-col gap-0.5 text-sm tabular-nums text-muted-foreground sm:items-end sm:text-right">
                    {(certification.year || certification.date) && <span>Issued {certification.year || certification.date}</span>}
                    {certification.expiresOn && <span>Expires {certification.expiresOn}</span>}
                  </span>
                )}
              </>
            );

            return (
              <BlurFade
                key={`${certification.issuer}-${certification.name}-${certification.year || certification.date || ""}-${certification.expiresOn || ""}`}
                delay={delay + 0.04}
              >
                {certification.href ? (
                  <Link href={certification.href} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certification.name}`} className={`${cardClassName} group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}>
                    {content}
                  </Link>
                ) : <div className={cardClassName}>{content}</div>}
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
