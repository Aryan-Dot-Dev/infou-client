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
    "nav.brand": "Infou Consultancy Services",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.blogs": "Blogs",
    "nav.contact": "Contact Us",

    // Hero Section
    "hero.subtitle": "Sovereign Integration Desk",
    "hero.title": "Government Funding Strategy for Indian",
    "hero.desc": "1200+ funding opportunities exist across India. Our AI tool finds your best matches in 30 seconds and our experts handle everything after.",
    "hero.assessmentBtn": "Start for Free",
    "hero.servicesBtn": "View Services Catalog",

    // Metrics Row
    "metrics.activeSchemes": "Active Schemes",
    "metrics.statesMapped": "States Covered",
    "metrics.capitalSecured": "Capital Secured",
    "metrics.projectsCompleted": "Projects Completed",
    "metrics.complianceError": "Compliance Error",
    "metrics.accuracy": "Match Accuracy",
    "metrics.successRate": "Success Rate",

    // India Map Section
    "map.hudActive": "Active Territory",
    "map.hudOptimized": "Capital Optimized",
    "map.hudHubs": "Incubation Hubs",
    "map.hudSuccess": "Success Audit",

    // Why Choose ICS
    "choose.badge": "",
    "choose.title": "Why Choose ICS?",
    "choose.desc": "We help startups and MSMEs identify the right government schemes, grants, incubators, and funding opportunities with proper guidance, research and strategic support across India.",
    "choose.card1.title": "Match Accuracy",
    "choose.card1.desc": "Our AI cross checks your sector, stage, state and profile across 1200+ schemes before recommending a single option. No irrelevant results. No wasted applications.",
    "choose.card2.title": "Professional Experts",
    "choose.card2.desc": "Research documents, applications, portals, follow-ups. One dedicated team handles everything. You focus on your business. We handle the funding.",
    "choose.card3.title": "Transparent. Always!",
    "choose.card3.desc": "No hidden fees. No surprise charges. No false promises. What we quote is what you pay and what we promise is what we deliver. Every step visible. Every update shared. Nothing hidden. Ever.",

    // How ICS Works
    "process.badge": "Our Process",
    "process.title": "How ICS Works",
    "process.desc": "Our structured 5-step process is designed to make funding discovery, scheme guidance, and startup support simple, fast, and easy for every business.",
    "process.step1.title": "Free Discovery Call",
    "process.step1.duration": "30 minutes",
    "process.step1.desc": "Tell us about your business. We listen, ask the right questions, and figure out exactly what funding you need. Just an honest conversation about your business and what funding could look like for you.",
    "process.step2.title": "Funding Research",
    "process.step2.duration": "48 hours",
    "process.step2.desc": "We search our database of 1200+ schemes, grants, loans and private funds and identify the top opportunities for your specific business. You get a clear report of what is available and why.",
    "process.step3.title": "Documents Preparation",
    "process.step3.duration": "3 to 7 days",
    "process.step3.desc": "We prepare everything needed - business plan, pitch deck, application forms and supporting documents. You review and approve. We handle the hard part.",
    "process.step4.title": "Filed & Tracked",
    "process.step4.duration": "2 to 8 weeks",
    "process.step4.desc": "We submit your applications on the right portals, follow up with departments, and send you a WhatsApp update every 3 days. You always know exactly where things stand.",
    "process.step5.title": "Decision & Beyond",
    "process.step5.duration": "Ongoing",
    "process.step5.desc": "When a decision comes, we walk you through the next steps. Approved - we help you with next steps. Not approved - we identify the next best option and keep going.",

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

const getLanguageFromStorage = (): string => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("infou_language") || "en";
};

const setGoogleTranslateCookie = (lang: string) => {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname;

  // Split hostname to find the root domain for clearing cookies
  const domainParts = domain.split(".");
  const rootDomain = domainParts.length > 1 ? domainParts.slice(-2).join(".") : domain;

  // Define all possible cookie paths and domains to clear them thoroughly
  const cookieKeys = ["googtrans"];
  const domains = [
    "",
    domain,
    `.${domain}`,
    rootDomain,
    `.${rootDomain}`
  ];
  const paths = ["/", "/index.html"];

  // Clear existing cookies to prevent duplicates
  cookieKeys.forEach((key) => {
    domains.forEach((d) => {
      paths.forEach((p) => {
        const domainStr = d ? `; domain=${d}` : "";
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}${domainStr}`;
      });
    });
  });

  // Now set the new cookie on path=/ with host-only (no domain parameter)
  if (lang !== "en") {
    document.cookie = `googtrans=/en/${lang}; path=/`;
  }
};

/**
 * Lazily load the Google Translate script only when a non-English language
 * is requested. Avoids loading it eagerly on every page — which was causing
 * GSAP animation conflicts (MutationObserver 60 fps) and ERR_BLOCKED_BY_CLIENT
 * errors from ad-blockers.
 */
let translateScriptLoaded = false;

const loadGoogleTranslateScript = (): Promise<void> => {
  if (translateScriptLoaded) return Promise.resolve();
  if (typeof document === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    // Set up the init callback before loading the script
    (window as any).googleTranslateElementInit = () => {
      const google = (window as any).google;
      if (google?.translate?.TranslateElement) {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout:
              google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
      translateScriptLoaded = true;
      resolve();
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    return getLanguageFromStorage();
  });

  // On mount: if the stored language is non-English, load translate and set cookie
  useEffect(() => {
    if (language !== "en") {
      setGoogleTranslateCookie(language);
      loadGoogleTranslateScript();
    }
  }, [language]);

  const setLanguage = (lang: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infou_language", lang);
      setLanguageState(lang);
      setGoogleTranslateCookie(lang);
      // Reload to let Google Translate initialize with the new cookie
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

