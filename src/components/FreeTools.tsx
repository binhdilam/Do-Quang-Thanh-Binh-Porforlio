import { ArrowUpRight, Bolt, Vault, Waveform, Check } from "./ui/Icons";
import toolPreview from "../assets/showcase/tiktok-tool-preview.jpeg";

interface FreeToolsProps {
  lang: "en" | "vi";
}

const TOOL_URL = "/tools/tiktok-gmv-max-report/index.html";

const copy = {
  en: {
    eyebrow: "Free to use",
    title: "The reporting tool I built for my own campaigns",
    lede: "I got tired of rebuilding the same TikTok Product GMV Max report every week, so I built one. It is free, it needs no account, and I am sharing it as-is.",
    toolName: "TikTok Product GMV Max Report",
    toolKicker: "Product-level performance hub",
    toolDesc:
      "Drop in the raw .xlsx exports from TikTok Ads Manager and it builds the report I actually use — campaign overview, per-product GMV Max, per-creator performance and the video view-rate funnel.",
    features: [
      {
        title: "Several accounts in one pass",
        desc: "Drag in multiple .xlsx exports at once — each file is read as its own account, so a whole portfolio lands in one view.",
      },
      {
        title: "Product and creator breakdowns",
        desc: "A PID report ranking every product ID and a KOC report ranking every creator, both by cost, orders and GMV contribution.",
      },
      {
        title: "Full funnel annalytics",
        desc: "Visualize the complete conversion journey with key metrics including 6s View Rate, CTR, Order CVR, and GMV, making it easy to pinpoint the biggest drop-off between each funnel stage.",
      },
      {
        title: "Nothing is uploaded",
        desc: "The file is parsed in your browser. It never reaches a server — mine or anyone else's — so client data stays on your machine.",
      },
    ],
    cta: "Open the tool",
    ctaNote: "Opens in a new tab · no signup · no cost",
    disclaimer:
      "Shared as-is, with no warranty. It is not affiliated with or endorsed by TikTok. Tell me what breaks and I will fix it.",
    mockLabel: "Screenshot of the actual tool",
    mockAlt: "TikTok Product GMV Max Report dashboard showing campaign overview, ad spend, GMV, ROAS and a conversion funnel",
  },
  vi: {
    eyebrow: "Dùng miễn phí",
    title: "Công cụ báo cáo tôi tự làm cho chiến dịch của mình",
    lede: "Mỗi tuần dựng lại cùng một báo cáo TikTok GMV Max quá mất thời gian, nên tôi làm hẳn một công cụ. Miễn phí, không cần tài khoản, và tôi chia sẻ nguyên trạng.",
    toolName: "TikTok GMV Max Report",
    toolKicker: "Hub phân tích hiệu suất theo sản phẩm",
    toolDesc:
      "Thả file .xlsx export thô từ TikTok Ads Manager vào, công cụ dựng đúng bộ báo cáo tôi vẫn dùng — tổng quan chiến dịch, GMV Max theo sản phẩm, hiệu suất theo KOC và phễu view rate của video.",
    features: [
      {
        title: "Nhiều tài khoản trong một lần",
        desc: "Kéo thả nhiều file .xlsx cùng lúc — mỗi file được đọc như một tài khoản riêng, xem cả danh mục trong một màn hình.",
      },
      {
        title: "Bóc tách theo sản phẩm và KOC",
        desc: "Báo cáo PID xếp hạng từng mã sản phẩm và báo cáo KOC xếp hạng từng creator, đều theo chi phí, số đơn và mức đóng góp GMV.",
      },
      {
        title: "Phễu view rate của creative",
        desc: "Tỷ lệ xem 2s, 6s, 25%, 50%, 75% và 100% cho từng video, để thấy người xem rơi ở đâu trước khi kịp chạm tới product card.",
      },
      {
        title: "Không upload đi đâu cả",
        desc: "File được xử lý ngay trong trình duyệt của bạn, không gửi lên server nào — kể cả của tôi. Dữ liệu khách hàng nằm yên trên máy bạn.",
      },
    ],
    cta: "Mở công cụ",
    ctaNote: "Mở tab mới · không cần đăng ký · miễn phí",
    disclaimer:
      "Chia sẻ nguyên trạng, không kèm bảo hành. Công cụ không liên kết hay được TikTok bảo trợ. Gặp lỗi cứ báo tôi sửa.",
    mockLabel: "Ảnh chụp thật của công cụ",
    mockAlt: "Dashboard TikTok Product GMV Max Report hiển thị tổng quan chiến dịch, chi phí, GMV, ROAS và phễu chuyển đổi",
  },
};

const featureIcons = [Waveform, Bolt, Waveform, Vault];

export default function FreeTools({ lang }: FreeToolsProps) {
  const t = copy[lang];

  return (
    <section
      id="tools-free"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[88rem] mx-auto">
        {/* ---- Head ---- */}
        <div className="reveal max-w-3xl mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/25 bg-amber-wash px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-deep">
            <Bolt className="h-3 w-3" />
            {t.eyebrow}
          </span>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] text-ink">
            {t.title}
          </h2>
          <p className="prose-measure mt-6 text-base sm:text-lg leading-relaxed text-ink-2">
            {t.lede}
          </p>
        </div>

        {/* ---- Tool card: editorial split ---- */}
        <div className="reveal bezel">
          <div className="bezel-core overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: the pitch */}
              <div className="lg:col-span-6 xl:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-deep text-white">
                    <Waveform className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {t.toolName}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-ink-4">
                      {t.toolKicker}
                    </p>
                  </div>
                </div>

                <p className="prose-measure mt-7 text-[15px] leading-relaxed text-ink-2">
                  {t.toolDesc}
                </p>

                <ul className="mt-9 space-y-6">
                  {t.features.map((f, i) => {
                    const Icon = featureIcons[i] ?? Check;
                    return (
                      <li key={f.title} className="flex gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-wash text-amber-deep">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {f.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-3">
                            {f.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA pinned to the bottom of the column */}
                <div className="mt-auto pt-10">
                  <a
                    href={TOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-amber-deep py-2 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink active:scale-[0.98]"
                  >
                    {t.cta}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                  <p className="mt-3 text-[11px] text-ink-4">{t.ctaNote}</p>
                </div>
              </div>

              {/* Right: a real screenshot of the tool, not a mock */}
              <div className="lg:col-span-6 xl:col-span-7 relative border-t border-line-soft lg:border-t-0 lg:border-l bg-paper-2 p-6 sm:p-10 lg:p-12">
                <div className="overflow-hidden rounded-2xl border border-line bg-paper lift">
                  <img
                    src={toolPreview}
                    alt={t.mockAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </div>
                <p className="mt-5 text-center text-[10px] uppercase tracking-[0.14em] text-ink-4">
                  {t.mockLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="reveal mt-8 max-w-2xl text-xs leading-relaxed text-ink-4">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
