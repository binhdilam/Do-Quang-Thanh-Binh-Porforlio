import { ArrowUpRight } from "./ui/Icons";

interface FooterProps {
  lang: "en" | "vi";
  handleScrollTo: (id: string) => void;
}

const copy = {
  en: {
    tagline: "Performance marketing, run on evidence.",
    sections: "Sections",
    reach: "Direct",
    backToTop: "Back to top",
    dataTitle: "About your data",
    dataBody:
      "The contact form sends what you type straight to my private Telegram so I can reply. Nothing is stored on this site, there is no tracking pixel, and I don't pass your details to anyone. Analytics is limited to anonymous page counts.",
    built: "Built with React, Vite and Tailwind. Hosted on Vercel.",
  },
  vi: {
    tagline: "Performance marketing, vận hành bằng bằng chứng.",
    sections: "Mục lục",
    reach: "Liên hệ",
    backToTop: "Về đầu trang",
    dataTitle: "Về dữ liệu của bạn",
    dataBody:
      "Form liên hệ gửi thẳng nội dung bạn nhập tới Telegram riêng của tôi để tôi phản hồi. Website không lưu trữ gì, không gắn pixel theo dõi, và tôi không chuyển thông tin của bạn cho bên nào khác. Phần thống kê chỉ đếm lượt xem ẩn danh.",
    built: "Xây bằng React, Vite và Tailwind. Chạy trên Vercel.",
  },
};

const LINKS = [
  { id: "about", label: { en: "About", vi: "Giới thiệu" } },
  { id: "showcase", label: { en: "Results", vi: "Kết quả" } },
  { id: "platforms", label: { en: "Channels", vi: "Kênh" } },
  { id: "scope", label: { en: "Process", vi: "Quy trình" } },
  { id: "tools-free", label: { en: "Free tool", vi: "Công cụ miễn phí" } },
  { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
];

export default function Footer({ lang, handleScrollTo }: FooterProps) {
  const t = copy[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-2 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-base font-bold text-paper">
                H
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-ink">
                  Do Quang Thanh Binh
                </p>
                <p className="text-[11px] text-ink-4">Howard Do</p>
              </div>
            </div>
            <p className="display mt-7 max-w-sm text-2xl leading-tight text-ink">
              {t.tagline}
            </p>
          </div>

          {/* Sections */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-4">
              {t.sections}
            </h2>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => handleScrollTo(l.id)}
                    className="text-sm text-ink-2 transition-colors duration-500 hover:text-brand"
                  >
                    {l.label[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct */}
          <div className="lg:col-span-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-4">
              {t.reach}
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:thanhbinh72.work@gmail.com"
                  className="group inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors duration-500 hover:text-brand"
                >
                  thanhbinh72.work@gmail.com
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+84788351752"
                  className="tnum text-sm text-ink-2 transition-colors duration-500 hover:text-brand"
                >
                  +84 788 351 752
                </a>
              </li>
              <li className="text-sm text-ink-3">
                {lang === "en"
                  ? "Ho Chi Minh City, Vietnam"
                  : "TP. Hồ Chí Minh, Việt Nam"}
              </li>
            </ul>

            {/* Honest data note in place of a boilerplate policy page */}
            <div className="mt-8 rounded-xl border border-line bg-paper p-4">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                {t.dataTitle}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-3">
                {t.dataBody}
              </p>
            </div>
          </div>
        </div>

        {/* Base line */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-4">
            © {year} Do Quang Thanh Binh. {t.built}
          </p>

          <button
            onClick={() => handleScrollTo("about")}
            className="group inline-flex items-center gap-2 self-start text-xs font-medium text-ink-3 transition-colors duration-500 hover:text-brand sm:self-auto"
          >
            {t.backToTop}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:border-brand">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
