import { translations } from "../translations";

interface FooterProps {
  lang: "en" | "vi";
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-sans font-bold text-lg">
            H
          </div>
          <div>
            <span className="font-sans font-bold text-slate-900 tracking-tight text-sm uppercase block leading-none">
              {lang === "en" ? "DO QUANG THANH BINH" : "ĐỖ QUANG THANH BÌNH"}
            </span>
            <span className="font-sans font-semibold text-[10px] text-indigo-600 tracking-wide block uppercase mt-1">
              {t.hero.subtitle}
            </span>
          </div>
        </div>

        <div className="text-center md:text-right">
          <span className="text-slate-500 font-sans text-xs block mb-1">
            {t.footer.rights}
          </span>
          <span className="text-slate-400 font-sans text-[10px] block">
            {t.footer.bilingualNotice}
          </span>
        </div>

      </div>
    </footer>
  );
}
