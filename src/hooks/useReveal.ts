import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to every `.reveal` element as it enters the viewport.
 *
 * Elements come and go outside of this hook's own component tree — e.g. the
 * Showcase gallery keeps its filter state locally, so switching filters
 * mounts brand-new `.reveal` tiles without App (where this hook lives) ever
 * re-rendering. A React-render-driven re-scan would miss those nodes
 * entirely and leave them stuck at opacity 0. A MutationObserver watching
 * the whole document sidesteps that: any `.reveal` node, from anywhere,
 * gets observed the moment it's inserted.
 *
 * Some browsers (Safari in particular) don't reliably fire the observer's
 * first callback for a target that is already sitting inside the viewport
 * at the moment `observe()` is called — the entry only arrives after an
 * actual scroll or resize. That leaves above-the-fold content stuck
 * invisible until the user scrolls, which reads as a broken page. To avoid
 * depending on that first callback, every newly observed node is also
 * checked synchronously against the viewport and revealed immediately if
 * it already qualifies.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    // Mirrors the observer's own rootMargin/threshold so the manual check
    // and the async one agree on what counts as "in view".
    const isAlreadyInView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) return false;
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const cutoff = viewportH - viewportH * 0.1;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, cutoff);
      const visibleHeight = visibleBottom - visibleTop;
      return visibleHeight > 0 && visibleHeight / rect.height >= 0.05;
    };

    const observeNew = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((n) => {
          if (isAlreadyInView(n)) {
            n.classList.add("is-visible");
            return;
          }
          io.observe(n);
        });
    };

    // Whatever is already on the page at mount time.
    observeNew(document.body);

    // Whatever gets added later — filter switches, tab changes, anything.
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains("reveal") && !node.classList.contains("is-visible")) {
            if (isAlreadyInView(node)) node.classList.add("is-visible");
            else io.observe(node);
          }
          observeNew(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/**
 * Tracks which section is currently in view for nav highlighting.
 */
export function useActiveSection(ids: string[], onChange: (id: string) => void) {
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const sections = idsRef.current
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) onChange(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.25, 0.5, 0.75] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);
}
