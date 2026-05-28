import React, { useState } from "react";
import { ShieldCheck, Landmark, TrendingUp, ArrowRight, MapPin, CheckCircle, HelpCircle } from "lucide-react";
import { navigateTo, navigateToDelayed } from "../lib/router";
import { Magnet } from "./ui/Magnet";
import { Grainient } from "./ui/Grainient";
import { ClickSpark } from "./ui/ClickSpark";
import indiaStatesData from "../data/india_states_compressed.json";
import { AnimatedCounter } from "./ui/Counter";
import { Testimonials } from "./ui/Testimonials";

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
}

const getStateData = (name: string): StateMetrics => {
  const hubs: Record<string, StateMetrics> = {
    "Maharashtra": { funds: "₹12.4B", centers: 18, success: "94.2%" },
    "NCT of Delhi": { funds: "₹9.8B", centers: 12, success: "91.5%" },
    "Karnataka": { funds: "₹15.2B", centers: 22, success: "89.8%" },
    "Tamil Nadu": { funds: "₹8.6B", centers: 14, success: "85.4%" },
    "Gujarat": { funds: "₹7.9B", centers: 11, success: "88.0%" }
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

  return { funds, centers, success };
};

export function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeRegion, setActiveRegion] = useState("Maharashtra");

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setEmail("");
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white pt-32 pb-20 px-6 md:px-20 md:pt-40 md:pb-28">
        {/* Full-bleed dynamic WebGL background */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <Grainient
            color1="#ffffff"
            color2="#18181b"
            color3="#71717a"
            timeSpeed={0.15}
            colorBalance={0.0}
            warpStrength={1.0}
            warpFrequency={5.0}
            warpSpeed={1.5}
            warpAmplitude={50.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.06}
            grainScale={2.0}
            grainAnimated={true}
            contrast={1.5}
            gamma={1.0}
            saturation={0.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>

        {/* Content container aligned with main grid */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 text-left">
              <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-black mb-8 leading-[1.1] max-w-4xl">
                Government Funding Strategy for Indian Businesses
              </h1>
              <p className="font-sans text-lg text-zinc-500 max-w-2xl mb-12 leading-relaxed">
                Precision-engineered compliance and allocation frameworks designed to unlock institutional capital across state and central schemes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Magnet padding={60} disabled={false} magnetStrength={10}>
                  <ClickSpark sparkColor="#fff" sparkRadius={24} sparkCount={8} duration={350}>
                    <button
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("open-assessment", { detail: { source: "manual_click" } })
                        );
                      }}
                      className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-800 transition-colors active:scale-95 duration-100 cursor-pointer block"
                    >
                      Start Free Assessment
                    </button>
                  </ClickSpark>
                </Magnet>
                <ClickSpark sparkColor="#000" sparkRadius={24} sparkCount={8} duration={350}>
                  <button
                    onClick={() => navigateToDelayed("services", 350)}
                    className="border border-black text-black px-8 py-4 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer"
                  >
                    View Services Catalog
                  </button>
                </ClickSpark>
              </div>
            </div>

            <div className="lg:col-span-4 h-[450px] md:h-[550px] relative overflow-hidden group border border-zinc-200 rounded-2xl bg-white shadow-xl">
              {/* Elegant architectural image */}
              <div className="absolute inset-0 bg-zinc-950/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                alt="Architectural Minimalism"
                className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 z-20 border border-zinc-200 rounded-xl">
                <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-bold block mb-1">
                  EXCELLENCE INDEX
                </span>
                <p className="text-xs text-black font-semibold font-sans">
                  Sovereign standard alignment ensures complete security in application submissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col text-left">
              <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center h-[36px] md:h-[48px]">
                <AnimatedCounter value="130+" fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
              </span>
              <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-bold uppercase">Active Schemes</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center h-[36px] md:h-[48px]">
                <AnimatedCounter value="28" fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
              </span>
              <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-bold uppercase">States Mapped</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center h-[36px] md:h-[48px]">
                <AnimatedCounter value="₹42B" fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
              </span>
              <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-bold uppercase">Capital Optimized</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-4xl md:text-5xl font-extrabold text-black mb-1 flex items-center h-[36px] md:h-[48px]">
                <AnimatedCounter value="0%" fontSize={36} mdFontSize={48} fontWeight={800} textColor="black" />
              </span>
              <span className="font-sans text-[10px] tracking-widest text-zinc-400 font-bold uppercase">Compliance Error</span>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Intelligence Framework */}
      <section className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="mb-16 text-left">
          <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4">
            The Framework
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Precision Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 md:p-12 border border-zinc-200 rounded-2xl hover:border-black hover:bg-zinc-50 transition-colors duration-300 group text-left">
            <div className="text-black mb-8">
              <ShieldCheck size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans text-xl font-bold text-black mb-4">Eligibility</h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-8">
              Comprehensive diagnostic audit of corporate structures against cross-departmental grant criteria and fiscal incentives.
            </p>
            <div className="w-12 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
          </div>

          {/* Card 2 */}
          <div className="p-8 md:p-12 border border-zinc-200 rounded-2xl hover:border-black hover:bg-zinc-50 transition-colors duration-300 group text-left">
            <div className="text-black mb-8">
              <Landmark size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans text-xl font-bold text-black mb-4">Compliance</h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-8">
              Rigorous adherence to statutory reporting mandates, ensuring risk-mitigated applications and sustained funding cycles.
            </p>
            <div className="w-12 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
          </div>

          {/* Card 3 */}
          <div className="p-8 md:p-12 border border-zinc-200 rounded-2xl hover:border-black hover:bg-zinc-50 transition-colors duration-300 group text-left">
            <div className="text-black mb-8">
              <TrendingUp size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-sans text-xl font-bold text-black mb-4">Peer Analysis</h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-8">
              Deep-tier benchmarking against industry leaders to identify under-utilized subsidies and competitive advantages.
            </p>
            <div className="w-12 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-24 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 text-left flex flex-col">
              {/* <div className="mb-6">
                <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                  Geospatial Network
                </p>
                <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight">
                  Sovereign Capital Map
                </h2>
              </div> */}

              {/* Dynamic Diagnostic HUD Card */}
              <div className="flex-grow bg-zinc-950/80 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[380px] shadow-2xl">
                {/* Decorative pulse line at top */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:20px_20px] opacity-15 pointer-events-none" />

                {/* Top Section */}
                <div className="relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
                    Active Territory
                  </span>
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight block">
                    {activeRegion === "NCT of Delhi" ? "Delhi NCR" : activeRegion}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 border-t border-zinc-900/80 pt-6 mt-8">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        Capital Optimized
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono flex items-center h-[20px] md:h-[24px]">
                        <AnimatedCounter
                          value={getStateData(activeRegion).funds}
                          fontSize={20}
                          mdFontSize={24}
                          fontWeight={700}
                          textColor="white"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        Incubation Hubs
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono flex items-center h-[20px] md:h-[24px]">
                        <AnimatedCounter
                          value={getStateData(activeRegion).centers}
                          fontSize={20}
                          mdFontSize={24}
                          fontWeight={700}
                          textColor="white"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        Success Audit
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight font-mono flex items-center h-[20px] md:h-[24px]">
                        <AnimatedCounter
                          value={getStateData(activeRegion).success}
                          fontSize={20}
                          mdFontSize={24}
                          fontWeight={700}
                          textColor="#34d399"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              <div className="relative w-full aspect-[500/550] bg-zinc-950 border border-zinc-800 rounded-2xl p-0 overflow-hidden flex items-center justify-center shadow-2xl">
                {/* Grid overlay for high-tech feeling */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:25px_25px] opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/90 pointer-events-none" />

                {/* Glow background for active state details */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                <ClickSpark
                  sparkColor="#000000"
                  sparkRadius={28}
                  sparkCount={10}
                  duration={450}
                  style={{ display: "block", width: "100%", height: "100%" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 500 550"
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
                            onMouseEnter={() => setActiveRegion(stateName)}
                            onClick={() => setActiveRegion(stateName)}
                            className={`transition-all duration-300 cursor-pointer stroke-[1] ${isActive
                              ? "fill-white stroke-black drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] z-20"
                              : "fill-zinc-900 hover:fill-zinc-800 stroke-zinc-700/90 hover:stroke-zinc-500"
                              }`}
                          >
                            <title>{stateName}</title>
                          </path>
                        );
                      })}
                    </g>
                  </svg>
                </ClickSpark>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-24 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-black mb-12 tracking-tight">
            Ready to secure your strategic funding?
          </h2>

          <form onSubmit={handleAuditSubmit} className="max-w-xl mx-auto border border-zinc-200 rounded-xl p-2 bg-zinc-50 flex flex-col sm:flex-row gap-2 mb-8">
            <input
              required
              className="flex-grow border-0 focus:ring-0 focus:outline-none font-sans text-xs tracking-wider uppercase px-4 py-3 placeholder:text-zinc-300 text-black bg-transparent"
              placeholder="ENTER CORPORATE EMAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ClickSpark sparkColor="#fff" sparkRadius={24} sparkCount={8} duration={350}>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3.5 text-xs font-bold hover:bg-zinc-800 rounded-lg transition-all uppercase tracking-widest whitespace-nowrap active:scale-95 duration-100 cursor-pointer"
              >
                Initialize Audit
              </button>
            </ClickSpark>
          </form>

          {isSubmitted && (
            <div className="flex items-center justify-center gap-2 text-zinc-800 text-xs font-bold tracking-wider uppercase mb-6 animate-bounce">
              <CheckCircle size={14} className="text-black" />
              Audit Request Initialized. Check your corporate inbox shortly.
            </div>
          )}

          <p className="font-sans text-[10px] text-zinc-400 font-semibold uppercase tracking-[0.2em]">
            Restricted to registered Indian corporate entities only.
          </p>
        </div>
      </section>
    </div>
  );
}
