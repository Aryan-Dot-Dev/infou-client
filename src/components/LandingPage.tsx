import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { ShieldCheck, Landmark, TrendingUp, ArrowRight, MapPin, CheckCircle, HelpCircle, PhoneCall, Mail, Award, Sparkles, Compass, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
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
import { Carousel, CarouselItemData } from "./ui/Carousel";
import illustration1 from "../assets/illustrations/illustration_1.webp";
import illustration3 from "../assets/illustrations/illustration_3.webp";
import serviceGrants from "../assets/services/government_grant.jpg";
import serviceStartup from "../assets/services/startup_scheme_matching.jpg";
import serviceLoan from "../assets/services/bank_loan_support.jpg";
import serviceInvestor from "../assets/services/investor_connect.jpg";
import serviceIncubation from "../assets/services/incubation_access.jpg";
import servicePrivate from "../assets/services/private_funding_access.jpg";
import avatarIndian1 from "../assets/avatars/avatar_indian_1.png";
import avatarIndian2 from "../assets/avatars/avatar_indian_2.png";
import avatarIndian3 from "../assets/avatars/avatar_indian_3.png";
import avatarIndian4 from "../assets/avatars/avatar_indian_4.png";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { apiUrl } from "@/lib/api";

const Testimonials = React.lazy(() => import("./ui/Testimonials"));
const LogoCloud = React.lazy(() => import("./ui/logo-cloud-3").then(module => ({ default: module.LogoCloud })));
const FounderCard = React.lazy(() => import("./ui/FounderCard").then(module => ({ default: module.FounderCard })));

const logos = [
  {
    src: "https://imgh.in/host/ypegu6",
    alt: "Axentra Logo",
  },
  {
    src: "https://imgh.in/host/pu8lkb",
    alt: "Zevani Logo",
  },
  {
    src: "https://imgh.in/host/lq58t5",
    alt: "Scalar Home Logo",
  },
  {
    src: "https://imgh.in/host/cdv5w5",
    alt: "Kulkarni Logo",
  },
  {
    src: "https://imgh.in/host/7i7hqf",
    alt: "Trinonex Logo",
  },
  {
    src: "https://imgh.in/host/059rhf",
    alt: "Reddy Logo",
  },
  {
    src: "https://imgh.in/host/fcz27k",
    alt: "Greenleaf Logo",
  },
  {
    src: "https://imgh.in/host/6mq0m8",
    alt: "Larana Studio Logo",
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
  PRIVATE: Briefcase,
} as const;

const SERVICE_IMAGE_MAP = {
  GRANTS: serviceGrants,
  START: serviceStartup,
  DEBT: serviceLoan,
  HUBS: "https://imgh.in/host/2n1s7p",
  VC: serviceInvestor,
  PRIVATE: servicePrivate,
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 justify-items-center">
          <div className="w-full"><MetricItem label={t("metrics.activeSchemes")} value="1200+" viewTrigger={viewCount} /></div>
          <div className="w-full"><MetricItem label={t("metrics.statesMapped")} value="28+" viewTrigger={viewCount} /></div>
          <div className="w-full"><MetricItem label={t("metrics.projectsCompleted")} value="40+" viewTrigger={viewCount} /></div>
          <div className="w-full"><MetricItem label={t("metrics.successRate")} value="91%" viewTrigger={viewCount} /></div>
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
      className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-zinc-200 hover:border-[#ea580c] bg-white hover:bg-secondary/15 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="p-3 bg-bronze/10 rounded-xl border border-bronze/30 text-bronze group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-primary-foreground transition-all duration-300">
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
      <div className="w-full h-[1px] bg-[#ea580c] scale-x-[0.15] origin-left group-hover:scale-x-100 transition-transform duration-300" />
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [carouselWidth, setCarouselWidth] = useState(300);
  const [visibleItems, setVisibleItems] = useState(1);
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCarouselWidth(Math.min(window.innerWidth - 96, 720));
        setVisibleItems(2);
      } else {
        setCarouselWidth(Math.min(window.innerWidth - 48, 360));
        setVisibleItems(1);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const carouselItems: CarouselItemData[] = useMemo(() => {
    return landingServiceHighlights.map((service) => {
      const Icon = SERVICE_ICON_MAP[service.code];
      const img = SERVICE_IMAGE_MAP[service.code];
      return {
        id: service.code,
        title: service.title,
        description: service.description,
        icon: <Icon size={20} strokeWidth={2.3} />,
        code: service.code,
        image: img,
      };
    });
  }, []);

  const renderServiceCard = (item: CarouselItemData) => {
    return (
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 text-left bg-cover bg-center overflow-hidden rounded-3xl"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-0" />

        {/* Sleek top accent line that scales on card hover */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary/30 via-primary to-primary/50 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left z-20" />

        <div className="relative z-10 text-white mt-auto">
          {/* Title and Description */}
          <h3 className="font-sans text-base sm:text-lg font-black text-white leading-tight mb-2 group-hover/card:text-primary transition-colors duration-300 select-none">
            {item.title}
          </h3>
          <p className="font-sans text-xs leading-relaxed text-zinc-200 transition-colors duration-300 select-none">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  const whyChooseItems: CarouselItemData[] = useMemo(() => {
    return [
      {
        id: "choose-1",
        title: t("choose.card1.title"),
        description: t("choose.card1.desc"),
        icon: <ShieldCheck className="w-6 h-6 text-bronze transition-colors" />,
        code: "97%",
      },
      {
        id: "choose-2",
        title: t("choose.card2.title"),
        description: t("choose.card2.desc"),
        icon: <Landmark className="w-6 h-6 text-bronze transition-colors" />,
        code: "",
      },
      {
        id: "choose-3",
        title: t("choose.card3.title"),
        description: t("choose.card3.desc"),
        icon: <TrendingUp className="w-6 h-6 text-bronze transition-colors" />,
        code: "100%",
      },
    ];
  }, [t]);

  const renderWhyChooseContent = (item: CarouselItemData) => {
    return (
      <div className="w-full flex flex-col justify-between h-full text-left">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="p-3 bg-bronze/10 rounded-xl border border-bronze/30 text-bronze flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <span className="font-sans text-4xl font-extrabold text-black tracking-tight flex items-center h-[36px] md:h-[40px]">
              {item.code}
            </span>
          </div>
          <h3 className="font-sans text-xl font-bold text-black mb-4 select-none">{item.title}</h3>
          <p className="font-sans text-sm text-zinc-550 leading-relaxed mb-8 select-none">
            {item.description}
          </p>
        </div>
        <div className="w-full h-[1px] bg-primary scale-x-[0.15] origin-left" />
      </div>
    );
  };

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
    }, 1700);

    return () => clearInterval(interval);
  }, [hoveredState, statesPaths]);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: ""
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const validateContactField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "Full name is required";
      } else if (value.trim().length < 2) {
        errorMsg = "Name must be at least 2 characters";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        errorMsg = "Email address is required";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    } else if (name === "phone") {
      if (!value.trim()) {
        errorMsg = "Phone number is required";
      } else if (!/^[+0-9\s-]{8,20}$/.test(value)) {
        errorMsg = "Please enter a valid phone number (8-20 digits)";
      }
    } else if (name === "company") {
      if (!value.trim()) {
        errorMsg = "Company name is required";
      }
    } else if (name === "description") {
      if (!value.trim()) {
        errorMsg = "Business summary is required";
      }
    }

    setContactErrors((prev) => {
      const next = { ...prev };
      if (errorMsg) {
        next[name] = errorMsg;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    validateContactField(name, value);
  };

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (contactData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!contactData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contactData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!contactData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+0-9\s-]{8,20}$/.test(contactData.phone)) {
      newErrors.phone = "Please enter a valid phone number (8-20 digits)";
    }

    if (!contactData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!contactData.description.trim()) {
      newErrors.description = "Business summary is required";
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/contact`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactData.name.trim(),
          email: contactData.email.trim(),
          phone: contactData.phone.trim(),
          company: contactData.company.trim(),
          description: contactData.description.trim(),
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
        setContactErrors({});
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
    <div className="w-full overflow-x-hidden">
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

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 lg:py-0 z-10 w-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Column: Notion-style floating illustration 1 */}
            <div className="hidden lg:flex lg:col-span-3 lg:order-1 justify-start items-center">
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

            <div className="col-span-1 lg:col-span-6 lg:order-2 text-center flex flex-col items-center justify-center">
              <span className="font-sans text-base sm:text-lg font-bold tracking-widest uppercase text-[#ea580c] mb-4 block select-none">
                Introducing
              </span>
              <h1 className="text-[32px] sm:text-[40px] md:text-5xl lg:text-[40px] xl:text-[48px] 2xl:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.15] lg:leading-[1.1] text-center">
                <span className="sm:whitespace-nowrap">AI Funding Search Engine for</span>
                <span className="block text-[#ea580c] notranslate">
                  <TextType
                    text={HERO_ROTATING_TEXTS}
                    as="span"
                    typingSpeed={80}
                    deletingSpeed={45}
                    pauseDuration={2200}
                    showCursor={true}
                    cursorCharacter="|"
                    cursorClassName="text-[#ea580c] font-light ml-1"
                  />
                </span>
              </h1>
              <p className="mt-6 text-sm lg:text-lg text-zinc-500 font-normal leading-relaxed text-center max-w-xl mx-auto">
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

                <div className="flex flex-col min-[425px]:flex-row items-center gap-2.5 min-[425px]:gap-3 text-center min-[425px]:text-left">
                  <div className="flex -space-x-2 shrink-0">
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian1} alt="Indian Business Leader 1" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian2} alt="Indian Business Leader 2" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian3} alt="Indian Business Leader 3" />
                    <img width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" src={avatarIndian4} alt="Indian Business Leader 4" />
                  </div>
                  <span className="font-sans text-[11px] sm:text-xs md:text-sm text-zinc-500 font-medium leading-tight min-[425px]:leading-none whitespace-normal min-[425px]:whitespace-nowrap">
                    Trusted by 100+ businesses across India
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
                  <Magnet padding={60} disabled={isMobile} magnetStrength={10}>
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
            <div className="hidden lg:flex lg:col-span-3 lg:order-3 justify-end items-center">
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
          <div className="relative z-10 lg:col-span-5 text-left flex flex-col items-start gap-5 self-start pt-12 lg:pt-20 notranslate" translate="no">
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
                  Startups Registered
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

          <div className="relative z-10 lg:col-span-7 flex flex-col justify-center items-center lg:items-end w-full">
            <div className="relative w-full max-w-[540px] aspect-[500/520] bg-transparent p-0 overflow-hidden flex items-center justify-center lg:justify-end mx-auto lg:ml-auto">

              <ClickSpark
                sparkColor="#ffffff"
                sparkRadius={28}
                sparkCount={10}
                duration={450}
                style={{ display: "block", width: "100%", height: "100%" }}
                className="w-full h-full flex items-center justify-center lg:justify-end"
              >
                <svg
                  viewBox="0 0 500 550"
                  preserveAspectRatio="xMaxYMid meet"
                  className="w-full h-full select-none transition-transform duration-500 notranslate"
                  translate="no"
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

      {/* Services Section */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-zinc-50/20 border-b border-zinc-200/70 overflow-hidden">
        {/* Subtle grid lines background overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage: `linear-gradient(to right, oklch(0.55 0.03 38 / 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, oklch(0.55 0.03 38 / 0.1) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl opacity-75 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/30 via-secondary/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto z-10 w-full">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 lg:mb-20 px-6 md:px-0">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-4">
              Our Services
            </h2>
          </div>

          {/* Desktop: 3x2 Grid Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {landingServiceHighlights.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.code];
              const img = SERVICE_IMAGE_MAP[service.code];

              return (
                <div
                  key={service.code}
                  className="relative rounded-3xl border border-zinc-200 p-6 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden group/card flex flex-col justify-end min-h-[380px] bg-cover bg-center"
                  style={img ? { backgroundImage: `url(${img})` } : {}}
                >
                  {/* Dark overlay for text readability */}
                  {img && <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-0" />}

                  {/* Sleek top accent line that scales on card hover */}
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary/30 via-primary to-primary/50 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  <div className="relative z-10 text-white mt-auto">
                    {/* Title and Description */}
                    <h3 className="font-sans text-lg font-black text-white leading-tight mb-2.5 group-hover/card:text-primary transition-colors duration-300 select-none">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-zinc-200 transition-colors duration-300 select-none">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet: Swipeable Carousel from React Bits */}
          <div className="lg:hidden flex flex-col items-center w-full max-w-3xl mx-auto">
            <div className="w-full flex justify-center">
              <Carousel
                items={carouselItems}
                baseWidth={carouselWidth}
                visibleItems={visibleItems}
                autoplay={true}
                autoplayDelay={2000}
                pauseOnHover={true}
                loop={true}
                renderContent={renderServiceCard}
                itemClassName="min-h-[350px] hover:border-primary/40 hover:shadow-md transition-all duration-300 relative group/card hover:-translate-y-1 flex flex-col justify-start"
              />
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
      <section className="px-0 md:px-12 lg:px-20 py-16 lg:py-24 bg-secondary/20 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-12 lg:mb-16 px-6 md:px-0">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-6">
              {t("choose.title")}
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              {t("choose.desc")}
            </p>
          </div>

          {/* Desktop/Tablet Grid (lg and above) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            <WhyChooseCard
              icon={<ShieldCheck className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="97%"
              title={t("choose.card1.title")}
              description={t("choose.card1.desc")}
            />
            <WhyChooseCard
              icon={<Landmark className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="25+"
              title={t("choose.card2.title")}
              description={t("choose.card2.desc")}
            />
            <WhyChooseCard
              icon={<TrendingUp className="w-6 h-6 text-bronze group-hover:text-primary-foreground transition-colors" />}
              value="100%"
              title={t("choose.card3.title")}
              description={t("choose.card3.desc")}
            />
          </div>

          {/* Mobile/Tablet Carousel (under lg) */}
          <div className="lg:hidden flex justify-center w-full max-w-3xl mx-auto">
            <Carousel
              items={whyChooseItems}
              baseWidth={carouselWidth}
              visibleItems={visibleItems}
              autoplay={true}
              autoplayDelay={2000}
              pauseOnHover={true}
              loop={true}
              renderContent={renderWhyChooseContent}
              itemClassName="min-h-[290px] flex flex-col justify-between"
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
      <section className="px-6 md:px-20 py-16 lg:py-24 bg-white border-b border-zinc-200 overflow-hidden relative">
        {/* Subtle grid background for high-tech premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-12 lg:mb-16">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-6">
              {t("process.title")}
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              {t("process.desc")}
            </p>
          </div>

          {/* Segmented Pipeline Bar */}
          <div className="relative max-w-6xl mx-auto bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mt-8 lg:mt-16">
            {/* Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 relative z-10 bg-transparent">
              {/* Step 1 */}
              <div className="p-6 md:p-8 flex flex-col justify-between lg:min-h-[220px] min-h-[160px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">01</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step1.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base lg:text-[13px] xl:text-sm font-bold text-zinc-900 leading-tight mb-3 lg:whitespace-nowrap">{t("process.step1.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed text-justify">
                    {t("process.step1.desc")}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 md:p-8 flex flex-col justify-between lg:min-h-[220px] min-h-[160px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">02</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step2.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base lg:text-[13px] xl:text-sm font-bold text-zinc-900 leading-tight mb-3 lg:whitespace-nowrap">{t("process.step2.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed text-justify">
                    {t("process.step2.desc")}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 md:p-8 flex flex-col justify-between lg:min-h-[220px] min-h-[160px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">03</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step3.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base lg:text-[13px] xl:text-sm font-bold text-zinc-900 leading-tight mb-3 lg:whitespace-nowrap">{t("process.step3.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed text-justify">
                    {t("process.step3.desc")}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 md:p-8 flex flex-col justify-between lg:min-h-[220px] min-h-[160px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">04</span>
                    <span className="inline-block px-2 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step4.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base lg:text-[13px] xl:text-sm font-bold text-zinc-900 leading-tight mb-3 lg:whitespace-nowrap">{t("process.step4.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed text-justify">
                    {t("process.step4.desc")}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-6 md:p-8 flex flex-col justify-between lg:min-h-[220px] min-h-[160px] hover:bg-zinc-50/50 transition-colors duration-300 group">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-900">05</span>
                    <span className="inline-block px-2.5 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      {t("process.step5.duration")}
                    </span>
                  </div>
                  <h3 className="font-sans text-base lg:text-[13px] xl:text-sm font-bold text-zinc-900 leading-tight mb-3 lg:whitespace-nowrap">{t("process.step5.title")}</h3>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed text-justify">
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
        className="px-6 md:px-12 lg:px-20 py-16 lg:py-24 w-full scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50/20 relative z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.02) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      >
        {/* Soft atmospheric gradient glow behind cards - clipped inside a separate wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/5 to-bronze/5 rounded-full blur-3xl z-0"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-6 lg:mb-8 text-center">


            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Meet Our <span className="bg-gradient-to-r from-[#ea580c] to-[#d97706] bg-clip-text text-transparent">Strategic Leaders</span>
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
      <section id="contact-section" className="px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-zinc-50 border-t border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 lg:mb-16 text-center">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
              Speak with funding advisors today
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Contact Channels */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-6">
              {/* Phone */}
              <div className="flex-1 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <PhoneCall size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Call Direct</h3>
                  <p className="font-sans text-xs text-zinc-500">Immediate priority line for urgent institutional inquiries.</p>
                </div>
                <p className="font-sans text-base font-extrabold text-black mt-4 tracking-wide">
                  +91 8447198483
                </p>
              </div>

              {/* Email */}
              <div className="flex-1 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <Mail size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Email Advisors</h3>
                  <p className="font-sans text-xs text-zinc-500">Submit detailed documentation or formal funding requests.</p>
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
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Our senior evaluation analysts review all callback inquiries within 4 hours during market trading cycles.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
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
                      className={`font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10 ${contactErrors.name ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {contactErrors.name && (
                      <span className="text-[10px] font-semibold text-red-500 block mt-0.5">
                        {contactErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contact-email" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Email Address
                    </Label>
                    <Input
                      required
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={contactData.email}
                      onChange={handleContactChange}
                      className={`font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10 ${contactErrors.email ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {contactErrors.email && (
                      <span className="text-[10px] font-semibold text-red-500 block mt-0.5">
                        {contactErrors.email}
                      </span>
                    )}
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
                      className={`font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10 ${contactErrors.phone ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {contactErrors.phone && (
                      <span className="text-[10px] font-semibold text-red-500 block mt-0.5">
                        {contactErrors.phone}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contact-company" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                      Company Name
                    </Label>
                    <Input
                      required
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Institutional Ltd."
                      value={contactData.company}
                      onChange={handleContactChange}
                      className={`font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg h-10 ${contactErrors.company ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {contactErrors.company && (
                      <span className="text-[10px] font-semibold text-red-500 block mt-0.5">
                        {contactErrors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="contact-description" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-500 select-none">
                    Business & Funding Requirements
                  </Label>
                  <Textarea
                    required
                    id="contact-description"
                    name="description"
                    placeholder="Briefly describe your current business stage and funding requirements..."
                    rows={3}
                    value={contactData.description}
                    onChange={handleContactChange}
                    className={`font-sans text-xs placeholder:text-zinc-300 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg min-h-[100px] resize-none ${contactErrors.description ? "border-red-500 focus-visible:ring-red-100" : ""
                      }`}
                  />
                  {contactErrors.description && (
                    <span className="text-[10px] font-semibold text-red-500 block mt-0.5">
                      {contactErrors.description}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <ClickSpark sparkColor="#ea580c" sparkRadius={20} sparkCount={8} duration={400} className="w-full" style={{ display: "block", width: "100%" }}>
                    <Button
                      type="submit"
                      className="w-full bg-[#ea580c] text-white hover:bg-[#ea580c]/90 transition-colors h-11 text-xs font-bold tracking-widest uppercase rounded-lg select-none active:scale-[0.99] duration-105 cursor-pointer flex items-center justify-center"
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

                <p className="font-sans text-[10px] text-zinc-500 text-center italic mt-2">
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
