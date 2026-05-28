import React, { useTransition } from "react";
import { navigateTo, navigateToDelayed } from "../lib/router";
import { SpotlightCard } from "./ui/SpotlightCard";
import ClickSpark from "./ui/ClickSpark";
import { AnimatedCounter } from "./ui/Counter";

export function AboutPage() {
  const [, startTransition] = useTransition();

  const stats = [
    { value: "₹12B+", label: "Capital Secured" },
    { value: "450+", label: "Institutions Served" },
    { value: "98.4%", label: "Compliance Rating" },
    { value: "15yr", label: "Market Presence" }
  ];

  const principles = [
    {
      title: "Precision",
      description: "Data-driven accuracy is non-negotiable. Every report undergoes triple-tier verification."
    },
    {
      title: "Transparency",
      description: "Total disclosure of methodology, fee structures, and potential conflicts of interest."
    },
    {
      title: "Accessibility",
      description: "Lowering the barrier to entry for medium-sized Indian firms entering the global market."
    },
    {
      title: "Partnership",
      description: "Long-term alignment with client growth cycles rather than transactional success."
    }
  ];

  const timelineEvents = [
    {
      year: "2009",
      phase: "Foundation",
      title: "Establishment in New Delhi",
      description: "Infou Consultancy was established with a singular focus on distressed debt restructuring for the manufacturing sector."
    },
    {
      year: "2014",
      phase: "Expansion",
      title: "Cross-Border Advisory Launch",
      description: "Expansion into international private equity partnerships, facilitating FDI into emerging Indian tech corridors."
    },
    {
      year: "2019",
      phase: "Digitization",
      title: "Funding Intelligence Platform",
      description: "Migration to a proprietary data model, allowing for real-time compliance monitoring and funding matchmaking."
    },
    {
      year: "2024",
      phase: "Future State",
      title: "Institutional Advisory Mandate",
      description: "Securing recognition as a Tier-1 consultant for government-backed infrastructure funding initiatives."
    }
  ];

  const board = [
    {
      initials: "AK",
      name: "Arjun Kapoor",
      role: "Managing Partner",
      quote: "Excellence is not an act, but a systemic habit."
    },
    {
      initials: "SR",
      name: "Sriya Rao",
      role: "Chief Compliance Officer",
      quote: "Integrity remains the only currency that never devalues."
    },
    {
      initials: "VM",
      name: "Vikram Mehta",
      role: "Head of Strategy",
      quote: "We don't predict the future; we architect the capital to build it."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-6 md:px-20 pt-32 pb-12 max-w-7xl mx-auto text-left md:pt-40 md:pb-16">
        <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-black max-w-4xl mb-12 leading-[1.1]">
          Empowering Indian businesses with funding intelligence.
        </h1>
        <div className="w-full h-px bg-zinc-200" />
      </section>

      {/* Stats Grid Section */}
      <section className="px-6 md:px-20 mb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="border border-zinc-200 rounded-xl p-6 md:p-8 bg-white text-left">
              <div className="font-sans text-3xl md:text-4xl font-extrabold text-black mb-2 flex items-center h-[36px] md:h-[44px]">
                <AnimatedCounter
                  value={stat.value}
                  fontSize={30}
                  mdFontSize={36}
                  fontWeight={800}
                  textColor="black"
                />
              </div>
              <div className="font-sans text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Split Layout */}
      <section className="px-6 md:px-20 py-24 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4 block">
              The Objective
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-black mb-8 tracking-tight">
              Democratizing Access to Institutional Capital
            </h2>
            <p className="font-sans text-base text-zinc-500 max-w-xl mb-8 leading-relaxed">
              We believe that rigorous intelligence and absolute transparency are the foundations of Indian economic growth. Our mission is to bridge the gap between ambitious enterprises and the complex global funding landscape through proprietary analytical models and institutional-grade advisory.
            </p>
            <ClickSpark sparkColor="#000" sparkRadius={24} sparkCount={8} duration={350}>
              <button
                onClick={() => startTransition(() => navigateToDelayed("blog", 350))}
                className="border border-black text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer"
              >
                Read Whitepapers
              </button>
            </ClickSpark>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full aspect-square max-w-md border border-zinc-200 rounded-2xl p-10 md:p-12 flex flex-col justify-between overflow-hidden bg-zinc-50">
              {/* Graphic Mockup */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col gap-6">
                <div className="h-px w-full bg-zinc-200 relative">
                  <div className="absolute -top-1 left-1/4 w-2 h-2 bg-black rounded-full" />
                </div>
                <div className="h-px w-3/4 bg-zinc-200 relative self-end">
                  <div className="absolute -top-1 left-2/3 w-2 h-2 bg-black rounded-full" />
                </div>
                <div className="h-px w-full bg-zinc-200 relative">
                  <div className="absolute -top-1 left-1/2 w-2 h-2 bg-black rounded-full" />
                </div>
              </div>

              {/* Graphic Columns */}
              <div className="flex items-end justify-between h-40 mt-8">
                <div className="w-8 bg-black h-full" />
                <div className="w-8 border border-zinc-300 h-3/4 bg-white" />
                <div className="w-8 bg-black h-1/2" />
                <div className="w-8 border border-zinc-300 h-5/6 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Principles */}
      <section className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="mb-16 text-left">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4 block">
            Institutional Framework
          </span>
          <h2 className="font-sans text-3xl font-extrabold text-black tracking-tight">
            Our Governing Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, idx) => (
            <div key={idx} className="border-l border-black pl-6 py-2 text-left">
              <h3 className="font-sans text-lg font-bold text-black mb-4">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vertical Interactive Timeline */}
      <section className="px-6 md:px-20 py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 text-left">
            <h2 className="font-sans text-3xl font-extrabold text-black mb-6 tracking-tight">
              The Institutional Evolution
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-xs">
              Tracking fifteen years of regulatory shifts and funding milestones across state & central ministries.
            </p>
          </div>

          <div className="lg:w-2/3 relative pl-8 border-l border-zinc-300 space-y-16 py-4">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative group text-left">
                {/* Timeline node */}
                <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-white group-hover:bg-black transition-colors duration-200" />

                <span className="font-sans text-xs font-bold tracking-widest text-zinc-400 block mb-2">
                  {event.year} — {event.phase}
                </span>
                <h4 className="font-sans text-lg font-extrabold text-black mb-3">
                  {event.title}
                </h4>
                <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-xl">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-sans text-3xl font-extrabold text-black tracking-tight">
            Board of Directors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {board.map((member, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(24, 24, 27, 0.05)"
              className="group border border-zinc-200 rounded-2xl p-8 hover:bg-zinc-50 transition-all duration-300 flex flex-col items-center text-center bg-white hover:-translate-y-1"
            >
              <div className="w-24 h-24 border-2 border-black flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-all duration-200 select-none">
                <span className="font-sans text-2xl font-extrabold">{member.initials}</span>
              </div>
              <h5 className="font-sans text-base font-extrabold text-black mb-1">
                {member.name}
              </h5>
              <p className="font-sans text-[10px] tracking-widest font-bold uppercase text-zinc-400 mb-6">
                {member.role}
              </p>
              <div className="w-10 h-px bg-zinc-200 mb-6" />
              <p className="font-sans text-xs text-zinc-500 italic max-w-xs leading-relaxed">
                "{member.quote}"
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Final Inquiry CTA */}
      <section className="px-6 md:px-20 py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold mb-3 tracking-tight text-white">
              Inquire about institutional partnership.
            </h2>
            <p className="font-sans text-sm text-zinc-400">
              Our evaluation desk is prepared to analyze your capital requirements.
            </p>
          </div>
          <ClickSpark sparkColor="#000" sparkRadius={24} sparkCount={8} duration={350}>
            <button
              onClick={() => startTransition(() => navigateToDelayed("contact", 350))}
              className="bg-white text-black px-10 py-4.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-100 transition-colors active:scale-95 duration-100 shrink-0 cursor-pointer"
            >
              Initiate Inquiry
            </button>
          </ClickSpark>
        </div>
      </section>
    </div>
  );
}
