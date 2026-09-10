export function clearSectionHash() {
  if (typeof window === "undefined" || !window.location.hash) return;
  window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
}

export function scrollToSection(id: string) {
  clearSectionHash();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  clearSectionHash();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
