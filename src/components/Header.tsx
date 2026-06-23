import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

interface HeaderProps {
  lang: "en" | "vi";
  setLang: (l: "en" | "vi") => void;
  activeSection: string;
  handleScrollTo: (id: string) => void;
}

export default function Header({ lang, setLang, activeSection, handleScrollTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerLinks = [
    { id: "about", label: "About" },
    { id: "metrics", label: "Highlights" },
    { id: "cases", label: "Case Studies" },
    { id: "platforms", label: "Strategies" },
    { id: "scope", label: "Workflows" },
    { id: "tools", label: "Tech Stack" },
    { id: "contact", label: "Contact" }
  ];

  const t = {
    en: {
      consultation: "Consultation",
    },
    vi: {
      consultation: "Tư Vấn",
    }
  }[lang];

  const handleMobileNavClick = (id: string) => {
    handleScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between flex-nowrap gap-4">
        
        {/* Logo and Branding Element */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-sans font-bold text-lg shadow-sm flex-shrink-0">
            H
          </div>
          <div className="hidden sm:block min-w-0">
            <span className="font-sans font-bold text-slate-900 text-[15px] block leading-none">
              Howard Portfolio
            </span>
            <span className="font-sans text-[11px] text-slate-500 font-medium mt-1 block">
              Media & Flows
            </span>
          </div>
        </div>

        {/* Desktop Single-Row Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          {headerLinks.map((link) => (
            <button
               key={link.id}
               onClick={() => handleScrollTo(link.id)}
               className={`font-sans text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === link.id 
                  ? "text-indigo-600" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Quick Language Toggle, Consultation Call, and Mobile Burger Menu Icon */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* Language Toggle Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md font-sans text-xs font-semibold transition-all cursor-pointer ${
                lang === "en" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang("vi")}
              className={`px-2.5 py-1 rounded-md font-sans text-xs font-semibold transition-all cursor-pointer ${
                lang === "vi" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              VI
            </button>
          </div>

          {/* Quick Contact Button */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>{t.consultation}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Navigation Drawer/Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-md absolute left-0 right-0 py-4 px-6 flex flex-col gap-2 font-sans">
          {headerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleMobileNavClick(link.id)}
              className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                activeSection === link.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleMobileNavClick("contact")}
            className="w-full text-left py-2.5 px-4 rounded-lg text-sm font-semibold bg-indigo-600 text-white mt-2 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {t.consultation}
          </button>
        </div>
      )}
    </header>
  );
}
