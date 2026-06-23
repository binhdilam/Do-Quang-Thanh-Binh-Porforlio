import { useState } from "react";
import { FileText, Target, ShieldCheck, Layers, Award, ClipboardList, Monitor, Eye, X, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CaseStudiesProps {
  lang: "en" | "vi";
}

export default function CaseStudies({ lang }: CaseStudiesProps) {
  const [activeCase, setActiveCase] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeAppInstallTab, setActiveAppInstallTab] = useState<"google" | "meta">("google");

  const t = {
    en: {
      title: "Strategic Case Studies & Results",
      subtitle: "This section acts as a project showcase template outlining core media buying capabilities.",
      labels: {
        role: "Role",
        scope: "Scope",
        projectInfo: "Project Details",
        screenshotLabel: "Campaign Performance Screenshot",
        screenshotSub: "This image area can be replaced later."
      }
    },
    vi: {
      title: "Chiến dịch thực tế tiêu biểu",
      subtitle: "Phần này đóng vai trò là khung mẫu giới thiệu các dự án thể hiện năng lực vận hành thực tế.",
      labels: {
        role: "Vai trò",
        scope: "Phạm vi",
        projectInfo: "Chi tiết dự án",
        screenshotLabel: "Campaign Performance Screenshot",
        screenshotSub: "Vùng trống này sẽ được cập nhật hình ảnh sau."
      }
    }
  }[lang];

  const caseStudiesData = {
    en: [
      {
        tabLabel: "TikTok Shop",
        role: "TikTok Ads Specialist",
        responsibilities: "Run campaigns, continuous audience profiling & multi-layered targeting strategy",
        scope: "Run ads, Data analytics, Optimized, Report",
        platforms: "TikTok Shop",
        objective: "Drive viral scaling, maximize direct checkouts & target premium ROAS index of 9.54"
      },
      {
        tabLabel: "App Install",
        role: "Digital Marketing Specialist",
        responsibilities: "Handle multi-network user acquisition, direct API conversions & cohort telemetry trackers",
        scope: "Ads planning, Execution, Data analytics, Optimized, Report",
        platforms: "Google Ads, Meta, TikTok, Apple Search Ads",
        objective: "Optimize install bidding, scale daily acquisition metrics & maximize user active volumes"
      },
      {
        tabLabel: "Lead Generation",
        role: "Digital Marketing Specialist",
        responsibilities: "Form integration, qualification logic & CRM syncing",
        scope: "Ads planning, Execution, Data analytics, Optimized, Report",
        platforms: "Meta ads",
        objective: "Enhance qualified lead flow volume & appointment booking rates"
      }
    ],
    vi: [
      {
        tabLabel: "TikTok Shop",
        role: "TikTok Ads Specialist",
        responsibilities: "Vận hành chiến dịch, liên tục phân tích và xây dựng chiến lược nhắm mục tiêu đa tầng",
        scope: "Run ads, Data analytics, Optimized, Report",
        platforms: "TikTok Shop",
        objective: "Thúc đẩy doanh số mở rộng, tối đa hóa chốt đơn trực tiếp & đạt chỉ số ROAS 9.54"
      },
      {
        tabLabel: "App Install",
        role: "Digital Marketing Specialist",
        responsibilities: "Quản lý thu hút người dùng đa nền tảng, tối ưu chuyển đổi API & theo dõi bằng đo lường cohort",
        scope: "Ads planning, Execution, Data analytics, Optimized, Report",
        platforms: "Google Ads, Meta, TikTok, Apple Search Ads",
        objective: "Tối ưu hóa giá thầu cải đặt, mở rộng quy mô thu hút hàng ngày & tối đa hóa lượng active user định kỳ"
      },
      {
        tabLabel: "Lead Generation",
        role: "Digital Marketing Specialist",
        responsibilities: "Đồng bộ biểu mẫu, thiết lập logic đánh giá chất lượng & đồng bộ hóa CRM",
        scope: "Ads planning, Execution, Data analytics, Optimized, Report",
        platforms: "Meta ads",
        objective: "Nâng cao lưu lượng lead đủ điều kiện & tỷ lệ chốt lịch hẹn tư vấn"
      }
    ]
  }[lang];

  // Renders beautiful, hyper-realistic vector charts representing realistic dashboard media reports
  const renderMockupDashboard = (idx: number, isDetailed: boolean) => {
    if (idx === 0) {
      return (
        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden rounded-xl border border-slate-200/60 shadow-2xs">
          <img
            src="src/assets/images/Video - Manual ads (1).png"
            alt="TikTok Shop Ads Report Screenshot"
            className="w-full h-full object-cover md:object-contain rounded-xl hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    } else if (idx === 1) {
      return (
        <div className="w-full h-full relative overflow-hidden bg-white rounded-xl border border-slate-200/60 flex items-center justify-center">
          {/* Floating tabs menu */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 z-20 flex bg-white/90 backdrop-blur-sm rounded border border-slate-200 shadow-sm"
          >
            <button
              onClick={() => setActiveAppInstallTab("google")}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeAppInstallTab === "google" 
                  ? "bg-slate-900 text-white rounded" 
                  : "bg-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Google Ads
            </button>
            <button
              onClick={() => setActiveAppInstallTab("meta")}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeAppInstallTab === "meta" 
                  ? "bg-slate-900 text-white rounded" 
                  : "bg-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Meta Ads
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeAppInstallTab === "google" ? (
              <motion.img
                key="google"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                src="/src/assets/images/google_ads_screenshot_1782122830120_1782124076785.png"
                alt="Google Ads Case Study Mockup"
                className="w-full h-full object-cover md:object-contain rounded-xl hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <motion.img
                key="meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                src="/src/assets/images/meta_ads_screenshot_1782122830121_1782124095683.png"
                alt="Meta Ads Case Study Mockup"
                className="w-full h-full object-cover md:object-contain rounded-xl hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      // Lead Generation
      return (
        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden rounded-xl border border-slate-200/60 shadow-2xs">
          <img
            src="src/assets/images/Lead Generation.png"
            alt="Lead Generation Setup"
            className="w-full h-full object-cover md:object-contain rounded-xl hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }
  };

  return (
    <section id="cases" className="py-20 sm:py-26 bg-slate-50 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
            {lang === "en" ? "PROJECT SHOWCASE TEMPLATE" : "KHUNG TRÌNH DIỄN DỰ ÁN THỰC TẾ"}
          </span>
          <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Navigation (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {caseStudiesData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeCase === idx 
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-sm" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-indigo-600/30"
                }`}
              >
                <span className="font-sans font-bold text-sm sm:text-base block uppercase tracking-wide">
                  {item.tabLabel}
                </span>
                <span className={`font-sans text-xs block mt-2 leading-relaxed ${
                  activeCase === idx ? "text-indigo-100" : "text-slate-500"
                }`}>
                  {idx === 0 
                    ? (lang === "en" ? "E-com conversion & scale setups" : "Cấu trúc tối ưu và nâng quy mô chiến dịch e-com")
                    : idx === 1
                    ? (lang === "en" ? "Active user growth & CPI optimization" : "Tốc độ tải ứng dụng & tối ưu CPI lượt cài đặt")
                    : (lang === "en" ? "Lead qualification & routing systems" : "Thu nạp dữ liệu lead & thiết lập phễu đồng bộ")}
                </span>
              </button>
            ))}
          </div>

          {/* Active Case Template Showcase (Right) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.22 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm"
              >
                
                {/* 1 Small line on top with Scope + Role metadata */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-100 pb-4 mb-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                    <span className="font-sans text-xs text-emerald-600 font-bold uppercase tracking-wider">
                      {lang === "en" ? "Scope:" : "Phạm vi:"}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {caseStudiesData[activeCase].scope}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="font-sans text-xs text-indigo-600 font-bold uppercase tracking-wider">
                      {lang === "en" ? "Role:" : "Vai trò:"}
                    </span>
                    <span className="text-slate-900 font-bold uppercase tracking-tight font-sans">
                      {caseStudiesData[activeCase].role}
                    </span>
                  </div>
                  
                  {/* Platforms badge */}
                  <span className="font-sans text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                    {caseStudiesData[activeCase].platforms}
                  </span>
                </div>

                {/* 16:9 Aspect Ratio Interactive Mockup Image */}
                <div 
                  onClick={() => setIsZoomed(true)}
                  className="aspect-video w-full rounded-xl overflow-hidden cursor-pointer relative group border border-slate-200 shadow-sm"
                >
                  {/* Render the realistic performance report mockup schema */}
                  {renderMockupDashboard(activeCase, false)}

                  {/* High quality Animated hover pointer button/badge trigger */}
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="relative flex items-center justify-center">
                        <div className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-md group-hover:scale-105 transition-transform">
                          <Eye className="w-5 h-5 text-indigo-600 animate-bounce" />
                        </div>
                      </div>
                      <span className="bg-white text-slate-900 font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
                        {lang === "en" ? "Click to Zoom Results" : "Click để phóng to"}
                      </span>
                    </div>
                  </div>

                  {/* Pulsating corner indicator for touch devices */}
                  <div className="absolute bottom-3 right-3 bg-white text-slate-900 font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md shadow-sm border border-slate-200 block sm:hidden">
                    {lang === "en" ? "TAP TO ZOOM" : "BẤM ĐỂ PHÓNG TO"}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Lightbox Zoom Portal Modal with Spring entrance */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-100 bg-slate-950/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-110 p-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer shadow-xl hover:scale-105"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl p-1 relative flex flex-col justify-between cursor-default"
            >
              
              {/* Detailed View Dashboard report */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden">
                {renderMockupDashboard(activeCase, true)}
              </div>

              {/* Extra helper line to guide exiting zoom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 font-mono text-center py-1.5 px-4 rounded-full uppercase tracking-wider select-none pointer-events-none hidden sm:block">
                {lang === "en" ? "Click anywhere outside to Exit Zoom" : "Click ra vùng ngoài để Đóng phóng to"}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
