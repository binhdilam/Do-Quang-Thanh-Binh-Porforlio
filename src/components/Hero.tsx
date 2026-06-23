import { Award, Mail, Phone, Clock, ChevronRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { translations } from "../translations";

interface HeroProps {
  lang: "en" | "vi";
  handleScrollTo: (id: string) => void;
}

export default function Hero({ lang, handleScrollTo }: HeroProps) {
  const t = translations[lang];

  return (
    <section id="about" className="relative pt-10 pb-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Column: Bio Details & Strengths */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Highlight Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 self-start"
          >
            <Award className="w-4 h-4 text-indigo-600" />
            <span>{lang === "en" ? "Available for Active Scaling" : "Sẵn sàng nhận chiến dịch"}</span>
          </motion.div>

          {/* Title block */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans font-extrabold text-slate-900 tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4"
          >
            {t.hero.fullName}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-sans font-bold text-xl sm:text-2xl text-indigo-600 mb-8 uppercase tracking-wide"
          >
            {t.hero.subtitle}
          </motion.h2>

          {/* Core Direct Response Headline */}
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-sans font-bold text-slate-900 text-lg sm:text-xl leading-relaxed mb-6 border-l-4 border-indigo-600 pl-5"
          >
            "{t.hero.headline}"
          </motion.h3>

          {/* Bio statement */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-sans"
          >
            {t.hero.bio}
          </motion.p>

          {/* Advantage lists */}
          <div className="space-y-4">
            {t.hero.bullets.map((bullet, idx) => {
              const parts = bullet.split(":");
              const head = parts[0];
              const body = parts.slice(1).join(":");
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + idx * 0.08 }}
                  key={idx} 
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-slate-700 text-base font-sans leading-relaxed">
                    <strong className="text-slate-900 font-bold">{head}:</strong>{body}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Clean White Profile & Contact Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
              <div className="relative flex-shrink-0">
                <img 
                  src="/src/assets/images/howard_profile_1781341630092.jpeg" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border border-slate-200 shadow-sm relative z-10"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white z-20" />
              </div>
              <div className="text-center sm:text-left mt-2 sm:mt-0">
                <h4 className="font-sans font-bold text-xl text-slate-900 mb-1">Howard Do</h4>
                <p className="text-slate-500 text-sm font-medium mb-2">Performance Marketing Manager</p>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t.hero.card.quickCheck}
                </div>
              </div>
            </div>

            <div className="space-y-5 mb-8 border-t border-slate-100 pt-6">
              {/* Zalo / Call Hotlines */}
              <a 
                href="tel:+84788351752"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">
                    {lang === "en" ? "Direct Line" : "Điện thoại trực tiếp"}
                  </span>
                  <span className="font-sans font-bold text-slate-900 text-base">
                    +84 788 351 752
                  </span>
                </div>
              </a>

              {/* Email Channel */}
              <a 
                href="mailto:thanhbinh72.work@gmail.com"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">
                    {lang === "en" ? "Email address" : "Địa chỉ Email"}
                  </span>
                  <span className="font-sans font-bold text-slate-900 text-[15px] sm:text-base break-all">
                    thanhbinh72.work@gmail.com
                  </span>
                </div>
              </a>

              {/* Response indicator */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="font-sans text-sm text-slate-700 font-medium">
                  {t.hero.card.responseTime}
                </span>
              </div>
            </div>

            {/* Strategy CTA request */}
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-3.5 px-6 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{lang === "en" ? "Request Consultation" : "Yêu cầu Tư vấn"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <p className="text-center text-slate-500 text-xs mt-4">
               {lang === "en" ? "Based in Vietnam • Available globally" : "Làm việc tại Việt Nam • Hỗ trợ toàn cầu"}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
