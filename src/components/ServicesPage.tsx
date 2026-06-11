import React, { useState, useTransition, Suspense } from "react";
import { Award, Sparkles, Landmark, Compass, TrendingUp, ArrowRight, HelpCircle, PhoneCall, Check, Briefcase } from "lucide-react";
import { navigateToDelayed } from "../lib/router";
import ClickSpark from "./ui/ClickSpark";
const Grainient = React.lazy(() => import("./ui/Grainient"));

interface ServiceItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  description: string;
  included: string[];
  bestFor: string;
  tag?: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "Government Grant Advisory",
    subtitle: "Stop Missing Free Money",
    icon: Award,
    description: "India has hundreds of government grants for startups and businesses, most go unclaimed simply because founders do not know they exist. We identify every grant your business qualifies for, prepare a strong application and file it correctly the first time.",
    included: [
      "Grant identification from our database of 1200+ options",
      "Eligibility check before any application is filed",
      "Complete application preparation",
      "Supporting documents — business plan, pitch deck, projections",
      "Submission on government portals",
      "Follow-up until decision"
    ],
    bestFor: "Early stage startups, student founders, women entrepreneurs, tech and agri businesses"
  },
  {
    title: "Startup Scheme Matching",
    subtitle: "Find What Your Business Actually Qualifies For",
    icon: Sparkles,
    description: "Central schemes, state schemes, ministry-specific schemes, the list is endless and confusing. We cut through the noise. Our AI matches your exact business profile to the most relevant schemes and our team handles the rest.",
    included: [
      "AI-powered scheme matching from 1200+ database",
      "Top 10 scheme report personalised to your business",
      "Eligibility verification for each scheme",
      "DPIIT and Udyam registration support",
      "Application preparation and filing",
      "Real-time tracking via client portal"
    ],
    bestFor: "Any startup or MSME looking for a structured funding roadmap"
  },
  {
    title: "Bank Loan Support",
    subtitle: "Get the Loan Your Business Deserves — Without the Headache",
    icon: Landmark,
    description: "Bank loans and government-backed financing are some of the most accessible funding options for Indian businesses. But the paperwork, eligibility requirements and bank processes stop most founders from applying. We handle everything from identifying the right loan to submitting a complete, bank-ready application.",
    included: [
      "Identification of best loan options — MUDRA, SIDBI, CGTMSE and more",
      "Collateral assessment and loan structuring advice",
      "Complete loan application preparation",
      "Financial projections and business plan for bank submission",
      "Bank liaison and follow-up",
      "Guidance through sanction and disbursement process"
    ],
    bestFor: "MSMEs, manufacturing units, retail businesses, established startups needing working capital",
    tag: "High Approval Rate"
  },
  {
    title: "Investor Connect",
    subtitle: "Get in Front of the Right Investors — Prepared and Confident",
    icon: TrendingUp,
    description: "Getting an investor meeting is hard. Walking in unprepared is worse. We help you build a compelling investor story, prepare a professional pitch deck, and connect you with angel investors and early-stage funds that are actively looking for businesses like yours.",
    included: [
      "Investor-ready pitch deck preparation",
      "Business valuation guidance",
      "Financial model and projections",
      "Investor outreach strategy",
      "Introduction to relevant angel networks and early-stage funds",
      "Mock pitch session and feedback"
    ],
    bestFor: "Startups looking to raise their first round of funding from angels or seed funds"
  },
  {
    title: "Incubation Access",
    subtitle: "Get Into the Right Incubator — and Unlock Everything That Comes With It",
    icon: Compass,
    description: "The right incubator gives you more than office space — it gives you mentors, networks, government scheme access, credibility and sometimes direct funding. We identify the best incubators for your sector and stage, prepare your application and help you get in.",
    included: [
      "Identification of relevant incubators — GUSEC, iCreate, ihub, AIC, IIM, IIT and more",
      "Incubator application preparation",
      "Business plan and pitch deck for incubator selection process",
      "Interview preparation and mock sessions",
      "Post-selection guidance on maximising incubator benefits",
      "Connection to incubator-linked schemes and grants"
    ],
    bestFor: "Early stage startups and student founders looking for structured support and credibility"
  },
  {
    title: "Private Funding Access",
    subtitle: "Beyond Government: Tap Into Private Grants, CSR Funds and Angel Networks",
    icon: Briefcase,
    description: "Funding is not just from the government. India has a growing ecosystem of private grants, CSR funds, foundations and angel networks that actively look for businesses to support. Most founders never reach them. We know where to look — and how to approach them.",
    included: [
      "Identification of relevant private grants and CSR funds",
      "Angel network and early-stage VC mapping for your sector",
      "Application and pitch preparation for private funds",
      "Introduction and outreach support",
      "Term sheet guidance and basic negotiation support",
      "Ongoing monitoring of new private funding opportunities"
    ],
    bestFor: "Startups and social enterprises looking beyond government funding"
  }
];

export function ServicesPage() {
  const [, startTransition] = useTransition();
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Calculator state
  const [calcSector, setCalcSector] = useState("Technology");
  const [calcStage, setCalcStage] = useState("Early");

  // FAQ state
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const activeService = servicesData[selectedIdx] || servicesData[0];
  const ActiveIcon = activeService.icon;

  const openModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-assessment", { detail: { source: "manual_click" } })
    );
  };

  const getCalculatorResults = () => {
    const estimates: Record<string, Record<string, { grants: string; debt: string; equity: string }>> = {
      Technology: {
        Early: { grants: "₹5L - ₹20L (SISFS & State)", debt: "Up to ₹50L (CGTMSE)", equity: "₹1Cr - ₹5Cr (Angel/VC)" },
        Expanding: { grants: "₹20L - ₹2Cr (R&D Grants)", debt: "₹1Cr - ₹5Cr (CGTMSE Debt)", equity: "₹5Cr - ₹20Cr (Series A)" },
        Enterprise: { grants: "₹1Cr - ₹10Cr (PLI & Tech)", debt: "₹5Cr - ₹20Cr (Subsidized)", equity: "₹20Cr - ₹50Cr+ (Growth)" }
      },
      Manufacturing: {
        Early: { grants: "₹10L - ₹50L (State Seed)", debt: "Up to ₹2Cr (CGTMSE)", equity: "₹50L - ₹2Cr (Syndicates)" },
        Expanding: { grants: "₹50L - ₹5Cr (PLI Subsidies)", debt: "₹2Cr - ₹10Cr (Term Loans)", equity: "₹5Cr - ₹15Cr (VC/Strategic)" },
        Enterprise: { grants: "₹2Cr - ₹50Cr (Central PLI)", debt: "₹10Cr - ₹50Cr (Debt Capital)", equity: "Strategic Joint Ventures" }
      },
      Energy: {
        Early: { grants: "₹10L - ₹30L (Govt TBIs)", debt: "Up to ₹1Cr (SIDBI)", equity: "₹1Cr - ₹3Cr (Impact VC)" },
        Expanding: { grants: "₹50L - ₹3Cr (Capital Subsidy)", debt: "₹2Cr - ₹8Cr (IREDA Debt)", equity: "₹5Cr - ₹12Cr (Cleantech VC)" },
        Enterprise: { grants: "₹3Cr - ₹20Cr (State Incentives)", debt: "₹10Cr - ₹30Cr (Project Finance)", equity: "Project Equity Syndicates" }
      },
      Healthcare: {
        Early: { grants: "₹5L - ₹25L (Govt TBIs)", debt: "Up to ₹1Cr (CGTMSE)", equity: "₹1Cr - ₹4Cr (Medtech VC)" },
        Expanding: { grants: "₹25L - ₹2Cr (R&D / BIRAC)", debt: "₹1Cr - ₹5Cr (Equip Finance)", equity: "₹4Cr - ₹10Cr (Healthcare VC)" },
        Enterprise: { grants: "₹1Cr - ₹15Cr (Med PLI Scheme)", debt: "₹5Cr - ₹20Cr (Working Debt)", equity: "Institutional M&A" }
      },
      Other: {
        Early: { grants: "₹3L - ₹10L (Mudra Schemes)", debt: "Up to ₹50L (CGTMSE)", equity: "₹20L - ₹1Cr (Angels)" },
        Expanding: { grants: "₹10L - ₹50L (State Schemes)", debt: "₹50L - ₹3Cr (Credit Lines)", equity: "₹2Cr - ₹5Cr (Family Offices)" },
        Enterprise: { grants: "₹50L - ₹5Cr (State Rebates)", debt: "₹3Cr - ₹15Cr (Commercial Debt)", equity: "PE Placements" }
      }
    };

    const sectorKey = (estimates[calcSector] ? calcSector : "Other") as keyof typeof estimates;
    const stageKey = (estimates[sectorKey][calcStage] ? calcStage : "Early") as keyof typeof estimates["Technology"];

    return estimates[sectorKey][stageKey];
  };

  const calcResults = getCalculatorResults();

  const faqs = [
    {
      q: "How does the diagnostic assessment match my business against government schemes?",
      a: "Our eligibility matrix audits your entity profile (incorporation date, sector, financials, state operations) against 130+ state and central funding policies. On submission, the engine flags direct matching grants, debt products, and tax exemptions suited to your profile."
    },
    {
      q: "What is the average timeline to secure capital under CGTMSE or PLI schemes?",
      a: "Sovereign registrations like DPIIT certificates or Mudra loans clear in 10-15 business days. Significant capital transactions—like collateral-free bank loans (CGTMSE) or production-linked incentives (PLI)—typically take 30 to 90 days for technical evaluations, document clearances, and disbursal."
    },
    {
      q: "Do you charge upfront advisory fees for scheme applications?",
      a: "We operate on a blended model: a minimal advisory retainer to cover audit documentation and precision dossier prep, combined with a success-based commission upon official fund disbursement. Specific structures vary based on scheme scale and capital limits."
    },
    {
      q: "Can you assist companies with existing state-level audits or compliance issues?",
      a: "Yes. Our strategic desk specializes in correcting compliance drift, re-structuring applications that have faced previous institutional rejection, and curating supplementary response dossiers for state and central committees."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 pt-24 pb-24 overflow-x-hidden">
      {/* WebGL Animated Background */}
      <Suspense fallback={null}>
        <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
          <Grainient
            color1="#FFEAE6"
            color2="#FFF8F6"
            color3="#FFF5F2"
            timeSpeed={0.15}
            zoom={1.2}
            contrast={1.1}
            saturation={0.8}
            grainAmount={0.06}
          />
        </div>
      </Suspense>

      {/* Tactile Dotted Grid Paper Texture Overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-45"
        style={{
          backgroundImage: `radial-gradient(oklch(0.55 0.03 38) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full space-y-24">
        {/* Hero Header Section */}
        {/* <section className="text-left max-w-4xl pt-8 md:pt-16 animate-in fade-in duration-300">
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none mb-6">
            Sovereign Capital & Strategy Desk
          </h1>
          <p className="font-sans text-base md:text-lg text-zinc-550 max-w-2xl leading-relaxed">
            Helping Indian enterprises, high-growth startups, and manufacturers navigate state and central incentives, collateral-free credit lines, and institutional funding parameters.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={8} duration={400}>
              <button
                onClick={openModal}
                className="bg-black text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-800 transition-colors active:scale-95 duration-100 cursor-pointer shadow-sm"
              >
                Launch Eligibility Diagnostic
              </button>
            </ClickSpark>
            <ClickSpark sparkColor="#000" sparkRadius={20} sparkCount={8} duration={350}>
              <button
                onClick={() => {
                  const element = document.getElementById("solutions-explorer");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-zinc-200 hover:border-black bg-white text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer shadow-xs"
              >
                Explore Services Matrix
              </button>
            </ClickSpark>
          </div>
        </section> */}

        {/* Dynamic Explorer Section */}
        <section id="solutions-explorer" className="w-full space-y-8 scroll-mt-28">
          <div>
            <h1 className="font-sans text-2xl md:text-3xl font-extrabold text-black tracking-tight">
              Services Provided
            </h1>
            <div className="h-1 w-12 bg-[#ea580c] mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive tabs selection */}
            <div className="lg:col-span-4 flex flex-col gap-3 w-full">
              {/* Desktop Tabs */}
              <div className="hidden lg:flex flex-col gap-2.5">
                {servicesData.map((svc, idx) => {
                  const Icon = svc.icon;
                  const isActive = selectedIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdx(idx)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 cursor-pointer hover:shadow-xs group ${isActive
                        ? "bg-white border-[#ea580c] shadow-sm"
                        : "bg-white/50 border-zinc-200 hover:bg-white hover:border-zinc-350"
                        }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${isActive ? "bg-[#ea580c] text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
                          }`}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`block font-sans text-sm font-extrabold leading-none ${isActive ? "text-black" : "text-zinc-700"
                            }`}
                        >
                          {svc.title}
                        </span>
                        <span className="block font-sans text-[10px] text-zinc-500 mt-1 select-none font-medium truncate max-w-[200px]">
                          {svc.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Carousel Tabs */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
                {servicesData.map((svc, idx) => {
                  const Icon = svc.icon;
                  const isActive = selectedIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdx(idx)}
                      className={`px-4 py-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 shrink-0 cursor-pointer ${isActive
                        ? "bg-white border-[#ea580c] shadow-xs"
                        : "bg-white/60 border-zinc-200"
                        }`}
                    >
                      <Icon size={14} className={isActive ? "text-[#ea580c]" : "text-zinc-500"} />
                      <span className={`font-sans text-xs font-extrabold tracking-wide ${isActive ? "text-black" : "text-zinc-650"}`}>
                        {svc.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Displaying Details panel */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm text-left min-h-[480px] flex flex-col justify-between transition-all duration-300">
              <div className="space-y-6">
                {/* Panel Header */}
                <div className="flex items-start gap-4 border-b border-zinc-100 pb-5">
                  <div className="p-3 bg-[#ea580c] text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <ActiveIcon size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h2 className="font-sans text-lg md:text-xl font-black text-black leading-tight uppercase">
                        {activeService.title}
                      </h2>
                      {activeService.tag && (
                        <span className="inline-flex items-center bg-orange-100 text-orange-800 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-orange-200 animate-pulse uppercase tracking-wider whitespace-nowrap">
                          {activeService.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider block">
                      {activeService.subtitle}
                    </span>
                  </div>
                </div>

                {/* Panel Description */}
                <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-2xl">
                  {activeService.description}
                </p>

                {/* What is Included Checklist */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400">
                    What is Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {activeService.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-650 text-xs">
                        <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100 shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For Callout */}
                <div className="bg-zinc-50 border border-zinc-200/70 p-4 rounded-xl">
                  <span className="block text-[8px] font-mono font-extrabold uppercase tracking-widest text-zinc-500">
                    Best For
                  </span>
                  <p className="block text-xs font-bold text-black mt-1 font-sans leading-relaxed">
                    {activeService.bestFor}
                  </p>
                </div>
              </div>

              {/* Panel Actions */}
              <div className="pt-6 mt-6 border-t border-zinc-100 flex justify-end">
                <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={6} duration={350}>
                  <button
                    onClick={openModal}
                    className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white px-8 py-3 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <span>Verify My Eligibility</span>
                    <ArrowRight size={12} />
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Capital Estimates Calculator Widget */}
        {/* <section className="w-full bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm text-left space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase select-none block mb-1">
              DIAGNOSTIC MATRIX
            </span>
            <h2 className="font-sans text-2xl font-extrabold text-black tracking-tight">
              Sovereign Capital Allocations Estimator
            </h2>
            <p className="text-zinc-500 font-sans text-xs mt-1 leading-relaxed">
              Configure your sector and scale below to query potential capital channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-zinc-100 lg:pr-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Business Sector
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Technology", "Manufacturing", "Energy", "Healthcare", "Other"].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setCalcSector(sec)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${calcSector === sec
                          ? "bg-black border-black text-white shadow-xs"
                          : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-650"
                        }`}
                    >
                      {sec === "Other" ? "Other Sectors" : sec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Company Scale & Stage
                </label>
                <div className="flex gap-2">
                  {[
                    { key: "Early", label: "Early Startup" },
                    { key: "Expanding", label: "Scale-Up" },
                    { key: "Enterprise", label: "Enterprise" }
                  ].map((stg) => (
                    <button
                      key={stg.key}
                      onClick={() => setCalcStage(stg.key)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${calcStage === stg.key
                          ? "bg-black border-black text-white shadow-xs"
                          : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-650"
                        }`}
                    >
                      {stg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-left">
                  <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                    Estimated Grants Limit
                  </span>
                  <span className="block text-[13px] font-extrabold text-primary tracking-tight mt-1.5 font-sans">
                    {calcResults.grants}
                  </span>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-left">
                  <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                    Collateral-Free Debt
                  </span>
                  <span className="block text-[13px] font-extrabold text-zinc-800 tracking-tight mt-1.5 font-sans">
                    {calcResults.debt}
                  </span>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-left">
                  <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                    Equity Round Estimate
                  </span>
                  <span className="block text-[13px] font-extrabold text-zinc-800 tracking-tight mt-1.5 font-sans">
                    {calcResults.equity}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-50 border border-dashed border-zinc-250 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans text-xs font-bold text-zinc-800">
                    Seek a formal compliance rating & strategy plan?
                  </h4>
                  <p className="text-zinc-500 font-sans text-[11px] mt-0.5 leading-relaxed">
                    Verify this snapshot data by executing our multi-step audit mapping tool.
                  </p>
                </div>
                <ClickSpark sparkColor="#fff" sparkRadius={18} sparkCount={6} duration={350} className="w-full sm:w-auto">
                  <button
                    onClick={openModal}
                    className="w-full sm:w-auto bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
                  >
                    Run Detailed Audit
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        </section> */}

        {/* State / Central Advisors FAQ Accordion */}
        {/* <section className="w-full space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none block mb-1">
              ADVISORY DESK RESOURCES
            </span>
            <h2 className="font-sans text-2xl font-extrabold text-black tracking-tight">
              Frequently Asked Compliance Questions
            </h2>
            <div className="h-1 w-12 bg-[#ea580c] mt-3" />
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-4 divide-y divide-zinc-150">
            {faqs.map((faq, i) => {
              const isOpen = faqOpenIdx === i;
              return (
                <div key={i} className="py-4 first:pt-2 last:pb-2 text-left">
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left font-sans text-sm font-extrabold text-black py-2 hover:text-[#ea580c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon isOpen={isOpen} />
                  </button>

                  <div
                    className={`transition-all duration-350 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                  >
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed pr-8 py-1 select-none">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}
      </div>
    </div>
  );
}

// Chevron helper component to show open/close states in FAQ
function ChevronDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-zinc-500 transition-transform duration-350 shrink-0 ml-4 ${isOpen ? "transform rotate-180 text-black" : ""
        }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
