import { translations } from "../translations";
import { Bolt } from "./ui/Icons";

interface ScopeProps {
  lang: "en" | "vi";
}

export default function Scope({ lang }: ScopeProps) {
  const t = translations[lang];

  return (
    <section
      id="scope"
      className="relative border-y border-line bg-paper-2 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="reveal max-w-3xl">
          <span className="inline-block rounded-full border border-line bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
            {t.scope.subHeadline}
          </span>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] text-ink">
            {t.scope.title}
          </h2>
          <p className="prose-measure mt-6 text-base sm:text-lg leading-relaxed text-ink-2">
            {t.scope.subtitle}
          </p>
        </div>

        {/* ---- Six steps as a numbered editorial rail ---- */}
        <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-px border-t border-line md:grid-cols-2 lg:mt-24">
          {t.scope.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal group border-b border-line py-8 sm:py-10"
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
            >
              <div className="flex gap-6">
                <span className="tnum shrink-0 pt-1 text-[11px] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-ink">
                    {step.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {step.desc
                      .split("\n")
                      .map((line) => line.replace(/^•\s*/, "").trim())
                      .filter(Boolean)
                      .map((line) => (
                        <li
                          key={line}
                          className="flex items-baseline gap-3 text-sm leading-relaxed text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-4"
                          />
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* ---- Automation block ---- */}
        <div className="reveal mt-20 lg:mt-28">
          <div className="bezel">
            <div className="bezel-core p-6 sm:p-10 lg:p-14">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-wash px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-deep">
                    <Bolt className="h-3 w-3" />
                    {lang === "en" ? "Automation" : "Tự động hoá"}
                  </span>
                  <h3 className="display mt-6 text-3xl leading-tight text-ink sm:text-4xl">
                    {t.scope.autoTitle}
                  </h3>
                  <p className="prose-measure mt-5 text-[15px] leading-relaxed text-ink-2">
                    {t.scope.autoSubtitle}
                  </p>
                </div>

                <ul className="lg:col-span-6 lg:col-start-7 divide-y divide-line-soft border-t border-line">
                  {t.scope.autoList.map((a) => (
                    <li key={a.title} className="py-6">
                      <h4 className="text-[15px] font-semibold tracking-tight text-ink">
                        {a.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">
                        {a.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
