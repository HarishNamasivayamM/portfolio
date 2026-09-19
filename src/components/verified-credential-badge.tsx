"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

interface VerifiedCredentialBadgeProps {
  href?: string;
  label?: string;
}

/** A compact, accessible verification marker for credentials backed by a source URL. */
export function VerifiedCredentialBadge({
  href,
  label = "Verified credential",
}: VerifiedCredentialBadgeProps) {
  const icon = (
    <BadgeCheck
      className="size-5 text-emerald-500 transition-transform group-hover:scale-105"
      strokeWidth={2.2}
      aria-hidden="true"
    />
  );

  const trigger = href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {icon}
    </Link>
  ) : (
    <span
      role="img"
      aria-label={label}
      tabIndex={0}
      className="group inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {icon}
    </span>
  );

  return (
    <TooltipProvider delayDuration={180}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={8}
          className="bg-foreground px-3 py-2 text-sm font-medium text-background"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
