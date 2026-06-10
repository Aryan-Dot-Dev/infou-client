import React, { useState, useEffect, useRef, Suspense } from "react";
import { ShieldCheck, Landmark, TrendingUp, ArrowRight, MapPin, CheckCircle, HelpCircle, PhoneCall, Mail, Award, Sparkles, Compass } from "lucide-react";
import { navigateTo, navigateToDelayed } from "../lib/router";
import { Magnet } from "./ui/Magnet";
const Grainient = React.lazy(() => import("./ui/Grainient"));
import { ClickSpark } from "./ui/ClickSpark";
import { landingServiceHighlights } from "../data/landing_services";

import { AnimatedCounter } from "./ui/Counter";
import { gsap } from "gsap";
import { AnimatedGroup } from "./ui/hero-section-with-gradient";
import { Button } from "./ui/button";
import { TextType } from "./ui/TextType";
import { useLanguage } from "../lib/i18n";
import illustration1 from "../illustration_1.webp";
import illustration3 from "../illustration_3.webp";
import avatarIndian1 from "../avatar_indian_1.png";
import avatarIndian2 from "../avatar_indian_2.png";
import avatarIndian3 from "../avatar_indian_3.png";
import avatarIndian4 from "../avatar_indian_4.png";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { apiUrl } from "@/lib/api";

const Testimonials = React.lazy(() => import("./ui/Testimonials"));
const LogoCloud = React.lazy(() => import("./ui/logo-cloud-3").then(module => ({ default: module.LogoCloud })));
const FounderCard = React.lazy(() => import("./ui/FounderCard").then(module => ({ default: module.FounderCard })));

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

// Stable reference — prevents TextType effect from resetting on every parent re-render
const HERO_ROTATING_TEXTS = ["Businesses", "Startups", "MSMEs"];

const SERVICE_ICON_MAP = {
  GRANTS: Award,
  START: Sparkles,
  DEBT: Landmark,
  HUBS: Compass,
  VC: TrendingUp,
} as const;


interface StateMetrics {
  startupFund: string;
  incubators: string;
  dpiitStartups: string;
  strongSector: string;
}

const getStateData = (name: string): StateMetrics => {
  const hubs: Record<string, StateMetrics> = {
    "Andhra Pradesh": { startupFund: "₹200 Cr", incubators: "30+", dpiitStartups: "4500+", strongSector: "Agritech & Electronics" },
    "Arunachal Pradesh": { startupFund: "₹10 Cr", incubators: "3+", dpiitStartups: "55+", strongSector: "Tourism" },
    "Assam": { startupFund: "₹200 Cr", incubators: "15+", dpiitStartups: "1500+", strongSector: "Tea & Agritech" },
    "Bihar": { startupFund: "₹500 Cr", incubators: "20+", dpiitStartups: "3000+", strongSector: "EdTech & Agriculture" },
    "Chhattisgarh": { startupFund: "₹100 Cr", incubators: "8+", dpiitStartups: "1200+", strongSector: "Mining & Rural Tech" },
    "Goa": { startupFund: "₹50 Cr", incubators: "7+", dpiitStartups: "700+", strongSector: "Tourism & SaaS" },
    "Gujarat": { startupFund: "₹300 Cr", incubators: "200+", dpiitStartups: "16700+", strongSector: "Manufacturing & EV" },
    "Haryana": { startupFund: "₹200 Cr", incubators: "35+", dpiitStartups: "8000+", strongSector: "AutoTech & Logistics" },
    "Himachal Pradesh": { startupFund: "₹50 Cr", incubators: "10+", dpiitStartups: "500+", strongSector: "Tourism & Food Processing" },
    "Jharkhand": { startupFund: "₹50 Cr", incubators: "7+", dpiitStartups: "1000+", strongSector: "Mining & Tribal Innovation" },
    "Karnataka": { startupFund: "₹518 Cr", incubators: "210+", dpiitStartups: "16954+", strongSector: "AI & SaaS" },
    "Kerala": { startupFund: "₹100 Cr", incubators: "55+", dpiitStartups: "6000+", strongSector: "DeepTech & HealthTech" },
    "Madhya Pradesh": { startupFund: "₹200 Cr", incubators: "40+", dpiitStartups: "4000+", strongSector: "Agritech & Manufacturing" },
    "Maharashtra": { startupFund: "₹500 Cr", incubators: "220+", dpiitStartups: "28511+", strongSector: "FinTech & SaaS" },
    "Manipur": { startupFund: "₹10 Cr", incubators: "4+", dpiitStartups: "185+", strongSector: "Handicraft & Sports" },
    "Meghalaya": { startupFund: "₹10 Cr", incubators: "4+", dpiitStartups: "63+", strongSector: "Tourism" },
    "Mizoram": { startupFund: "₹10 Cr", incubators: "4+", dpiitStartups: "44+", strongSector: "Bamboo & Handicraft" },
    "Nagaland": { startupFund: "₹10 Cr", incubators: "4+", dpiitStartups: "88+", strongSector: "Agriculture" },
    "Odisha": { startupFund: "₹100 Cr", incubators: "45+", dpiitStartups: "3500+", strongSector: "DeepTech & Manufacturing" },
    "Punjab": { startupFund: "₹150 Cr", incubators: "35+", dpiitStartups: "3000+", strongSector: "Agritech & Logistics" },
    "Rajasthan": { startupFund: "₹500 Cr", incubators: "60+", dpiitStartups: "6500+", strongSector: "EV & Tourism" },
    "Sikkim": { startupFund: "₹5 Cr", incubators: "3+", dpiitStartups: "13+", strongSector: "Organic Farming" },
    "Tamil Nadu": { startupFund: "₹100 Cr", incubators: "228+", dpiitStartups: "11900+", strongSector: "Automobile & EV" },
    "Telangana": { startupFund: "₹100 Cr", incubators: "140+", dpiitStartups: "8000+", strongSector: "AI & Pharma" },
    "Tripura": { startupFund: "₹10 Cr", incubators: "8+", dpiitStartups: "147+", strongSector: "Bamboo & Rural Innovation" },
    "Uttar Pradesh": { startupFund: "₹1000 Cr", incubators: "70+", dpiitStartups: "14000+", strongSector: "Agritech & Electronics" },
    "Uttarakhand": { startupFund: "₹200 Cr", incubators: "12+", dpiitStartups: "1200+", strongSector: "Tourism & Sustainability" },
    "West Bengal": { startupFund: "₹100 Cr", incubators: "50+", dpiitStartups: "5500+", strongSector: "DeepTech & FinTech" },
    "NCT of Delhi": { startupFund: "₹200 Cr", incubators: "130+", dpiitStartups: "15000+", strongSector: "AI & FinTech" },
    "Jammu & Kashmir": { startupFund: "₹50 Cr", incubators: "8+", dpiitStartups: "900+", strongSector: "Tourism & Handicraft" },
    "Chandigarh": { startupFund: "₹25 Cr", incubators: "3+", dpiitStartups: "600+", strongSector: "IT Services" },
    "Puducherry": { startupFund: "₹20 Cr", incubators: "5+", dpiitStartups: "250+", strongSector: "Tourism & MSME" },
    "Andaman and Nicobar Islands": { startupFund: "N/A", incubators: "N/A", dpiitStartups: "N/A", strongSector: "N/A" },
    "Dadra and Nagar Haveli and Daman and Diu": { startupFund: "N/A", incubators: "N/A", dpiitStartups: "N/A", strongSector: "N/A" },
    "Lakshadweep": { startupFund: "N/A", incubators: "N/A", dpiitStartups: "N/A", strongSector: "N/A" },
    "Ladakh": { startupFund: "N/A", incubators: "N/A", dpiitStartups: "N/A", strongSector: "N/A" },
  };

  const matched = hubs[name];
  if (matched) return matched;

  // Deterministic hash-based fallback for any unmapped state name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const fundsNum = ((hash % 56) + 12) / 10;
  const startupFund = `₹${fundsNum.toFixed(1)}B`;
  const incubators = `${(hash % 8) + 2}+`;
  const startupsNum = (hash % 200) + 100;
  const dpiitStartups = `${startupsNum}+`;
  const strongSector = "—";

  return { startupFund, incubators, dpiitStartups, strongSector };
};

const getStateImage = (stateName: string): string => {
  const images: Record<string, string> = {
    "Jammu & Kashmir": "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1000&q=80",
    "Gujarat": "https://images.unsplash.com/photo-1620103143245-9efb3e4a7553?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
    "Andaman & Nicobar Island": "https://images.unsplash.com/photo-1617653202545-931490e8d7e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Andhra Pradesh": "https://plus.unsplash.com/premium_photo-1661904165347-369200d4bf72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Daman & Diu": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    "Bihar": "https://images.unsplash.com/photo-1631984876480-f821262c2609?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Lakshadweep": "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Madhya Pradesh": "https://images.unsplash.com/photo-1638814175187-b7fbc1a1e46e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Karnataka": "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Puducherry": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    "Uttar Pradesh": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
    "West Bengal": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80",
    "Odisha": "https://images.unsplash.com/photo-1639980290886-6bdd61c7582b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chandigarh": "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1000&q=80",
    "Haryana": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    "Himachal Pradesh": "https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Arunachal Pradesh": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    "Nagaland": "https://plus.unsplash.com/premium_photo-1661957883806-4f6d9ffff913?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Kerala": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
    "Punjab": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    "Assam": "https://images.unsplash.com/photo-1602020277972-fd160de66021?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Tripura": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    "Dadara & Nagar Havelli": "https://images.unsplash.com/photo-1567097592889-d5dc1590cd5c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Goa": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    "Ladakh": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Chhattisgarh": "https://plus.unsplash.com/premium_photo-1697729677108-a6273adeab39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Maharashtra": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1000&q=80",
    "Manipur": "https://plus.unsplash.com/premium_photo-1666865792731-0a2656f2b12c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Meghalaya": "https://images.unsplash.com/photo-1593813738953-fb3c93e0769d?q=80&w=1254&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mizoram": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80",
    "Rajasthan": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    "Sikkim": "https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Uttarakhand": "https://images.unsplash.com/photo-1608942025318-1191eeade556?q=80&w=1155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Jharkhand": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000&q=80",
    "NCT of Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
    "Telangana": "https://images.unsplash.com/photo-1621909321963-2276c9660298?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  return images[stateName] || "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80";
};

interface MetricItemProps {
  label: string;
  value: string;
  viewTrigger?: number;
}

const MetricItem = React.memo(({ label, value, viewTrigger = 0 }: MetricItemProps) => {
  const [hoverCount, setHoverCount] = useState(0);
  return (
    <div
      onMouseEnter={() => setHoverCount((p) => p + 1)}
      className="flex flex-col items-center text-center cursor-pointer group animate-fade-in w-full"
    >
      <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center justify-center h-[36px] md:h-[48px] w-full">
        <AnimatedCounter hoverTrigger={hoverCount + viewTrigger} value={value} fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
      </span>
      <span className="font-sans text-[10px] tracking-widest text-zinc-500 group-hover:text-black transition-colors font-bold uppercase select-none">
        {label}
      </span>
    </div>
  );
});
MetricItem.displayName = "MetricItem";

/** Wrapper that re-triggers counter animations every time the section scrolls into view */
function MetricsSection({ t }: { t: (key: string) => string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setViewCount((prev) => prev + 1);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-zinc-200/80 bg-secondary/35">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          <MetricItem label={t("metrics.activeSchemes")} value="1200+" viewTrigger={viewCount} />
          <MetricItem label={t("metrics.statesMapped")} value="28 + 7" viewTrigger={viewCount} />
          <MetricItem label={t("metrics.capitalOptimized")} value="₹19400 Crs" viewTrigger={viewCount} />
          <MetricItem label={t("metrics.accuracy")} value="97%" viewTrigger={viewCount} />
        </div>
      </div>
    </section>
  );
}

interface WhyChooseCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  description: string;
}

const WhyChooseCard = React.memo(({ icon, value, title, description }: WhyChooseCardProps) => {
  const [hoverCount, setHoverCount] = useState(0);
  return (
    <div
      onMouseEnter={() => setHoverCount((p) => p + 1)}
      className="group flex flex-col justify-between p-8 rounded-2xl border border-zinc-200 hover:border-primary bg-white hover:bg-secondary/15 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="p-3 bg-bronze/10 rounded-xl border border-bronze/30 text-bronze group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
            {icon}
          </div>
          <span className="font-sans text-4xl font-extrabold text-black tracking-tight flex items-center h-[36px] md:h-[40px]">
            <AnimatedCounter hoverTrigger={hoverCount} value={value} fontSize={36} mdFontSize={40} fontWeight={800} textColor="black" />
          </span>
        </div>
        <h3 className="font-sans text-xl font-bold text-black mb-4 select-none">{title}</h3>
        <p className="font-sans text-sm text-zinc-550 leading-relaxed mb-8 select-none">
          {description}
        </p>
      </div>
      <div className="w-full h-[1px] bg-primary scale-x-[0.15] origin-left group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
});
WhyChooseCard.displayName = "WhyChooseCard";

const StarIcon = ({ filled, half }: { filled?: boolean; half?: boolean }) => {
  if (filled) {
    return (
      <svg className="text-amber-500 fill-amber-500" style={{ width: "18px", height: "18px" }} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  if (half) {
    return (
      <svg className="text-amber-500" style={{ width: "18px", height: "18px" }} viewBox="0 0 20 20" fill="currentColor">
        <defs>
          <linearGradient id="halfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#E4E4E7" />
          </linearGradient>
        </defs>
        <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return (
    <svg className="text-zinc-200 fill-zinc-200" style={{ width: "18px", height: "18px" }} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

export function LandingPage() {
  const { t, language } = useLanguage();
  const [activeRegion, setActiveRegion] = useState("Maharashtra");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [statesPaths, setStatesPaths] = useState<{ stateName: string; pathData: string }[]>([]);

  useEffect(() => {
    import("../data/india_states_paths.json").then((module) => {
      setStatesPaths(module.default || (Array.isArray(module) ? module : []));
    });
  }, []);

  // Auto-switch active states periodically (every 1 second) if the user is not hovering over the map
  useEffect(() => {
    if (hoveredState !== null) return;

    const stateNames = Array.isArray(statesPaths) ? statesPaths.map((p) => p.stateName) : [];
    if (stateNames.length === 0) return;

    const interval = setInterval(() => {
      setActiveRegion((prev) => {
        const currentIndex = stateNames.indexOf(prev);
        const nextIndex = (currentIndex + 1) % stateNames.length;
        return stateNames[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hoveredState, statesPaths]);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: ""
  });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.phone ||
      !contactData.company ||
      !contactData.description
    ) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/contact`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          description: contactData.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setIsContactSubmitted(true);

      setTimeout(() => {
        setIsContactSubmitted(false);
        setContactData({
          name: "",
          email: "",
          phone: "",
          company: "",
          description: "",
        });
      }, 10000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Listen for hash-based scrolling on mount and hash changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash.includes("#about")) {
        const element = document.getElementById("about-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash.includes("#contact")) {
        const element = document.getElementById("contact-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Run on mount
    setTimeout(handleHashScroll, 150);

    // Also watch hash change
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="w-full">
      <section className="px-6 py-2 overflow-hidden rounded-xl bg-white min-h-screen flex items-center relative">
        <div
          ref={gradientRef}
          className="absolute inset-0 z-0 overflow-hidden rounded-2xl border border-zinc-200/50 pointer-events-none"
        >
          <Suspense fallback={<div className="absolute inset-0 bg-secondary/20 animate-pulse" />}>
            <Grainient
              className="absolute inset-0 w-full h-full"
              color1="#fffaf8"
              color2="#e5bba9"
              color3="#f1a388"
              timeSpeed={0.12}
              warpStrength={0.5}
              warpFrequency={3.0}
              warpSpeed={0.8}
              warpAmplitude={35.0}
              grainAmount={0.06}
              contrast={1.1}
            />
          </Suspense>
          {/* Tactile Dotted Grid Paper Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: `radial-gradient(oklch(0.55 0.03 38) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Bottom fade out transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 z-10 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Notion-style floating illustration 1 */}
            <div className="col-span-1 lg:col-span-3 order-2 lg:order-1 flex justify-center items-center">
              <div className="transition-transform duration-500 cursor-pointer animate-float-slow select-none w-full max-w-[160px] lg:max-w-none">
                <img
                  width={205}
                  height={139}
                  className="w-full h-auto object-contain max-h-[160px] lg:max-h-[220px]"
                  style={{ aspectRatio: "205 / 139" }}
                  src={illustration1}
                  alt="Policy Diagnostic Seesaw"
                />
              </div>
            </div>

            <div className="col-span-2 lg:col-span-6 order-1 lg:order-2 text-center flex flex-col items-center justify-center">
              <span className="font-sans text-base sm:text-lg font-extrabold tracking-[0.25em] uppercase text-primary mb-4 block select-none">
                Introducing
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                AI Search Engine for {" "}
                <span className="inline-block min-w-[200px] sm:min-w-[320px] text-center text-primary notranslate">
                  <TextType
                    text={HERO_ROTATING_TEXTS}
                    as="span"
                    typingSpeed={80}
                    deletingSpeed={45}
                    pauseDuration={2200}
                    showCursor={true}
                    cursorCharacter="|"
                    cursorClassName="text-primary/90 font-light ml-1"
                  />
                </span>
              </h1>
              <p className="mt-6 text-lg text-zinc-650 leading-relaxed text-center max-w-xl mx-auto">
                {t("hero.desc")}
              </p>

              {/* Social Proof Rating Widget */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 select-none animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-none">4.6</span>
                  <div className="flex items-center -space-x-0.5">
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon half />
                  </div>
                </div>

                <div className="w-[1px] h-4 bg-zinc-200 hidden sm:block" />

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian1} alt="Indian Business Leader 1" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian2} alt="Indian Business Leader 2" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian3} alt="Indian Business Leader 3" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian4} alt="Indian Business Leader 4" />
                  </div>
                  <span className="font-sans text-xs md:text-sm text-zinc-500 font-medium leading-none">
                    Based on trusted businesses
                  </span>
                </div>
              </div>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  item: {
                    hidden: {
                      opacity: 0,
                      filter: "blur(12px)",
                      y: 12,
                    },
                    visible: {
                      opacity: 1,
                      filter: "blur(0px)",
                      y: 0,
                      transition: {
                        type: "spring",
                        bounce: 0.3,
                        duration: 1.5,
                      },
                    },
                  },
                }}
                className="mt-10 flex justify-center"
              >
                <div key={1} className="bg-foreground/10 rounded-[14px] border border-zinc-200/50 p-0.5">
                  <Magnet padding={60} disabled={false} magnetStrength={10}>
                    <ClickSpark sparkColor="#fff" sparkRadius={24} sparkCount={8} duration={350}>
                      <Button
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent("open-assessment", { detail: { source: "manual_click" } })
                          );
                        }}
                        size="lg"
                        className="rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <span className="text-nowrap">{t("hero.assessmentBtn")}</span>
                      </Button>
                    </ClickSpark>
                  </Magnet>
                </div>
              </AnimatedGroup>
            </div>

            {/* Right Column: Notion-style floating illustration 3 */}
            <div className="col-span-1 lg:col-span-3 order-3 lg:order-3 flex justify-center items-center">
              <div className="transition-transform duration-500 cursor-pointer animate-float-fast select-none w-full max-w-[160px] lg:max-w-none">
                <img
                  width={205}
                  height={139}
                  className="w-full h-auto object-contain max-h-[160px] lg:max-h-[220px]"
                  style={{ aspectRatio: "205 / 139" }}
                  src={illustration3}
                  alt="Funding Strategy Gears"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Metrics Row */}
      <MetricsSection t={t} />

      {/* Unified Interactive Map & State Advisory HUD (Full Width & Height Dark Layout) */}
      <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-950 py-12 lg:py-16 border-y border-zinc-800 relative overflow-hidden">

        {/* Dynamic State-Specific Heritage Background with dark tint overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getStateImage(activeRegion)}
            alt={activeRegion}
            loading="lazy"
            width={800}
            height={600}
            className="w-full h-full object-cover select-none transition-all duration-700 ease-in-out scale-105 contrast-[1.08] brightness-[0.90]"
          />
          {/* Black tint overlay to make the content pop */}
          <div className="absolute inset-0 bg-black/55 z-0" />
        </div>

        {/* Inner Grid: State Info (Left) + India SVG Map (Right) */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 w-full">

          {/* Left Column: State Information & Real-time Metrics HUD */}
          <div className="relative z-10 lg:col-span-5 text-left flex flex-col items-start gap-5 self-start pt-12 lg:pt-20">
            <div>
              <h2 className="font-sans text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {activeRegion === "NCT of Delhi" ? "Delhi NCR" : activeRegion}
              </h2>
              <p className="font-sans text-sm text-zinc-200 leading-relaxed mt-3 max-w-sm">
                Supporting startups and MSMEs in {activeRegion === "NCT of Delhi" ? "Delhi NCR" : activeRegion} with access to incubators, funding opportunities, government support and emerging business sectors.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full max-w-sm mt-6 p-5 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  Startup Fund
                </span>
                <span className="text-2xl font-sans font-extrabold text-white">
                  {getStateData(activeRegion).startupFund}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  Incubators
                </span>
                <span className="text-2xl font-sans font-extrabold text-white">
                  {getStateData(activeRegion).incubators}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  DPIIT Startups
                </span>
                <span className="text-2xl font-sans font-extrabold text-emerald-400">
                  {getStateData(activeRegion).dpiitStartups}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  Strong Sector
                </span>
                <span className="text-base font-sans font-bold text-amber-300 leading-tight">
                  {getStateData(activeRegion).strongSector}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-7 flex flex-col justify-center items-end w-full">
            <div className="relative w-full max-w-[540px] aspect-[500/520] bg-transparent p-0 overflow-hidden flex items-center justify-end ml-auto">

              <ClickSpark
                sparkColor="#ffffff"
                sparkRadius={28}
                sparkCount={10}
                duration={450}
                style={{ display: "block", width: "100%", height: "100%" }}
                className="w-full h-full flex items-center justify-end"
              >
                <svg
                  viewBox="0 0 500 550"
                  preserveAspectRatio="xMaxYMid meet"
                  className="w-full h-full select-none transition-transform duration-500"
                >
                  <g className="transition-all duration-300">
                    {(statesPaths || []).map(({ stateName, pathData }) => {
                      const isActive = activeRegion === stateName;

                      return (
                        <path
                          key={stateName}
                          d={pathData}
                          onMouseEnter={() => {
                            setActiveRegion(stateName);
                            setHoveredState(stateName);
                          }}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setActiveRegion(stateName)}
                          className={`transition-all duration-300 cursor-pointer stroke-[1.5] ${isActive
                            ? "fill-white stroke-white drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] z-20"
                            : "fill-white/15 hover:fill-white/30 stroke-white/60 hover:stroke-white/90"
                            }`}
                        >
                          <title>{stateName}</title>
                        </path>
                      );
                    })}
                  </g>
                </svg>
              </ClickSpark>



              {/* Tooltip removed */}
            </div>
          </div>

        </div>
      </section>

      {/* Orbital Services Section — ICS Hub */}
      <section className="relative px-6 md:px-20 py-24 lg:py-32 bg-white border-b border-zinc-200/70 overflow-hidden">
        {/* Subtle radial glow behind the orbit */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/40 via-secondary/10 to-transparent blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
            <span className="font-mono text-[10px] font-extrabold tracking-widest text-primary uppercase select-none mb-3">
              Advisory Channels
            </span>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-4">
              Services built around your capital path
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-lg">
              Five specialized channels — all connected through one intelligent platform.
            </p>
          </div>

          {/* Desktop: Orbital Layout */}
          <div className="hidden lg:block">
            <div className="relative w-full max-w-[720px] aspect-square mx-auto">
              {/* Orbit rings */}
              <div className="absolute inset-[60px] rounded-full border border-dashed border-zinc-200/70 animate-[spin_90s_linear_infinite]" />
              <div className="absolute inset-[100px] rounded-full border border-zinc-100" />

              {/* Center ICS Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 border-2 border-zinc-700 shadow-2xl shadow-zinc-900/30 flex items-center justify-center group cursor-pointer transition-transform duration-500 hover:scale-110">
                  <span className="font-sans text-4xl font-black text-white tracking-wider select-none">ICS</span>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-20" />
                  <div className="absolute -inset-3 rounded-full border border-zinc-300/30" />
                </div>
              </div>

              {/* Orbital Service Nodes */}
              {landingServiceHighlights.map((service, index) => {
                const Icon = SERVICE_ICON_MAP[service.code];
                const totalItems = landingServiceHighlights.length;
                // Distribute evenly around the circle, starting from top (-90°)
                const angleDeg = (360 / totalItems) * index - 90;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radius = 42; // percentage from center

                const x = 50 + radius * Math.cos(angleRad);
                const y = 50 + radius * Math.sin(angleRad);

                return (
                  <div
                    key={service.code}
                    className="absolute z-10 group"
                    style={{
                      top: `${y}%`,
                      left: `${x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Connector line to center */}
                    <svg
                      className="absolute top-1/2 left-1/2 pointer-events-none -z-10"
                      style={{
                        width: "1px",
                        height: "1px",
                        overflow: "visible",
                      }}
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2={`${(50 - x) * 7.2}px`}
                        y2={`${(50 - y) * 7.2}px`}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-zinc-200 group-hover:text-primary/40 transition-colors duration-300"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    {/* Service Card Node */}
                    <div className="relative w-44 bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                          <Icon size={16} strokeWidth={2.3} />
                        </div>
                        <span className="font-mono text-[8px] font-black tracking-widest text-zinc-300 group-hover:text-primary/60 transition-colors">
                          {service.code}
                        </span>
                      </div>
                      <h3 className="font-sans text-sm font-bold text-black leading-tight mb-1.5">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[11px] leading-relaxed text-zinc-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical list with center ICS badge */}
          <div className="lg:hidden flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 border-2 border-zinc-700 shadow-xl flex items-center justify-center mb-4">
              <span className="font-sans text-2xl font-black text-white tracking-wider select-none">ICS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              {landingServiceHighlights.map((service) => {
                const Icon = SERVICE_ICON_MAP[service.code];
                return (
                  <div
                    key={service.code}
                    className="group bg-white rounded-2xl border border-zinc-200 p-5 hover:shadow-md hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                        <Icon size={16} strokeWidth={2.3} />
                      </div>
                      <span className="font-mono text-[8px] font-black tracking-widest text-zinc-300">
                        {service.code}
                      </span>
                    </div>
                    <h3 className="font-sans text-sm font-bold text-black leading-tight mb-1.5">
                      {service.title}
                    </h3>
                    <p className="font-sans text-[11px] leading-relaxed text-zinc-500">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-14">
            <ClickSpark sparkColor="#000" sparkRadius={18} sparkCount={6} duration={350}>
              <button
                onClick={() => navigateToDelayed("services", 150)}
                className="border border-zinc-200 hover:border-black bg-white text-black px-6 py-3 text-[11px] font-extrabold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer flex items-center gap-2"
              >
                Explore all services
                <ArrowRight size={13} />
              </button>
            </ClickSpark>
          </div>
        </div>
      </section>

      {/* Why Choose ICS Section */}
      <section className="px-6 md:px-20 py-24 bg-secondary/20 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-16">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-6">
              {t("choose.title")}
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              {t("choose.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyChooseCard
              icon={<ShieldCheck className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="98%"
              title={t("choose.card1.title")}
              description={t("choose.card1.desc")}
            />
            <WhyChooseCard
              icon={<Landmark className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="₹12.5B"
              title={t("choose.card2.title")}
              description={t("choose.card2.desc")}
            />
            <WhyChooseCard
              icon={<TrendingUp className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="10x"
              title={t("choose.card3.title")}
              description={t("choose.card3.desc")}
            />
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="relative border-y border-zinc-200 bg-zinc-50/50 py-16 overflow-hidden w-full">
        {/* Subtle decorative grid/glow inside logo cloud for premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-transparent to-zinc-50 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-20 text-center mb-6">
          <h2 className="text-center font-sans font-medium text-zinc-800 text-lg tracking-tight md:text-xl">
            <span className="text-zinc-500">Trusted by startups.</span>{" "}
            <span className="font-semibold text-black">Used by innovative leaders.</span>
          </h2>
          <div className="mx-auto mt-6 h-px max-w-md bg-zinc-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </div>

        {/* Full width container for LogoCloud */}
        <div className="w-full relative py-2">
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-zinc-50/50" />}>
            <LogoCloud logos={logos} />
          </Suspense>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-20">
          <div className="mt-6 h-px bg-zinc-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </div>
      </section>

      {/* How ICS Works Section */}
      <section className="px-6 md:px-20 py-24 bg-white border-b border-zinc-200 overflow-hidden relative">
        {/* Subtle grid background for high-tech premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-16">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-6">
              {t("process.title")}
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              {t("process.desc")}
            </p>
          </div>

          {/* Segmented Pipeline Bar */}
          <div className="relative max-w-6xl mx-auto bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mt-16">
            {/* Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-200 relative z-10 bg-transparent">
              {/* Step 1 */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">01</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step1.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-tight mb-3">{t("process.step1.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {t("process.step1.desc")}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">02</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step2.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-tight mb-3">{t("process.step2.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {t("process.step2.desc")}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">03</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step3.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-tight mb-3">{t("process.step3.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {t("process.step3.desc")}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">04</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step4.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-tight mb-3">{t("process.step4.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {t("process.step4.desc")}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-6 md:p-8 flex flex-col justify-between min-h-[220px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">05</span>
                    <span className="inline-block px-2.5 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step5.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-tight mb-3">{t("process.step5.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {t("process.step5.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-64 w-full animate-pulse bg-zinc-50/50" />}>
        <Testimonials />
      </Suspense>

      {/* About Us / Founder Section */}
      <section
        id="about-section"
        className="px-6 md:px-20 py-24 w-full scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50/20 relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.02) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      >
        {/* Soft atmospheric gradient glow behind cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/5 to-bronze/5 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">


            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Meet Our <span className="bg-gradient-to-r from-[#FF5A36] to-[#d97706] bg-clip-text text-transparent">Strategic Leaders</span>
            </h2>

          </div>

          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-96 w-full animate-pulse bg-zinc-50/50" />}>
              <FounderCard />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-section" className="px-6 md:px-20 py-24 bg-zinc-50 border-t border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
              Speak with funding advisors today
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* Phone */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <PhoneCall size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Call Direct</h3>
                  <p className="font-sans text-xs text-zinc-550">Immediate priority line for urgent institutional inquiries.</p>
                </div>
                <p className="font-sans text-base font-extrabold text-black mt-4 tracking-wide">
                  +91 8447198483
                </p>
              </div>

              {/* Email */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <Mail size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Email Advisors</h3>
                  <p className="font-sans text-xs text-zinc-550">Submit detailed documentation or formal funding requests.</p>
                </div>
                <p className="font-sans text-base font-extrabold text-black mt-4 underline decoration-1 underline-offset-4 tracking-wide">
                  support@infou.in
                </p>
              </div>
            </div>

            {/* Right Column: Callback Request Form */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 text-left h-fit shadow-sm">
              <div className="mb-6">
                <h3 className="font-sans text-xl font-bold text-black mb-2">
                  Request a Callback
                </h3>
                <p className="font-sans text-xs text-zinc-550 leading-relaxed">
                  Our senior evaluation analysts review all callback inquiries within 4 hours during market trading cycles.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="contact-name" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Full Name
                    </Label>
                    <Input
                      required
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={contactData.name}
                      onChange={handleContactChange}
                      className="font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contact-email" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Work Email
                    </Label>
                    <Input
                      required
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={contactData.email}
                      onChange={handleContactChange}
                      className="font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="contact-phone" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Phone Number
                    </Label>
                    <Input
                      required
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 99999 99999"
                      value={contactData.phone}
                      onChange={handleContactChange}
                      className="font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contact-company" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Company Name
                    </Label>
                    <Input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Institutional Ltd."
                      value={contactData.company}
                      onChange={handleContactChange}
                      className="font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="contact-description" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                    Business & Funding Requirements
                  </Label>
                  <Textarea
                    id="contact-description"
                    name="description"
                    placeholder="Briefly describe your current business stage and funding requirements..."
                    rows={3}
                    value={contactData.description}
                    onChange={handleContactChange}
                    className="font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg min-h-[100px] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={8} duration={400} className="w-full" style={{ display: "block", width: "100%" }}>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-white hover:bg-primary/90 transition-colors h-11 text-xs font-bold tracking-widest uppercase rounded-lg select-none active:scale-[0.99] duration-105 cursor-pointer flex items-center justify-center"
                    >
                      Send Request
                    </Button>
                  </ClickSpark>
                </div>

                {isContactSubmitted && (
                  <div className="flex items-center justify-center gap-2 text-zinc-800 text-[10px] font-bold tracking-wider uppercase bg-zinc-50 border border-zinc-200 py-3 rounded-lg">
                    <CheckCircle size={12} className="text-black shrink-0" />
                    Request Sent. An advisor will contact you shortly.
                  </div>
                )}

                <p className="font-sans text-[10px] text-zinc-550 text-center italic mt-2">
                  By submitting, you agree to our sovereign data encryption and privacy standards.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
