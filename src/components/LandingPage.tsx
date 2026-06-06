import React, { useState, useEffect, useRef, Suspense } from "react";
import { ShieldCheck, Landmark, TrendingUp, ArrowRight, MapPin, CheckCircle, HelpCircle, PhoneCall, Mail } from "lucide-react";
import { navigateTo, navigateToDelayed } from "../lib/router";
import { Magnet } from "./ui/Magnet";
const Grainient = React.lazy(() => import("./ui/Grainient"));
import { ClickSpark } from "./ui/ClickSpark";
import indiaStatesData from "../data/india_states_compressed.json";
import { AnimatedCounter } from "./ui/Counter";
import { Testimonials } from "./ui/Testimonials";
import { LogoCloud } from "./ui/logo-cloud-3";
import { gsap } from "gsap";
import { AnimatedGroup } from "./ui/hero-section-with-gradient";
import { Button } from "./ui/button";
import { TextType } from "./ui/TextType";
import { useLanguage } from "../lib/i18n";
import illustration1 from "../illustration_1.png";
import illustration3 from "../illustration_3.png";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { FounderCard } from "./ui/FounderCard";

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

// Map projection math: India boundaries
// Lon: [68.187, 97.378], Lat: [6.757, 37.074]
const minLon = 68.187;
const maxLat = 37.074;
const centerLatRad = (21.9 * Math.PI) / 180;
const cosVal = Math.cos(centerLatRad); // ~0.9278

const project = (lon: number, lat: number) => {
  const x = 19.8 + (lon - minLon) * cosVal * 17.0;
  const y = 17.3 + (maxLat - lat) * 17.0;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
};

const generatePathData = (geometry: any): string => {
  if (!geometry) return "";
  if (geometry.type === "Polygon") {
    return geometry.coordinates
      .map((ring: number[][]) => {
        return ring
          .map((coord, i) => {
            const p = project(coord[0]!, coord[1]!);
            return `${i === 0 ? "M" : "L"}${p}`;
          })
          .join(" ") + " Z";
      })
      .join(" ");
  } else if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .map((polygon: number[][][]) => {
        return polygon
          .map((ring: number[][]) => {
            return ring
              .map((coord, i) => {
                const p = project(coord[0]!, coord[1]!);
                return `${i === 0 ? "M" : "L"}${p}`;
              })
              .join(" ") + " Z";
          })
          .join(" ");
      })
      .join(" ");
  }
  return "";
};

interface StateMetrics {
  funds: string;
  centers: number;
  success: string;
  startups: string;
}

const getStateData = (name: string): StateMetrics => {
  const hubs: Record<string, StateMetrics> = {
    "Maharashtra": { funds: "₹12.4B", centers: 18, success: "94.2%", startups: "400+" },
    "NCT of Delhi": { funds: "₹9.8B", centers: 12, success: "91.5%", startups: "320+" },
    "Karnataka": { funds: "₹15.2B", centers: 22, success: "89.8%", startups: "450+" },
    "Tamil Nadu": { funds: "₹8.6B", centers: 14, success: "85.4%", startups: "280+" },
    "Gujarat": { funds: "₹7.9B", centers: 11, success: "88.0%", startups: "250+" }
  };

  const matched = hubs[name];
  if (matched) return matched;

  // Deterministic hash-based mock generator
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const fundsNum = ((hash % 56) + 12) / 10;
  const funds = `₹${fundsNum.toFixed(1)}B`;
  const centers = (hash % 8) + 2;
  const successNum = (hash % 16) + 72;
  const success = `${successNum}%`;
  const startupsNum = (hash % 200) + 100;
  const startups = `${startupsNum}+`;

  return { funds, centers, success, startups };
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
    "Himachal Pradesh": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
    "Arunachal Pradesh": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    "Nagaland": "https://plus.unsplash.com/premium_photo-1661957883806-4f6d9ffff913?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Kerala": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
    "Punjab": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    "Assam": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
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
    "Uttarakhand": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    "Jharkhand": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000&q=80",
    "NCT of Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
    "Telangana": "https://images.unsplash.com/photo-1621909321963-2276c9660298?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  return images[stateName] || "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80";
};

interface MetricItemProps {
  label: string;
  value: string;
}

const MetricItem = React.memo(({ label, value }: MetricItemProps) => {
  const [hoverCount, setHoverCount] = useState(0);
  return (
    <div
      onMouseEnter={() => setHoverCount((p) => p + 1)}
      className="flex flex-col text-left cursor-pointer group animate-fade-in"
    >
      <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center h-[36px] md:h-[48px]">
        <AnimatedCounter hoverTrigger={hoverCount} value={value} fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
      </span>
      <span className="font-sans text-[10px] tracking-widest text-zinc-400 group-hover:text-black transition-colors font-bold uppercase select-none">
        {label}
      </span>
    </div>
  );
});
MetricItem.displayName = "MetricItem";

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
      <div className="w-12 h-[1px] bg-primary group-hover:w-full transition-all duration-305" />
    </div>
  );
});
WhyChooseCard.displayName = "WhyChooseCard";

export function LandingPage() {
  const { t, language } = useLanguage();
  const [activeRegion, setActiveRegion] = useState("Maharashtra");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactData.name && contactData.email && contactData.phone) {
      setIsContactSubmitted(true);
      setTimeout(() => {
        setIsContactSubmitted(false);
        setContactData({
          name: "",
          email: "",
          phone: "",
          company: "",
          description: ""
        });
      }, 5000);
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
                  className="w-full h-auto object-contain max-h-[160px] lg:max-h-[220px]"
                  src={illustration1}
                  alt="Policy Diagnostic Seesaw"
                />
              </div>
            </div>

            {/* Center Column: Hero Text, Description, Buttons */}
            <div className="col-span-2 lg:col-span-6 order-1 lg:order-2 text-center flex flex-col items-center justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                Government Funding Strategy for Indian{" "}
                <span className="inline-block min-w-[200px] sm:min-w-[320px] text-center text-primary notranslate">
                  <TextType
                    text={["Businesses", "Startups", "MSMEs"]}
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
                  className="w-full h-auto object-contain max-h-[160px] lg:max-h-[220px]"
                  src={illustration3}
                  alt="Funding Strategy Gears"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-y border-zinc-200/80 bg-secondary/35">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricItem label={t("metrics.activeSchemes")} value="130+" />
            <MetricItem label={t("metrics.statesMapped")} value="28" />
            <MetricItem label={t("metrics.capitalOptimized")} value="₹42B" />
            <MetricItem label={t("metrics.complianceError")} value="0%" />
          </div>
        </div>
      </section>

      {/* Unified Interactive Map & State Advisory HUD (Full Width & Height Dark Layout) */}
      <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-950 py-12 lg:py-16 border-y border-zinc-800 relative overflow-hidden">

        {/* Dynamic State-Specific Heritage Background with dark tint overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={getStateImage(activeRegion)}
            alt={activeRegion}
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
              <h3 className="font-sans text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {activeRegion === "NCT of Delhi" ? "Delhi NCR" : activeRegion}
              </h3>
              <p className="font-sans text-sm text-zinc-200 leading-relaxed mt-3 max-w-sm">
                Powering innovation and growth across {activeRegion === "NCT of Delhi" ? "Delhi NCR" : activeRegion} through capital, incubation, and strategic support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full max-w-sm mt-6 p-5 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  CAPITAL ALLOCATED
                </span>
                <span className="text-2xl font-sans font-extrabold text-white">
                  {getStateData(activeRegion).funds}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  INCUBATION HUBS
                </span>
                <span className="text-2xl font-sans font-extrabold text-white">
                  {getStateData(activeRegion).centers}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  SUCCESS AUDIT
                </span>
                <span className="text-2xl font-sans font-extrabold text-emerald-400">
                  {getStateData(activeRegion).success}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase select-none">
                  STARTUPS SUPPORTED
                </span>
                <span className="text-2xl font-sans font-extrabold text-white">
                  {getStateData(activeRegion).startups}
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
                    {indiaStatesData.features.map((feature: any) => {
                      const stateName = feature.properties.name;
                      const isActive = activeRegion === stateName;

                      return (
                        <path
                          key={stateName}
                          d={generatePathData(feature.geometry)}
                          onMouseEnter={() => {
                            setActiveRegion(stateName);
                            setHoveredState(stateName);
                          }}
                          onMouseLeave={() => setHoveredState(null)}
                          onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                          onClick={() => setActiveRegion(stateName)}
                          className={`transition-all duration-300 cursor-pointer stroke-[1.5] ${isActive
                            ? "fill-white stroke-black drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] z-20"
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
            <span className="text-zinc-400">Trusted by experts.</span>{" "}
            <span className="font-semibold text-black">Used by the leaders.</span>
          </h2>
          <div className="mx-auto mt-6 h-px max-w-md bg-zinc-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </div>

        {/* Full width container for LogoCloud */}
        <div className="w-full relative py-2">
          <LogoCloud logos={logos} />
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

      <Testimonials />

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

          <div className="max-w-5xl mx-auto">
            <FounderCard />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-section" className="px-6 md:px-20 py-24 bg-zinc-50 border-t border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-455 mb-4 block">
              Get In Touch
            </span>
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
                  <p className="font-sans text-xs text-zinc-400">Immediate priority line for urgent institutional inquiries.</p>
                </div>
                <p className="font-sans text-base font-extrabold text-black mt-4 tracking-wide">
                  +1 (800) 555-0199
                </p>
              </div>

              {/* Email */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <Mail size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Email Advisors</h3>
                  <p className="font-sans text-xs text-zinc-400">Submit detailed documentation or formal funding requests.</p>
                </div>
                <p className="font-sans text-base font-extrabold text-black mt-4 underline decoration-1 underline-offset-4 tracking-wide">
                  funding@infouconsultancy.com
                </p>
              </div>

              {/* Office */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-black transition-colors duration-300 group cursor-pointer text-left">
                <div>
                  <MapPin size={28} strokeWidth={1.5} className="text-black mb-4" />
                  <h3 className="font-sans text-base font-bold text-black mb-1">Visit Office</h3>
                  <p className="font-sans text-xs text-zinc-400">Headquarters for scheduled advisory board meetings.</p>
                </div>
                <p className="font-sans text-xs text-zinc-550 mt-4 leading-relaxed">
                  72nd Floor, Global Finance Center<br />
                  Nariman Point, Mumbai, 400021
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
                    <Label htmlFor="contact-name" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-400 select-none">
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
                    <Label htmlFor="contact-email" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-400 select-none">
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
                    <Label htmlFor="contact-phone" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-400 select-none">
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
                    <Label htmlFor="contact-company" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-400 select-none">
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
                  <Label htmlFor="contact-description" className="font-sans text-[9px] font-bold tracking-widest uppercase text-zinc-400 select-none">
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
                      className="w-full bg-black text-white hover:bg-zinc-800 transition-colors h-11 text-xs font-bold tracking-widest uppercase rounded-lg select-none active:scale-[0.99] duration-105 cursor-pointer flex items-center justify-center"
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

                <p className="font-sans text-[10px] text-zinc-400 text-center italic mt-2">
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
