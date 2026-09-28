import { useState, useEffect, useCallback, useMemo } from "react";
import {
  showcaseItems,
  showcaseFilters,
  categoryTint,
  type ShowcaseItem,
} from "../data/campaigns";
import { Expand, Close, ArrowUpRight } from "./ui/Icons";

interface ShowcaseProps {
  lang: "en" | "vi";
}

const copy = {
  en: {
    eyebrow: "Proof of work",
    title: "Screenshots from the accounts, not a slide deck",
    lede: "Eleven dashboards pulled straight from TikTok Ads Manager, Meta Ads Manager, Google Ads, Apple Search Ads and Zalo Ads. Client names are withheld under NDA; the numbers are untouched.",
    open: "View full dashboard",
    close: "Close",
    nda: "Account names blurred or omitted under NDA. Full walkthroughs available on request.",
    empty: "No campaigns in this category yet.",
  },
  vi: {
    eyebrow: "Bằng chứng thực tế",
    title: "Ảnh chụp từ tài khoản thật, không phải slide",
    lede: "Mười một dashboard lấy trực tiếp từ TikTok Ads Manager, Meta Ads Manager, Google Ads, Apple Search Ads và Zalo Ads. Tên khách hàng được giữ kín theo NDA; số liệu giữ nguyên bản.",
    open: "Xem dashboard đầy đủ",
    close: "Đóng",
    nda: "Tên tài khoản được làm mờ hoặc lược bỏ theo NDA. Có thể trình bày chi tiết khi được yêu cầu.",
    empty: "Chưa có chiến dịch trong nhóm này.",
  },
};

export default function Showcase({ lang }: ShowcaseProps) {
  const t = copy[lang];
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<ShowcaseItem | null>(null);

  const items = useMemo<ShowcaseItem[]>(
    () =>
      filter === "all"
        ? showcaseItems
        : showcaseItems.filter((i) => i.category === filter),
    [filter]
  );

  const closeLightbox = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, closeLightbox]);

  return (
    <section
      id="showcase"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      {/* Two-tone ambient wash so the section has depth on a white canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem]"
        style={{
          background:
            "radial-gradient(46% 46% at 18% 0%, var(--color-brand-wash) 0%, transparent 68%), radial-gradient(42% 44% at 84% 6%, var(--color-amber-wash) 0%, transparent 66%)",
        }}
      />

      <div className="relative max-w-[88rem] mx-auto">
        {/* ---- Section head ---- */}
        <div className="reveal max-w-3xl mb-14 sm:mb-20">
          <span className="inline-block rounded-full border border-brand/20 bg-brand-wash px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-deep">
            {t.eyebrow}
          </span>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] text-ink">
            {t.title}
          </h2>
          <p className="prose-measure mt-6 text-base sm:text-lg leading-relaxed text-ink-2">
            {t.lede}
          </p>
        </div>

        {/* ---- Filters ---- */}
        <div className="reveal mb-10 sm:mb-14 flex flex-wrap items-center gap-2">
          {showcaseFilters.map((f) => {
            const isActive = filter === f.id;
            const count =
              f.id === "all"
                ? showcaseItems.length
                : showcaseItems.filter((i) => i.category === f.id).length;

            const activeBg =
              f.id === "ecommerce"
                ? "bg-amber-deep text-white"
                : f.id === "acquisition"
                  ? "bg-brand text-white"
                  : "bg-ink text-white";

            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                  isActive
                    ? activeBg
                    : "border border-line bg-paper text-ink-2 hover:border-brand-soft hover:text-brand"
                }`}
              >
                {f.label[lang]}
                <span
                  className={`tnum text-[11px] ${
                    isActive ? "text-white/60" : "text-ink-4"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---- Asymmetrical bento ---- */}
        {items.length === 0 ? (
          <p className="text-ink-3">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 grid-flow-row-dense">
            {items.map((item, idx) => (
              <ShowcaseTile
                key={item.id}
                item={item}
                lang={lang}
                index={idx}
                openLabel={t.open}
                onOpen={() => setActive(item)}
              />
            ))}
          </div>
        )}

        <p className="reveal mt-10 text-xs text-ink-4 max-w-xl leading-relaxed">
          {t.nda}
        </p>
      </div>

      {active && (
        <Lightbox
          item={active}
          lang={lang}
          closeLabel={t.close}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

/* ============================================================ */

interface TileProps {
  item: ShowcaseItem;
  lang: "en" | "vi";
  index: number;
  openLabel: string;
  onOpen: () => void;
}

function ShowcaseTile({ item, lang, index, openLabel, onOpen }: TileProps) {
  const hero = item.stats.find((s) => s.hero) ?? item.stats[0];
  const rest = item.stats.filter((s) => s !== hero).slice(0, 3);
  const tint = categoryTint[item.category];

  const colSpan = item.span === "wide" ? "lg:col-span-8" : "lg:col-span-4";
  const aspect = item.span === "wide" ? "aspect-[16/9]" : "aspect-[16/10]";

  return (
    <article
      className={`reveal ${colSpan}`}
      style={{ transitionDelay: `${Math.min(index * 70, 420)}ms` }}
    >
      <div
        className={`bezel ${tint.bezel} h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1`}
      >
        <div className="bezel-core h-full flex flex-col overflow-hidden">
          {/* --- Dashboard frame --- */}
          <button
            onClick={onOpen}
            className="group relative block w-full overflow-hidden rounded-[1.25rem] bg-paper-2 text-left"
            aria-label={`${openLabel} — ${item.title[lang]}`}
          >
            <div className={`${aspect} w-full overflow-hidden`}>
              <img
                src={item.image}
                alt={item.alt[lang]}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover ${item.imagePosition ?? "object-top"} transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]`}
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,31,25,0.74) 0%, rgba(15,31,25,0.2) 45%, transparent 75%)",
              }}
            />

            <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>

            <span className="pointer-events-none absolute bottom-3 left-4 flex translate-y-2 items-center gap-1.5 text-[11px] font-medium text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 group-hover:opacity-100">
              {openLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>

          {/* --- Copy block --- */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] ${tint.badge}`}
              >
                {item.platform}
              </span>
              <span className="tnum text-[10px] text-ink-4">{item.period}</span>
            </div>

            <h3 className="mt-3.5 text-lg sm:text-xl font-semibold leading-snug tracking-tight text-ink">
              {item.title[lang]}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink-2 flex-1">
              {item.note[lang]}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-line-soft pt-5">
              <div>
                <div
                  className={`tnum text-3xl sm:text-4xl font-bold leading-none ${tint.text}`}
                >
                  {hero.value}
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                  {hero.label[lang]}
                </div>
              </div>

              {rest.map((s) => (
                <div key={s.label.en}>
                  <div className="tnum text-sm font-semibold leading-none text-ink">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-ink-4">
                    {s.label[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================ */

function Lightbox({
  item,
  lang,
  closeLabel,
  onClose,
}: {
  item: ShowcaseItem;
  lang: "en" | "vi";
  closeLabel: string;
  onClose: () => void;
}) {
  const tint = categoryTint[item.category];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title[lang]}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute inset-0 bg-ink/70 backdrop-blur-xl"
      />

      <div className="relative z-10 w-full max-w-6xl max-h-[92dvh] overflow-y-auto rounded-[1.75rem] border border-line bg-paper lift">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line-soft bg-paper/95 px-5 py-4 backdrop-blur-sm sm:px-7 sm:py-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] ${tint.badge}`}
              >
                {item.platform}
              </span>
              <span className="tnum text-[10px] text-ink-4">{item.period}</span>
            </div>
            <h3 className="mt-2 text-base sm:text-xl font-semibold tracking-tight text-ink">
              {item.title[lang]}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-brand hover:text-brand active:scale-[0.96]"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 sm:p-7">
          <div className={`bezel ${tint.bezel}`}>
            <div className="bezel-core overflow-hidden">
              <img
                src={item.image}
                alt={item.alt[lang]}
                className="w-full rounded-[1.25rem]"
              />
            </div>
          </div>

          <p className="prose-measure mt-6 text-sm sm:text-base leading-relaxed text-ink-2">
            {item.note[lang]}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
            {item.stats.map((s) => (
              <div key={s.label.en} className="border-t border-line-soft pt-3">
                <dd
                  className={`tnum font-bold leading-none ${
                    s.hero ? `text-2xl ${tint.text}` : "text-lg text-ink"
                  }`}
                >
                  {s.value}
                </dd>
                <dt className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-3">
                  {s.label[lang]}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
