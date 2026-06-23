import { useState } from "react";
import { Cpu, Code, MessageCircleCode, Play, Share2, ExternalLink, Activity, Network, ZoomIn, X } from "lucide-react";
import automationImg from "../assets/images/z7311460893031_0b4a561d4b596c27dde94fb13e549a2e.jpg";

interface ToolsProps {
  lang: "en" | "vi";
}

export default function Tools({ lang }: ToolsProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const t = {
    en: {
      title: "Automation Services & Marketing Stack",
      subtitle: "Unified pipelines and technical system integrations deployed to connect platforms, validate quality, and automate operational workflows.",
      toolsHeader: "Automation Tools",
      demoLabel: "Automation Workflow Demo",
      demoText: "This placeholder will later be replaced by a real workflow screenshot.",
      ctaLabel: "Explore My Tool"
    },
    vi: {
      title: "Automation Services & Marketing Stack",
      subtitle: "Tổ hợp ứng dụng công nghệ và hệ thống kỹ thuật nhằm kết nối các kênh, kiểm soát chất lượng dữ liệu và tự động hoá quy trình vận hành.",
      toolsHeader: "Automation Tools",
      demoLabel: "Automation Workflow Demo",
      demoText: "Vùng trống này được dành riêng để đính kèm tệp ảnh chụp mô hình thiết lập luồng tự động hóa tương lai.",
      ctaLabel: "Explore My Tool"
    }
  }[lang];

  const automationTools = [
    { name: "n8n", icon: <Network className="w-5 h-5 text-emerald-500" /> },
    { name: "Make.com", icon: <Share2 className="w-5 h-5 text-indigo-500" /> },
    { name: "Google Apps Script", icon: <Code className="w-5 h-5 text-amber-500" /> },
    { name: "Telegram Bot Alerts", icon: <MessageCircleCode className="w-5 h-5 text-sky-500" /> },
    { name: "Vibe Coding", icon: <Play className="w-5 h-5 text-rose-500" fill="currentColor" fillOpacity="0.1" /> }
  ];

  return (
    <section id="tools" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
            {lang === "en" ? "AUTOMATED WORKFLOW PIPELINES" : "TỰ ĐỘNG HÓA VẬN HÀNH"}
          </span>
          <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4xl mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* TOP: Automation Tools list */}
        <div className="mb-14">
          <h3 className="font-sans font-bold text-slate-900 text-sm uppercase tracking-wider mb-6 text-center">
            {t.toolsHeader}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {automationTools.map((tool, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-600/30 transition-all shadow-sm font-sans"
              >
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0">
                  {tool.icon}
                </div>
                <span className="font-sans font-semibold text-sm text-slate-900 tracking-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Large Placeholder Image Area & CTA Link */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm overflow-hidden relative">
          
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            {/* Automation Workflow Image Container */}
            <div className="w-full">
              <h4 className="font-sans font-bold text-slate-900 text-lg sm:text-xl tracking-tight mb-6 flex items-center justify-center gap-2">
                <Cpu className="w-6 h-6 text-indigo-600" />
                {t.demoLabel}
              </h4>
              <div 
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative w-full cursor-zoom-in bg-slate-50"
                onClick={() => setIsZoomed(true)}
              >
                <img 
                  src={automationImg} 
                  alt="Automation Workflow"
                  className="w-full h-auto max-h-[70vh] object-contain hover:scale-[1.01] transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
                
                {/* Blinking indicator */}
                <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-200 animate-pulse pointer-events-none shadow-sm">
                  <ZoomIn className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-sans font-bold text-slate-900 tracking-wider uppercase">
                    {lang === "en" ? "Click to Zoom" : "Click để Phóng to"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/20 z-50 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={automationImg} 
            alt="Automation Workflow Zoomed"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-slate-700 cursor-default bg-white"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
}
