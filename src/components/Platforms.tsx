import { translations } from "../translations";
import { Spark, Aperture, Waveform, Globe, Stack, Fingerprint } from "./ui/Icons";

interface PlatformsProps {
  lang: "en" | "vi";
}

const PLATFORM_KEYS = ["pTikTok", "pMeta", "pGoogle", "pApple", "pZalo"] as const;
const OBJECTIVE_KEYS = ["cEcom", "cUA", "cLead", "cAware"] as const;

const objectiveIcons = [Stack, Aperture, Fingerprint, Globe];

export default function Platforms({ lang }: PlatformsProps) {
  const t = translations[lang];

  return (
    <section
      id="platforms"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="reveal max-w-3xl">
          <span className="inline-block rounded-full border border-brand/20 bg-brand-wash px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-deep">
            {lang === "en" ? "Channels" : "Kênh"}
          </span>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] text-ink">
            {t.platforms.title}
          </h2>
          <p className="prose-measure mt-6 text-base sm:text-lg leading-relaxed text-ink-2">
            {t.platforms.subtitle}
          </p>
        </div>

        {/* Two balanced columns — equal width, equal card treatment */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 lg:mt-24 lg:grid-cols-2">
          {/* ---- Where budget goes: platform list only, no captions ---- */}
          <div>
            <h3 className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
              <Waveform className="h-4 w-4 text-brand" />
              {t.platforms.secLeft}
            </h3>

            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PLATFORM_KEYS.map((key, i) => {
                const p = t.platforms[key];
                return (
                  <li
                    key={key}
                    className="reveal"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-brand-soft hover:bg-brand-wash">
                      <span className="tnum shrink-0 text-[11px] text-ink-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-[15px] font-semibold tracking-tight text-ink transition-colors duration-500 group-hover:text-brand-deep">
                        {p.title}
                      </h4>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---- Strategic campaign structures: matching card treatment ---- */}
          <div>
            <h3 className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
              <Spark className="h-4 w-4 text-amber-deep" />
              {t.platforms.secRight}
            </h3>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OBJECTIVE_KEYS.map((key, i) => {
                const c = t.platforms[key];
                const Icon = objectiveIcons[i];
                return (
                  <div
                    key={key}
                    className="reveal group rounded-2xl border border-line bg-paper p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-amber-soft hover:bg-amber-wash"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-wash text-amber-deep transition-colors duration-500 group-hover:bg-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h4 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-ink">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
