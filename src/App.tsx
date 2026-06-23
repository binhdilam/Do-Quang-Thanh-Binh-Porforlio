import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Platforms from "./components/Platforms";
import Scope from "./components/Scope";
import Tools from "./components/Tools";
import CaseStudies from "./components/CaseStudies";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState<"en" | "vi">("en");
  const [activeSection, setActiveSection] = useState("about");

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Tracking scroll position for sticky nav highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "metrics", "cases", "platforms", "scope", "tools", "contact"];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased">
      
      {/* Sticky Premium Header / Navigation */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        activeSection={activeSection} 
        handleScrollTo={handleScrollTo} 
      />

      {/* Main Sections Body */}
      <main className="flex-grow">
        
        {/* About / Hero Profile Presentation */}
        <Hero 
          lang={lang} 
          handleScrollTo={handleScrollTo} 
        />

        {/* Real-world Data Metrics & Brand Carousel highlights */}
        <Metrics 
          lang={lang} 
        />

        {/* Case Studies Deep Dive Audits */}
        <CaseStudies 
          lang={lang} 
        />

        {/* Media Allocation Strategies */}
        <Platforms 
          lang={lang} 
        />

        {/* Steps Timeline block */}
        <Scope 
          lang={lang} 
        />

        {/* Tools & Integrated Stack */}
        <Tools 
          lang={lang} 
        />

        {/* Secure Lead Intake Contact Form */}
        <ContactForm 
          lang={lang} 
        />

      </main>

      {/* Professional Footer */}
      <Footer 
        lang={lang} 
      />

    </div>
  );
}
