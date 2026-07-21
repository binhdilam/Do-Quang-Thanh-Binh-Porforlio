import { translations } from "../translations";
import { ArrowUpRight, Phone, Mail, Clock, Pin } from "./ui/Icons";
import profileImg from "../assets/images/howard-portrait.jpeg";

interface HeroProps {
  lang: "en" | "vi";
  handleScrollTo: (id: string) => void;
}

/** Headline figures, each traceable to a dashboard in the Results section. */
const HEADLINE_STATS = [
  {
    value: "9.54x",
    tone: "amber",
    label: { en: "Blended ROAS", vi: "ROAS tổng" },
    sub: { en: "16 TikTok campaigns, 2 months", vi: "16 chiến dịch TikTok, 2 tháng" },
  },
  {
    value: "33.21x",
    tone: "amber",
    label: { en: "Peak GMV Max ROI", vi: "ROI GMV Max cao nhất" },
    sub: { en: "Video GMV Max, May 2026", vi: "Video GMV Max, 5/2026" },
  },
  {
    value: "$25K+",
    tone: "brand",
    label: { en: "Monthly ad spend", vi: "Chi phí QC mỗi tháng" },
    sub: { en: "Managed across 5 platforms", vi: "Quản lý trên 5 nền tảng" },
  },
  {
    value: "14",
    tone: "brand",
    label: { en: "Brands run in parallel", vi: "Thương hiệu chạy song song" },
    sub: { en: "Unilever, Closeup, Bioré…", vi: "Unilever, Closeup, Bioré…" },
  },
] as const;

/** Brands and products worked on directly, per CV — split into two rows for the marquee. */
const BRANDS_ROW_1 = [
  "Unilever Beauty",
  "Closeup",
  "Bioré",
  "P/S",
  "Old Spice",
  "Amortals",
];
const BRANDS_ROW_2 = [
  "Rock Sweet",
  "Bạn Uống Tôi Lái",
  "Bship",
  "Jobbags",
  "Nhà Nhân Food",
  "Nấm Liên Hoa",
];

export default function Hero({ lang, handleScrollTo }: HeroProps) {
  const t = translations[lang];

  const copy = {
    en: {
      status: "Open to new accounts",
      lede: "I plan, launch and scale paid acquisition across TikTok Shop, Meta, Google, Amazon, Apple Search and Zalo — backed by the tracking and automation that keep every campaign accountable. I publish the dashboards, not just the adjectives.",
      primary: "See the numbers",
      secondary: "Work with me",
      role: "Performance Marketing Specialist",
      based: "Ho Chi Minh City, Vietnam",
      response: "Replies within 30 minutes",
      directLine: "Phone · Zalo · WhatsApp",
      email: "Email",
      brandsLabel: "Brands and products run directly",
    },
    vi: {
      status: "Đang nhận tài khoản mới",
      lede: "Tôi lên kế hoạch, triển khai và mở rộng paid acquisition trên TikTok Shop, Meta, Google, Amazon, Apple Search và Zalo — cùng hệ thống đo lường và tự động hóa đứng sau mỗi chiến dịch. Tôi công khai dashboard, không chỉ nói suông.",
      primary: "Xem số liệu",
      secondary: "Liên hệ hợp tác",
      role: "Chuyên gia Performance Marketing",
      based: "TP. Hồ Chí Minh, Việt Nam",
      response: "Phản hồi trong vòng 30 phút",
      directLine: "Điện thoại · Zalo · WhatsApp",
      email: "Email",
      brandsLabel: "Thương hiệu và sản phẩm đã trực tiếp chạy",
    },
  }[lang];

  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      {/* Two-tone ambient light, off-centre so the composition stays asymmetric */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-52 right-[-12%] h-[46rem] w-[46rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-brand-wash) 0%, transparent 66%)",
          }}
        />
        <div
          className="absolute top-[28rem] left-[-16%] h-[34rem] w-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-amber-wash) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[88rem]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ================= Left: the statement ================= */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="reveal is-visible inline-flex items-center gap-2.5 rounded-full border border-forest/25 bg-forest-wash px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-deep">
                {copy.status}
              </span>
            </div>

            <h1 className="display mt-4 text-[3.25rem] leading-[0.92] text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Howard Do
              <span className="mt-2 block font-light italic text-brand">
                performance
              </span>
              <span className="block">marketing</span>
            </h1>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-ink-3">
              {t.hero.fullName}
            </p>

            <p className="prose-measure mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl">
              {copy.lede}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                onClick={() => handleScrollTo("showcase")}
                className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-deep active:scale-[0.98]"
              >
                {copy.primary}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="group inline-flex items-center gap-2 border-b border-ink-4/40 pb-1 text-sm font-medium text-ink transition-colors duration-500 hover:border-amber hover:text-amber-deep"
              >
                {copy.secondary}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px" />
              </button>
            </div>

            {/* Headline figures — alternating accent, tabular, baseline-aligned */}
            <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-2xl lg:mt-8">
              {HEADLINE_STATS.map((s, i) => (
                <div
                  key={s.value}
                  className="reveal border-t-2 pt-4"
                  style={{
                    transitionDelay: `${150 + i * 90}ms`,
                    borderTopColor:
                      s.tone === "amber"
                        ? "var(--color-amber)"
                        : "var(--color-brand)",
                  }}
                >
                  <dd
                    className={`tnum text-3xl font-bold leading-none sm:text-4xl ${
                      s.tone === "amber" ? "text-amber-deep" : "text-brand"
                    }`}
                  >
                    {s.value}
                  </dd>
                  <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    {s.label[lang]}
                  </dt>
                  <p className="mt-1 text-[11px] leading-snug text-ink-4">
                    {s.sub[lang]}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          {/* ================= Right: the contact plate ================= */}
          <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9 lg:sticky lg:top-28">
            <div className="reveal bezel bezel--brand" style={{ transitionDelay: "220ms" }}>
              <div className="bezel-core overflow-hidden">
                {/* Portrait — framed so the face sits on the optical centre */}
                <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[1.25rem] bg-paper-3">
                  <img
                    src={profileImg}
                    alt="Do Quang Thanh Binh (Howard), performance marketing specialist"
                    className="h-full w-full object-cover object-[62%_24%]"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,31,25,0.72) 0%, rgba(15,31,25,0.12) 38%, transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-2xl leading-none text-white">
                      Howard Do
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      {copy.role}
                    </p>
                  </div>
                </div>

                {/* Channels */}
                <div className="p-5 sm:p-6">
                  <ul className="space-y-4">
                    <li>
                      <a href="tel:+84788351752" className="group flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                          <Phone className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-4">
                            {copy.directLine}
                          </span>
                          <span className="tnum block text-sm font-semibold text-ink">
                            +84 788 351 752
                          </span>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="mailto:thanhbinh72.work@gmail.com"
                        className="group flex items-center gap-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-wash text-amber-deep transition-colors duration-500 group-hover:bg-amber group-hover:text-white">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-4">
                            {copy.email}
                          </span>
                          <span className="block truncate text-sm font-semibold text-ink">
                            thanhbinh72.work@gmail.com
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 space-y-2.5 border-t border-line-soft pt-5">
                    <p className="flex items-center gap-2.5 text-xs text-ink-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {copy.response}
                    </p>
                    <p className="flex items-center gap-2.5 text-xs text-ink-2">
                      <Pin className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {copy.based}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          Brand strip — two counter-scrolling rows, folded into Hero for early proof of scale.
          Deliberately not gated behind `.reveal`: it sits close to the fold on most real
          screens, and scroll-reveal timing across browsers is not reliable enough to trust
          for something meant to be an immediate trust signal. It just renders visible.

          The old standalone "scroll for more" cue was cut — on real-world screen heights it
          pushed this strip far enough down that its second row landed right on the fold, so
          the nudge-to-scroll button was actively working against the thing it was meant to
          reveal. The "See the numbers" CTA above already implies there's more below.
        */}
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-3">
            {copy.brandsLabel}
          </p>

          <div className="marquee-host marquee-mask mt-5 space-y-3 overflow-hidden">
            <ul className="marquee-track items-center">
              {[...BRANDS_ROW_1, ...BRANDS_ROW_1].map((brand, i) => (
                <li
                  key={`r1-${brand}-${i}`}
                  aria-hidden={i >= BRANDS_ROW_1.length}
                  className="flex shrink-0 items-center"
                >
                  <span className="font-display text-xl font-medium tracking-tight text-ink-3 transition-colors duration-500 hover:text-brand sm:text-2xl">
                    {brand}
                  </span>
                  <span aria-hidden className="mx-7 h-1 w-1 rounded-full bg-amber/40 sm:mx-10" />
                </li>
              ))}
            </ul>

            <ul className="marquee-track-reverse items-center">
              {[...BRANDS_ROW_2, ...BRANDS_ROW_2].map((brand, i) => (
                <li
                  key={`r2-${brand}-${i}`}
                  aria-hidden={i >= BRANDS_ROW_2.length}
                  className="flex shrink-0 items-center"
                >
                  <span className="font-display text-xl font-medium tracking-tight text-ink-3 transition-colors duration-500 hover:text-brand sm:text-2xl">
                    {brand}
                  </span>
                  <span aria-hidden className="mx-7 h-1 w-1 rounded-full bg-brand/40 sm:mx-10" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
