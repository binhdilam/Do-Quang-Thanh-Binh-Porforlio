import { useState, useCallback, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Platforms from "./components/Platforms";
import Scope from "./components/Scope";
import Tools from "./components/Tools";
import FreeTools from "./components/FreeTools";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { useReveal, useActiveSection } from "./hooks/useReveal";

const SECTION_IDS = [
  "about",
  "showcase",
  "platforms",
  "scope",
  "tools",
  "tools-free",
  "contact",
];

export default function App() {
  const [lang, setLang] = useState<"en" | "vi">("en");
  const [activeSection, setActiveSection] = useState("about");

  const ids = useMemo(() => SECTION_IDS, []);

  // Scroll reveals + nav highlighting, both IntersectionObserver driven
  useReveal();
  useActiveSection(ids, setActiveSection);

  const handleScrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="grain flex min-h-[100dvh] flex-col bg-paper text-ink antialiased">
      <a
        href="#main"
        className="skip-link rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
      >
        {lang === "en" ? "Skip to content" : "Tới nội dung chính"}
      </a>

      <Header
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        handleScrollTo={handleScrollTo}
      />

      <main id="main" className="flex-grow">
        {/* Who, the headline figures, and the brand strip */}
        <Hero lang={lang} handleScrollTo={handleScrollTo} />

        {/* The proof: real account dashboards */}
        <Showcase lang={lang} />

        {/* Where budget goes and what it is asked to do */}
        <Platforms lang={lang} />

        {/* How the work actually runs */}
        <Scope lang={lang} />

        {/* Tooling */}
        <Tools lang={lang} />

        {/* Free TikTok GMV Max reporting tool */}
        <FreeTools lang={lang} />

        {/* Lead intake */}
        <ContactForm lang={lang} />
      </main>

      <Footer lang={lang} handleScrollTo={handleScrollTo} />
    </div>
  );
}
