import { translations } from "../translations";

interface ScopeProps {
  lang: "en" | "vi";
}

export default function Scope({ lang }: ScopeProps) {
  const t = translations[lang];

  return (
    <section id="scope" className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
            {lang === "en" ? "TACTICAL SYSTEMS DESIGN" : "QUY TRÌNH QUẢN TRỊ CHIẾN DỊCH"}
          </span>
          <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4xl mb-4">
            {t.scope.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            {t.scope.subtitle}
          </p>
        </div>

        <div>
          <h3 className="font-sans font-bold text-slate-900 text-lg sm:text-2xl text-center mb-10 uppercase tracking-tight">
            {t.scope.subHeadline}
          </h3>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.scope.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="relative z-10 w-full">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-sans font-bold text-sm mb-5 shadow-sm">
                    0{idx + 1}
                  </div>
                  
                  <h4 className="font-sans font-bold text-slate-900 text-base mb-3 uppercase tracking-wide">
                    {step.title}
                  </h4>
                  
                  <p className="text-slate-600 text-sm leading-relaxed font-sans w-full whitespace-pre-line">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
