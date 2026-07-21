import { useState, useEffect } from "react";
import { ArrowUpRight } from "./ui/Icons";

interface HeaderProps {
  lang: "en" | "vi";
  setLang: (l: "en" | "vi") => void;
  activeSection: string;
  handleScrollTo: (id: string) => void;
}

const NAV = [
  { id: "about", label: { en: "About", vi: "Giới thiệu" } },
  { id: "showcase", label: { en: "Results", vi: "Kết quả" } },
  { id: "platforms", label: { en: "Channels", vi: "Kênh" } },
  { id: "scope", label: { en: "Process", vi: "Quy trình" } },
  { id: "tools-free", label: { en: "Free tool", vi: "Công cụ" } },
];

export default function Header({
  lang,
  setLang,
  activeSection,
  handleScrollTo,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const t = {
    en: { consult: "Work with me", menu: "Menu", close: "Close menu" },
    vi: { consult: "Liên hệ hợp tác", menu: "Menu", close: "Đóng menu" },
  }[lang];

  // Lock scroll while the overlay is open, close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    handleScrollTo(id);
  };

  return (
    <>
      {/* ---- Floating island nav — detached from the top edge ---- */}
      <header className="sticky top-0 z-50 px-4 pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mx-auto flex w-full items-center justify-between gap-3 rounded-full border border-line/80 bg-paper/75 py-2 pl-3 pr-2 backdrop-blur-xl lift sm:w-max sm:gap-6 sm:pl-5">
            {/* Monogram */}
            <button
              onClick={() => go("about")}
              className="flex shrink-0 items-center gap-2.5"
              aria-label="Howard Do — back to top"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand font-display text-base font-bold text-paper">
                H
              </span>
              <span className="hidden text-sm font-semibold tracking-tight text-ink md:block">
                Howard Do
              </span>
            </button>

            {/* Desktop links */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {link.label[lang]}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {/* Language */}
              <div className="flex items-center rounded-full border border-line bg-paper-2 p-0.5">
                {(["en", "vi"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      lang === l ? "bg-ink text-paper" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Nested CTA */}
              <button
                onClick={() => go("contact")}
                className="group hidden items-center gap-2 rounded-full bg-ink py-1.5 pl-4 pr-1.5 text-sm font-semibold text-paper transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-deep active:scale-[0.98] sm:flex"
              >
                {t.consult}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/12 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>

              {/* Morphing hamburger */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? t.close : t.menu}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper transition-colors duration-500 hover:border-ink-4 lg:hidden"
              >
                <span
                  aria-hidden
                  className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "-rotate-45" : "translate-y-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Full-screen overlay menu with staggered reveal ---- */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-paper/85 backdrop-blur-2xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          aria-label="Mobile"
          className="relative flex h-full flex-col justify-center px-8 pb-16 pt-24"
        >
          {NAV.map((link, i) => (
            <div key={link.id} className="overflow-hidden">
              <button
                onClick={() => go(link.id)}
                tabIndex={open ? 0 : -1}
                className={`block w-full py-3 text-left transition-all ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDuration: "700ms",
                  transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                }}
              >
                <span className="display text-4xl text-ink sm:text-5xl">
                  {link.label[lang]}
                </span>
              </button>
            </div>
          ))}

          <div
            className={`mt-10 transition-all ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{
              transitionDuration: "700ms",
              transitionDelay: open ? `${100 + NAV.length * 60}ms` : "0ms",
            }}
          >
            <button
              onClick={() => go("contact")}
              tabIndex={open ? 0 : -1}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-semibold text-paper transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              {t.consult}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/12 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
