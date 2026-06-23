import { Share2, Smartphone, Search, MessageSquare, Layers, TrendingUp, Target, Award, Megaphone } from "lucide-react";

interface PlatformsProps {
  lang: "en" | "vi";
}

export default function Platforms({ lang }: PlatformsProps) {
  const t = {
    en: {
      title: "Platforms & Campaign Experience",
      leftHeader: "Advertising Platforms",
      rightHeader: "Campaign Experience",
      platforms: [
        { name: "Meta Ads", icon: <Share2 className="w-5 h-5 text-blue-600" /> },
        { name: "TikTok Ads", icon: <Smartphone className="w-5 h-5 text-slate-900" /> },
        { name: "Google Ads", icon: <Search className="w-5 h-5 text-red-500" /> },
        { name: "Zalo Ads", icon: <MessageSquare className="w-5 h-5 text-sky-500" /> },
        { name: "Apple Search Ads", icon: <Layers className="w-5 h-5 text-indigo-500" /> }
      ],
      campaigns: [
        { name: "Product Sales", icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
        { name: "User Acquisition", icon: <Target className="w-5 h-5 text-indigo-600" /> },
        { name: "Lead Generation", icon: <Award className="w-5 h-5 text-amber-500" /> },
        { name: "Awareness", icon: <Megaphone className="w-5 h-5 text-purple-500" /> }
      ]
    },
    vi: {
      title: "Nền tảng & Chiến dịch",
      leftHeader: "Nền tảng quảng cáo (Platforms)",
      rightHeader: "Dạng chiến dịch (Campaigns)",
      platforms: [
        { name: "Meta Ads", icon: <Share2 className="w-5 h-5 text-blue-600" /> },
        { name: "TikTok Ads", icon: <Smartphone className="w-5 h-5 text-slate-900" /> },
        { name: "Google Ads", icon: <Search className="w-5 h-5 text-red-500" /> },
        { name: "Zalo Ads", icon: <MessageSquare className="w-5 h-5 text-sky-500" /> },
        { name: "Apple Search Ads", icon: <Layers className="w-5 h-5 text-indigo-500" /> }
      ],
      campaigns: [
        { name: "Product Sales (Cải thiện Doanh số)", icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
        { name: "User Acquisition (Tải App & User mới)", icon: <Target className="w-5 h-5 text-indigo-600" /> },
        { name: "Lead Generation (Thu thập Lead tư vấn)", icon: <Award className="w-5 h-5 text-amber-500" /> },
        { name: "Awareness (Nhận diện Thương hiệu)", icon: <Megaphone className="w-5 h-5 text-purple-500" /> }
      ]
    }
  }[lang];

  return (
    <section id="platforms" className="py-20 sm:py-26 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
          {lang === "en" ? "CHANNELS & CAMPAIGNS" : "PHÂN KÊNH & HÌNH THỨC VẬN HÀNH"}
        </span>
        <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4xl mb-4">
          {t.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Advertising Platforms */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-sans font-bold text-[#0f172a] text-lg border-l-4 border-indigo-600 pl-4 mb-8 uppercase tracking-wide">
              {t.leftHeader}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.platforms.map((platform, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-600/30 transition-all font-sans"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    {platform.icon}
                  </div>
                  <span className="font-sans font-semibold text-sm text-slate-900 tracking-tight">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Campaign Types */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-sans font-bold text-[#0f172a] text-lg border-l-4 border-emerald-500 pl-4 mb-8 uppercase tracking-wide">
              {t.rightHeader}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.campaigns.map((camp, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/30 transition-all font-sans"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    {camp.icon}
                  </div>
                  <span className="font-sans font-semibold text-sm text-slate-900 tracking-tight">
                    {camp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
