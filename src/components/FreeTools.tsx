import { useState } from "react";
import { ArrowUpRight, Bolt, Vault, Waveform, Check, Clock } from "./ui/Icons";
import toolPreview from "../assets/showcase/tiktok-tool-preview.jpeg";
import gmvCover from "../assets/gmvmax/cover.webp";

interface FreeToolsProps {
  lang: "en" | "vi";
}

const TOOL_URL = "/tiktokgmvmaxreport.html";

/**
 * GMV Max Tool lives on its own domains. Leave a value empty until that
 * site is deployed: the button then shows a "coming soon" state instead of
 * a dead link.
 *  - GMV_DEMO_URL: the demo app itself (sample data, desktop + mobile)
 *  - GMV_INTRO_URL: the subdomain page that explains the tool in detail
 */
const GMV_DEMO_URL = "/gmvmax-tool/demo";
const GMV_INTRO_URL = "/gmvmax-tool";

type TabId = "report" | "gmv";

const copy = {
  en: {
    eyebrow: "Tools I built",
    title: "Tools I built for my own campaigns",
    lede: "I got tired of repeating the same manual work in TikTok Ads Manager, so I built tools for it. One is free for anyone to use; the other is the automation I run my own GMV Max campaigns with.",
    tabs: {
      report: "Free report tool",
      gmv: "GMV Max Tool",
    },
    report: {
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
          title: "Full funnel analytics",
          desc: "Visualize the complete conversion journey with key metrics including 6s View Rate, CTR, Order CVR, and GMV, making it easy to pinpoint the biggest drop-off between each funnel stage.",
        },
        {
          title: "Nothing is uploaded",
          desc: "The file is parsed in your browser. It never reaches a server — mine or anyone else's — so client data stays on your machine.",
        },
      ],
      cta: "Open the tool",
      ctaNote: "Opens in a new tab · no signup · no cost",
      mockLabel: "Screenshot of the actual tool",
      mockAlt:
        "TikTok Product GMV Max Report dashboard showing campaign overview, ad spend, GMV, ROAS and a conversion funnel",
    },
    gmv: {
      toolName: "GMV Max Tool",
      toolKicker: "TikTok Shop automation · Live demo",
      toolDesc:
        "A web app that runs the repetitive parts of GMV Max for me: rules for video campaigns, LIVE campaigns that switch on and off by themselves, and a log of every change. The demo is a clickable version on sample data — try it on desktop or phone like a normal user.",
      features: [
        {
          title: "Video GMV Max rules",
          desc: "Build a rule in seven steps, preview it on real numbers, and let it exclude, boost or pause videos instead of filtering them one by one.",
        },
        {
          title: "LIVE campaigns on autopilot",
          desc: "A calendar per TikTok account: the campaign is created at start time and switched off at the end, with a monitor that reads TikTok every 5 minutes.",
        },
        {
          title: "Safe before it is automatic",
          desc: "Every new rule starts as a dry run, there are stop buttons at every level, and an account that keeps failing pauses itself.",
        },
        {
          title: "Works on a phone",
          desc: "Bottom tab bar, bottom-sheet forms and install-to-home-screen, so a stream can be checked from anywhere.",
        },
      ],
      cta: "Try the live demo",
      ctaSoon: "Demo link coming soon",
      ctaNote: "Sample data · no login · not connected to TikTok",
      more: "See how it works",
      mockLabel: "Interactive demo on sample data — laptop and phone",
      mockAlt: "GMV Max Tool running on a laptop and a phone, showing the LIVE monitor and schedule",
    },
    disclaimerReport:
      "Shared as-is, with no warranty. It is not affiliated with or endorsed by TikTok. Tell me what breaks and I will fix it.",
    disclaimerGmv:
      "The demo uses fictional shop names and figures and writes nothing to a real account. Not affiliated with or endorsed by TikTok.",
  },
  vi: {
    eyebrow: "Công cụ tự xây",
    title: "Công cụ tôi tự làm cho chiến dịch của mình",
    lede: "Tôi chán việc lặp đi lặp lại cùng một công việc tay trong TikTok Ads Manager, nên tự làm công cụ cho nó. Một cái miễn phí cho ai cũng dùng; cái còn lại là hệ thống tự động hoá tôi đang dùng để chạy GMV Max.",
    tabs: {
      report: "Công cụ báo cáo miễn phí",
      gmv: "GMV Max Tool",
    },
    report: {
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
      mockLabel: "Ảnh chụp thật của công cụ",
      mockAlt:
        "Dashboard TikTok Product GMV Max Report hiển thị tổng quan chiến dịch, chi phí, GMV, ROAS và phễu chuyển đổi",
    },
    gmv: {
      toolName: "GMV Max Tool",
      toolKicker: "Tự động hoá TikTok Shop · Có bản demo",
      toolDesc:
        "Web app làm thay phần việc lặp lại của GMV Max: rule cho video, campaign LIVE tự bật tắt và log mọi thay đổi. Bản demo bấm được, chạy dữ liệu mẫu — dùng thử trên máy tính hay điện thoại như một user bình thường.",
      features: [
        {
          title: "Rule cho Video GMV Max",
          desc: "Tạo rule qua 7 bước, xem trước trên số liệu thật, rồi để rule tự loại, boost hoặc tắt video thay vì lọc từng cái bằng tay.",
        },
        {
          title: "Campaign LIVE tự chạy",
          desc: "Lịch theo từng tài khoản TikTok: đến giờ tự tạo campaign, hết giờ tự tắt, kèm monitor đọc số từ TikTok mỗi 5 phút.",
        },
        {
          title: "An toàn rồi mới tự động",
          desc: "Rule mới luôn bắt đầu bằng dry run, có nút dừng ở mọi tầng, và tài khoản lỗi liên tục sẽ tự tạm dừng.",
        },
        {
          title: "Dùng được trên điện thoại",
          desc: "Thanh tab dưới, form dạng bottom sheet và cài lên màn hình chính, để kiểm tra buổi live từ bất cứ đâu.",
        },
      ],
      cta: "Dùng thử demo",
      ctaSoon: "Link demo sắp có",
      ctaNote: "Dữ liệu mẫu · không cần đăng nhập · không kết nối TikTok",
      more: "Xem chi tiết cách hoạt động",
      mockLabel: "Bản demo bấm được, dữ liệu mẫu — máy tính và điện thoại",
      mockAlt: "GMV Max Tool chạy trên laptop và điện thoại, hiển thị Monitor LIVE và lịch LIVE",
    },
    disclaimerReport:
      "Chia sẻ nguyên trạng, không kèm bảo hành. Công cụ không liên kết hay được TikTok bảo trợ. Gặp lỗi cứ báo tôi sửa.",
    disclaimerGmv:
      "Bản demo dùng tên shop và số liệu giả, không ghi gì vào tài khoản thật. Không liên kết hay được TikTok bảo trợ.",
  },
};

const reportIcons = [Waveform, Bolt, Waveform, Vault];
const gmvIcons = [Waveform, Clock, Vault, Bolt];

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";

export default function FreeTools({ lang }: FreeToolsProps) {
  const t = copy[lang];
  const [tab, setTab] = useState<TabId>("gmv");
  const isGmv = tab === "gmv";
  const tool = isGmv ? t.gmv : t.report;
  const icons = isGmv ? gmvIcons : reportIcons;
  const accent = isGmv
    ? { solid: "bg-brand", wash: "bg-brand-wash text-brand", hover: "hover:bg-ink" }
    : { solid: "bg-amber-deep", wash: "bg-amber-wash text-amber-deep", hover: "hover:bg-ink" };

  const primary = (() => {
    if (!isGmv) {
      return (
        <a
          href={TOOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-3 rounded-full ${accent.solid} py-2 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-500 ${ease} ${accent.hover} active:scale-[0.98]`}
        >
          {t.report.cta}
          <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ${ease} group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-px`}>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      );
    }
    if (!GMV_DEMO_URL) {
      return (
        <span
          role="note"
          className="inline-flex items-center gap-3 rounded-full border border-line bg-paper-2 px-6 py-3 text-sm font-semibold text-ink-3"
        >
          <Clock className="h-4 w-4" />
          {t.gmv.ctaSoon}
        </span>
      );
    }
    return (
      <a
        href={GMV_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 rounded-full ${accent.solid} py-2 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-500 ${ease} ${accent.hover} active:scale-[0.98]`}
      >
        {t.gmv.cta}
        <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ${ease} group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-px`}>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    );
  })();

  return (
    <section
      id="tools-free"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[88rem] mx-auto">
        {/* ---- Head ---- */}
        <div className="reveal max-w-3xl mb-10 sm:mb-14">
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

        {/* ---- Small tab switch ---- */}
        <div
          role="tablist"
          aria-label={t.title}
          className="reveal mb-6 flex flex-wrap gap-2"
        >
          {(["gmv", "report"] as const).map((id) => {
            const on = tab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-500 ${ease} active:scale-[0.98] ${
                  on
                    ? id === "gmv"
                      ? "bg-brand text-white"
                      : "bg-amber-deep text-white"
                    : "border border-line bg-paper text-ink-2 hover:border-brand-soft hover:text-brand"
                }`}
              >
                {t.tabs[id]}
              </button>
            );
          })}
        </div>

        {/* ---- Tool card: editorial split ---- */}
        <div className={`bezel ${isGmv ? "bezel--brand" : ""}`}>
          <div className="bezel-core overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: the pitch */}
              <div className="lg:col-span-6 xl:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent.solid} text-white`}>
                    {isGmv ? <Bolt className="h-5 w-5" /> : <Waveform className="h-5 w-5" />}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {tool.toolName}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-ink-4">
                      {tool.toolKicker}
                    </p>
                  </div>
                </div>

                <p className="prose-measure mt-7 text-[15px] leading-relaxed text-ink-2">
                  {tool.toolDesc}
                </p>

                <ul className="mt-9 space-y-6">
                  {tool.features.map((f, i) => {
                    const Icon = icons[i] ?? Check;
                    return (
                      <li key={f.title} className="flex gap-4">
                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${accent.wash}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink">{f.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-3">{f.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA pinned to the bottom of the column */}
                <div className="mt-auto pt-10">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {primary}
                    {isGmv && GMV_INTRO_URL && (
                      <a
                        href={GMV_INTRO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand underline-offset-4 hover:underline"
                      >
                        {t.gmv.more} →
                      </a>
                    )}
                  </div>
                  <p className="mt-3 text-[11px] text-ink-4">{tool.ctaNote}</p>
                </div>
              </div>

              {/* Right: a real screenshot, not a mock */}
              <div className="lg:col-span-6 xl:col-span-7 relative border-t border-line-soft lg:border-t-0 lg:border-l bg-paper-2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="overflow-hidden rounded-2xl border border-line bg-paper lift">
                  <img
                    key={tab}
                    src={isGmv ? gmvCover : toolPreview}
                    alt={tool.mockAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                </div>
                <p className="mt-5 text-center text-[10px] uppercase tracking-[0.14em] text-ink-4">
                  {tool.mockLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="reveal mt-8 max-w-2xl text-xs leading-relaxed text-ink-4">
          {isGmv ? t.disclaimerGmv : t.disclaimerReport}
        </p>
      </div>
    </section>
  );
}
