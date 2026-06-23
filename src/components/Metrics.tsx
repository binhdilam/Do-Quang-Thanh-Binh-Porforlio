import { translations } from "../translations";
import { TrendingUp, Award, Leaf, ShoppingBag, ShieldCheck, Truck, Briefcase, Zap, Compass, Smile, Eye } from "lucide-react";

interface MetricsProps {
  lang: "en" | "vi";
}

export default function Metrics({ lang }: MetricsProps) {
  const t = translations[lang];

  // Specific 12 real brands only
  const brandPartners = [
    {
      name: "Unilever Beauty",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 0-4 4c0 4 6 8 6 12a1 1 0 0 1-2 0c0-1.5-1-2.5-2.5-2.5S7 16.5 7 18a5 5 0 0 0 10 0c0-4.5-5-8.5-5-12a4 4 0 0 0-4-4z" />
        </svg>
      )
    },
    {
      name: "Closeup",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21a9 9 0 0 0 9-9" />
          <path d="M3 12a9 9 0 0 0 9 9" />
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M16 13c-1.5 1.5-4 2.5-6 1.5" />
        </svg>
      )
    },
    {
      name: "Biore",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
        </svg>
      )
    },
    {
      name: "P/S",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2c3 0 5 2 5 6 0 3.5-2 6.5-2 10 0 2.2-1.8 4-4 4a3.8 3.8 0 0 1-2-1c-.6.6-1.3 1-2 1-2.2 0-4-1.8-4-4 0-3.5-2-6.5-2-10 0-4 2-6 5-6Z" strokeLinejoin="round" />
          <path d="M8.5 8.5c1 .5 2 1 3.5 1s2.5-.5 3.5-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Old Spice",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22s4-3 10-3 10 3 10 3" strokeLinecap="round" />
          <path d="M12 3v16" />
          <path d="M12 5l7 5-7 3" fill="currentColor" fillOpacity="0.15" />
        </svg>
      )
    },
    {
      name: "Amortals",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m12 3-10 9h3v8h14v-8h3L12 3z" />
          <path d="m12 11-3 3h6l-3-3z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: "Rocksweek",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-8-4-8 4z" />
          <path d="M12 6v6" />
          <path d="M9 9h6" />
        </svg>
      )
    },
    {
      name: "Bạn Uống Tôi Lái",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M12 2v9" />
          <path d="m8 5 4-3 4 3" />
        </svg>
      )
    },
    {
      name: "Bship",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M12 22V12" />
          <path d="m12 12 8.73-5.04" />
          <path d="m12 12-8.73-5.04" />
        </svg>
      )
    },
    {
      name: "Jobbags",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      name: "Nhà Nhân Food",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    {
      name: "Nấm Liên Hoa",
      hoverColor: "hover:text-indigo-600 hover:border-indigo-600/30",
      logo: (
        <svg className="w-5 h-5 flex-shrink-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a8 8 0 0 0-8 8c0 3 4 5 4 8v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3s4-2 4-8a8 8 0 0 0-8-8z" />
          <path d="M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" fillOpacity="0.2" />
        </svg>
      )
    }
  ];

  // Repeat brands to ensure smooth infinite marquee wrapping
  const marqueeItems = [...brandPartners, ...brandPartners, ...brandPartners];

  return (
    <div id="metrics">
      {/* Highlights / Metrics Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
              {lang === "en" ? "VERIFIED ACQUISITION DATA" : "DỮ LIỆU ĐO LƯỜNG THỰC TẾ"}
            </span>
            <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4xl mb-4">
              {t.metrics.title}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t.metrics.subtitle}
            </p>
          </div>

          {/* Grid of 5 Key Metrics with custom SVG sparklines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 font-sans">
            
            {/* Metric 1 - Spend */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-indigo-600/30 transition-colors">
              <div>
                <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  {lang === "en" ? "Monthly Budget" : "Ngân sách chi"}
                </span>
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 block mb-1">
                  {t.metrics.spend.val}
                </span>
                <span className="font-sans font-semibold text-sm text-slate-700 block">
                  {t.metrics.spend.label}
                </span>
              </div>
              
              <div className="my-4 h-12 w-full flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-500 overflow-visible">
                  <path d="M0 25 L20 23 L40 18 L60 14 L80 8 L100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 25 L20 23 L40 18 L60 14 L80 8 L100 2 L100 30 L0 30 Z" fill="currentColor" fillOpacity="0.06" />
                  <circle cx="100" cy="2" r="3" fill="currentColor" />
                </svg>
              </div>

              <p className="font-sans text-xs text-slate-500 leading-normal">
                {t.metrics.spend.desc}
              </p>
            </div>

            {/* Metric 2 - NMV */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-indigo-600/30 transition-colors">
              <div>
                <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  {lang === "en" ? "Store Sales" : "Doanh số ròng"}
                </span>
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 block mb-1">
                  {t.metrics.nmv.val}
                </span>
                <span className="font-sans font-semibold text-sm text-slate-700 block">
                  {t.metrics.nmv.label}
                </span>
              </div>

              <div className="my-4 h-12 w-full flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-500 overflow-visible">
                  <path d="M0 28 Q 20 28, 40 22 T 80 8 T 100 1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0 28 Q 20 28, 40 22 T 80 8 T 100 1 L100 30 L0 30 Z" fill="currentColor" fillOpacity="0.06" />
                  <circle cx="100" cy="1" r="3" fill="currentColor" />
                </svg>
              </div>

              <p className="font-sans text-xs text-slate-500 leading-normal">
                {t.metrics.nmv.desc}
              </p>
            </div>

            {/* Metric 3 - ROAS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-indigo-600/30 transition-colors">
              <div>
                <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  {lang === "en" ? "Maximum ROAS" : "Chỉ số ROAS"}
                </span>
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 block mb-1">
                  {t.metrics.roas.val}
                </span>
                <span className="font-sans font-semibold text-sm text-slate-700 block">
                  {t.metrics.roas.label}
                </span>
              </div>

              <div className="my-4 h-12 w-full flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-500 overflow-visible">
                  <path d="M0 26 C 20 26, 30 2, 50 2 C 70 2, 80 18, 100 1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0 26 C 20 26, 30 2, 50 2 C 70 2, 80 18, 100 1 L100 30 L0 30 Z" fill="currentColor" fillOpacity="0.06" />
                  <circle cx="100" cy="1" r="3" fill="currentColor" />
                </svg>
              </div>

              <p className="font-sans text-xs text-slate-500 leading-normal">
                {t.metrics.roas.desc}
              </p>
            </div>

            {/* Metric 4 - Brands */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-indigo-600/30 transition-colors">
              <div>
                <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  {lang === "en" ? "Scale Matrix" : "Số lượng nhãn"}
                </span>
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 block mb-1">
                  {t.metrics.brands.val}
                </span>
                <span className="font-sans font-semibold text-sm text-slate-700 block">
                  {t.metrics.brands.label}
                </span>
              </div>

              <div className="my-4 h-12 w-full flex items-end justify-center">
                <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-500 overflow-visible">
                  <line x1="10" y1="20" x2="20" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="1 1" />
                  <line x1="30" y1="20" x2="40" y2="8" stroke="currentColor" strokeWidth="2" strokeDasharray="1 1" />
                  <line x1="50" y1="20" x2="60" y2="4" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="70" y1="20" x2="80" y2="14" stroke="currentColor" strokeWidth="2" strokeDasharray="1 1" />
                  <line x1="90" y1="20" x2="100" y2="2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="60" cy="4" r="2.5" fill="currentColor" />
                  <circle cx="100" cy="2" r="2.5" fill="currentColor" />
                </svg>
              </div>

              <p className="font-sans text-xs text-slate-500 leading-normal">
                {t.metrics.brands.desc}
              </p>
            </div>

            {/* Metric 5 - Low CPL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-indigo-600/30 transition-colors">
              <div>
                <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">
                  {lang === "en" ? "Lead Costs" : "Chi phí rác"}
                </span>
                <span className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 block mb-1">
                  {t.metrics.cpl.val}
                </span>
                <span className="font-sans font-semibold text-sm text-slate-700 block">
                  {t.metrics.cpl.label}
                </span>
              </div>

              <div className="my-4 h-12 w-full flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-500 overflow-visible">
                  <path d="M0 2 C 30 2, 60 22, 100 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0 2 C 30 2, 60 22, 100 24 L100 30 L0 30 Z" fill="currentColor" fillOpacity="0.05" />
                  <circle cx="100" cy="24" r="3" fill="currentColor" />
                </svg>
              </div>

              <p className="font-sans text-xs text-slate-500 leading-normal">
                {t.metrics.cpl.desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Trusted By Industry Leaders Logo Carousel */}
      <section className="py-12 bg-white border-b border-slate-200 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
          <span className="font-sans text-xs font-semibold text-slate-500 tracking-wide block uppercase mb-2">
            {t.brands.title}
          </span>
          <p className="font-sans text-sm text-slate-600 font-medium max-w-2xl mx-auto">
            {t.brands.subtitle}
          </p>
        </div>

        {/* Unified Horizontal Slider Line: Running at infinite speed, Grayscale by default, Color on Hover */}
        <div className="relative flex items-center overflow-x-hidden py-2" id="brands-marquee-viewport">
          <div className="animate-marquee gap-6 whitespace-nowrap">
            {marqueeItems.map((brand, idx) => (
               <span 
                 key={idx} 
                 className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-sans font-semibold text-sm tracking-wide transition-all duration-300 transform subpixel-antialiased hover:shadow-sm ${brand.hoverColor} cursor-default select-none`}
               >
                 {brand.logo}
                 <span className="uppercase">{brand.name}</span>
               </span>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
