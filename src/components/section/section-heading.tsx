import type { ReactNode } from "react";

export default function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="rounded-lg bg-primary px-3 py-1 text-base font-medium text-primary-foreground">
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children}
    </div>
  );
}
