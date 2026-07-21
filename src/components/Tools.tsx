import { translations } from "../translations";
import { Aperture, Waveform, Bolt, Spark } from "./ui/Icons";

interface ToolsProps {
  lang: "en" | "vi";
}

const STACK = [
  {
    key: "traffic" as const,
    icon: Aperture,
    items: [
      "TikTok Ads Manager",
      "Meta Ads Manager",
      "Google Ads",
      "Apple Search Ads",
      "Zalo Ads",
      "TikTok Seller Center",
    ],
  },
  {
    key: "tracking" as const,
    icon: Waveform,
    items: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Looker Studio",
      "Conversions API",
      "Kalodata",
      "Metric",
    ],
  },
  {
    key: "automation" as const,
    icon: Bolt,
    items: [
      "n8n",
      "Make.com",
      "Google Apps Script",
      "Google Sheets API",
      "Telegram Bot API",
      "Webhooks",
    ],
  },
  {
    key: "creative" as const,
    icon: Spark,
    items: ["Canva", "CapCut", "Figma", "Adobe Suite", "SEO copywriting"],
  },
];

export default function Tools({ lang }: ToolsProps) {
  const t = translations[lang];

  return (
    <section
      id="tools"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="reveal max-w-3xl">
          <span className="inline-block rounded-full border border-line bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
            {lang === "en" ? "Stack" : "Công nghệ"}
          </span>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] text-ink">
            {t.tools.title}
          </h2>
          <p className="prose-measure mt-6 text-base sm:text-lg leading-relaxed text-ink-2">
            {t.tools.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {STACK.map((group, i) => {
            const Icon = group.icon;
            return (
              <div
                key={group.key}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 border-b border-line pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper-2 text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                    {t.tools.cats[group.key]}
                  </h3>
                </div>

                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-ink-2 transition-colors duration-500 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
