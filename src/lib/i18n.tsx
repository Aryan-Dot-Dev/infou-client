import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    // General / Actions
    "action.freeAudit": "Free Audit",
    "action.services": "View Services",
    "action.initializeAudit": "Initialize Audit",
    "action.submit": "Submit Request",
    "action.contact": "Initiate Inquiry",
    "action.readWhitepapers": "Read Whitepapers",

    // Navbar
    "nav.brand": "Infou Consultancy",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.blogs": "Blogs",
    "nav.contact": "Contact Us",

    // Hero Section
    "hero.subtitle": "Sovereign Integration Desk",
    "hero.title": "Government Funding Strategy for Indian",
    "hero.desc": "Precision-engineered compliance and allocation frameworks designed to unlock institutional capital across state and central schemes.",
    "hero.assessmentBtn": "Start for Free",
    "hero.servicesBtn": "View Services Catalog",

    // Metrics Row
    "metrics.activeSchemes": "Active Schemes",
    "metrics.statesMapped": "States Mapped",
    "metrics.capitalSecured": "Capital Secured",
    "metrics.capitalOptimized": "Capital Optimized",
    "metrics.complianceError": "Compliance Error",

    // India Map Section
    "map.hudActive": "Active Territory",
    "map.hudOptimized": "Capital Optimized",
    "map.hudHubs": "Incubation Hubs",
    "map.hudSuccess": "Success Audit",

    // Why Choose ICS
    "choose.badge": "",
    "choose.title": "Why Choose ICS?",
    "choose.desc": "We align deep policy analytics with rigorous audit frameworks to ensure high-growth businesses secure maximum non-dilutive funding.",
    "choose.card1.title": "Diagnostic First-Pass Success",
    "choose.card1.desc": "Our proprietary pre-submission audit frameworks eliminate policy loopholes, ensuring compliance and maximizing approval probability.",
    "choose.card2.title": "Capital Optimized",
    "choose.card2.desc": "Direct policy integration across central and state-level ministries to map, claim, and disburse specialized project incentives.",
    "choose.card3.title": "Accelerated Disbursement",
    "choose.card3.desc": "Bypass bureaucratic delays and process bottlenecks through automated, digitized milestones and active policy monitoring.",

    // How ICS Works
    "process.badge": "Our Process",
    "process.title": "How ICS Works",
    "process.desc": "Our structured engagement model is engineered for rapid execution, absolute clarity, and zero friction.",
    "process.step1.title": "Discovery Call",
    "process.step1.duration": "30 min · free",
    "process.step1.desc": "We learn your business objectives, project expansion goals, and state/central capital needs. No sales pitch — just policy matching clarity.",
    "process.step2.title": "Strategy & Scoping",
    "process.step2.duration": "~3 days",
    "process.step2.desc": "Detailed mapping of your projects against 130+ active government schemes.",
    "process.step3.title": "Diagnostic Audit",
    "process.step3.duration": "~7 days",
    "process.step3.desc": "Deep compliance diagnostics and document structure verification.",
    "process.step4.title": "File & Liaise",
    "process.step4.duration": "2–8 weeks",
    "process.step4.desc": "We draft, structure, and submit applications while managing active department liaising and providing transparent weekly updates.",
    "process.step5.title": "Disbursal & Scale",
    "process.step5.duration": "ongoing",
    "process.step5.desc": "Navigating final audits to secure capital disbursal. We remain on retainer to map future project expansions to active policy cycles.",

    // Testimonials
    "testimonials.badge": "Client Mandates",
    "testimonials.title": "Endorsed by Leading Enterprises",
    "testimonials.desc": "Securing sovereign capital requires technical precision. Here is how we helped leading organizations optimize their funding strategy.",

    // CTA
    "cta.title": "Ready to secure your strategic funding?",
    "cta.placeholder": "ENTER CORPORATE EMAIL",
    "cta.initialize": "Initialize Audit",
    "cta.success": "Audit Request Initialized. Check your corporate inbox shortly.",
    "cta.restricted": "Restricted to registered Indian corporate entities only.",

    // Footer
    "footer.desc": "Sovereign standard alignment for Indian corporate entities seeking optimization in state and central government capital allocation cycles.",
    "footer.column1": "Corporate",
    "footer.column2": "Legal",
    "footer.rights": "All rights reserved.",

    // About Page
    "about.title": "Empowering Indian businesses with funding intelligence.",
    "about.objective": "The Objective",
    "about.objTitle": "Democratizing Access to Institutional Capital",
    "about.objDesc": "We believe that rigorous intelligence and absolute transparency are the foundations of Indian economic growth. Our mission is to bridge the gap between ambitious enterprises and the complex global funding landscape through proprietary analytical models and institutional-grade advisory.",
    "about.principlesBadge": "Institutional Framework",
    "about.principlesTitle": "Our Governing Principles",
    "about.timelineTitle": "The Institutional Evolution",
    "about.timelineDesc": "Tracking fifteen years of regulatory shifts and funding milestones across state & central ministries.",
    "about.boardTitle": "Board of Directors",
    "about.partnershipTitle": "Inquire about institutional partnership.",
    "about.partnershipDesc": "Our evaluation desk is prepared to analyze your capital requirements.",

    // Services Page
    "services.badge": "Advisory Catalog",
    "services.title": "Structured Sovereign Allocations",
    "services.desc": "We structure funding applications with high technical fidelity across three core disciplines to minimize compliance rejection rates.",
    "services.card1.title": "Sovereign Grants & Subsidies",
    "services.card1.subtitle": "Capital Subsidy",
    "services.card1.desc": "Detailed mapping, structure compilation, and submission support for major Central & State Capital subsidies. We align eligibility across IT, manufacturing, and R&D policies.",
    "services.card2.title": "Compliance & Audit Defense",
    "services.card2.subtitle": "Risk Management",
    "services.card2.desc": "Rigorous post-submission defense, query resolution, and milestone documentation auditing. We protect your filings against regulatory shifts and claim rejections.",
    "services.card3.title": "Retainer Strategy advisory",
    "services.card3.subtitle": "Growth advisory",
    "services.card3.desc": "Ongoing policy matching updates, project planning mapping, and multi-year corporate expansion funding consulting to maximize dynamic government incentives.",
    "services.ctaTitle": "Optimize your funding strategy today.",
    "services.ctaDesc": "Identify and claim eligible strategic incentives for your enterprise.",
    "services.ctaBtn": "Initialize Diagnostic Review",

    // Contact Page
    "contact.title": "Contact our strategy desk.",
    "contact.badge": "Communications Desk",
    "contact.desc": "Connect with our advisory partners to evaluate your enterprise eligibility.",
    "contact.formTitle": "Engagement Inquiry",
    "contact.name": "Corporate Name",
    "contact.email": "Corporate Email",
    "contact.phone": "Contact Phone",
    "contact.message": "Brief description of capital requirements",
    "contact.success": "Inquiry successfully recorded. Our strategy desk will reach out in 24 hours.",

    // Blog Page
    "blog.badge": "Intelligence Center",
    "blog.title": "Sovereign Funding Insights",
    "blog.desc": "Technical analysis of active state and central policy frameworks, regulatory mandates, and allocation timelines.",
    "blog.readTime": "MIN READ",
    "blog.readArticle": "Read Briefing"
  },
};

export type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getLanguageFromCookie = (): string => {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return "en";
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    return getLanguageFromCookie();
  });

  useEffect(() => {
    const handleCookieCheck = () => {
      const currentLang = getLanguageFromCookie();
      if (currentLang !== language) {
        setLanguageState(currentLang);
      }
    };
    const interval = setInterval(handleCookieCheck, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      if (lang === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      } else {
        document.cookie = "googtrans=/en/" + lang + "; path=/";
        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + window.location.hostname;
      }
      window.location.reload();
    }
  };

  const t = (key: TranslationKeys): string => {
    return translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
