import Script from "next/script";

export default function InitialScroll() {
  return (
    // The initializer must run before hydration so the browser never anchors to a stale hash first.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="portfolio-initial-scroll" strategy="beforeInteractive">
      {`(() => {
  try {
    history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  } catch {}
})();`}
    </Script>
  );
}
