"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

interface QuickMessageProps {
  email: string;
}

export default function QuickMessage({ email }: QuickMessageProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Write a quick message first.");
      return;
    }

    setError("");
    const mailto = `mailto:${email}?subject=${encodeURIComponent("Portfolio Inquiry")}&body=${encodeURIComponent(trimmedMessage)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border/80 bg-background/70 p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Send a Quick Message</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">Type a message and I&apos;ll open your email client.</p>
      </div>
      <label htmlFor="quick-message" className="sr-only">Message</label>
      <textarea
        id="quick-message"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          if (error) setError("");
        }}
        placeholder="Hi Harish, I'd like to connect about..."
        rows={4}
        className="mt-3 min-h-36 w-full resize-y rounded-lg border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/75 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2.5">
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{error}</p>
        <button type="submit" className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Send
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
