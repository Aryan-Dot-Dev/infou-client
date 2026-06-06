import React from "react";
import { ArrowUpRight } from "lucide-react";

interface TeamMember {
  id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
  bio: string;
  image: string;
  badgeBg: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const team: TeamMember[] = [
  {
    id: "founder",
    name: { first: "Dr. Ananya", last: "Sharma" },
    role: "Founder & Chief Architect",
    bio: "Sovereign funding strategy advisor with 15+ years of experience optimizing over ₹42B+ in growth funds.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop",
    badgeBg: "#FF5A36", // Primary Orange
    stats: [
      { label: "Experience", value: "15+ Yrs" },
      { label: "Firms Guided", value: "450+" },
    ],
  },
  {
    id: "strategy",
    name: { first: "Vikram", last: "Mehta" },
    role: "Head of Strategy",
    bio: "Ex-investment banker specializing in cross-border capital matching and private-equity policy compliance.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop",
    badgeBg: "#FF5A36", // Primary Orange
    stats: [
      { label: "FDI Channels", value: "12+" },
      { label: "M&A Audits", value: "80+" },
    ],
  },
];

export function FounderCard() {
  const handleCtaClick = () => {
    // Open the primary diagnostic assessment audit modal on the landing page
    window.dispatchEvent(
      new CustomEvent("open-assessment", { detail: { source: "manual_click" } })
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-12 lg:gap-8 xl:gap-12 w-full max-w-5xl mx-auto px-4 py-8 z-10 relative">
      {team.map((member) => {
        const gradId = `notchedCardGrad-${member.id}`;
        const gridId = `cardGrid-${member.id}`;
        return (
          <div
            key={member.id}
            className="relative w-full max-w-[380px] aspect-[380/260] min-h-[260px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer"
            onClick={handleCtaClick}
          >
            {/* Concentric Concave SVG Background */}
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-2xl filter group-hover:brightness-[1.01] transition-all duration-500"
              viewBox="0 0 380 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffbf9" />
                  <stop offset="60%" stopColor="#fffbf9" />
                  <stop offset="100%" stopColor="#fbe7de" />
                </linearGradient>
                {/* Tactical blueprint grid watermark inside the card */}
                <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 90, 54, 0.025)" strokeWidth="1.2" />
                </pattern>
              </defs>
              {/* Outer Card Solid Shape */}
              <path
                d="M 92.64414002968977 0 L 351 0 A 29 29 0 0 1 380 29 L 380 231 A 29 29 0 0 1 351 260 L 29 260 A 29 29 0 0 1 0 231 L 0 92.64414002968977 A 69 69 0 0 0 92.64414002968977 0 Z"
                fill={`url(#${gradId})`}
                stroke="rgba(255, 90, 54, 0.08)"
                strokeWidth="1.5"
                className="transition-colors duration-500 group-hover:stroke-primary/30"
              />
              {/* Overlay Grid Pattern */}
              <path
                d="M 92.64414002968977 0 L 351 0 A 29 29 0 0 1 380 29 L 380 231 A 29 29 0 0 1 351 260 L 29 260 A 29 29 0 0 1 0 231 L 0 92.64414002968977 A 69 69 0 0 0 92.64414002968977 0 Z"
                fill={`url(#${gridId})`}
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
            </svg>

            {/* Overlay Contents */}
            <div className="absolute inset-0 p-7 flex flex-col justify-between z-10 text-[#1c1d1a]">

              {/* Badge positioned strictly relative to computed top-left anchor */}
              <div
                className="absolute transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ top: "-22px", left: "-19px", width: "100px", height: "100px" }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center border border-black/10 shadow-lg relative overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/10"
                  style={{
                    backgroundColor: member.badgeBg,
                  }}
                >
                  <img
                    src={member.image}
                    alt={`${member.name.first} ${member.name.last}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 select-none"
                  />

                  {/* Subtle interactive hover indicator inside the image badge */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-white stroke-[2.5] transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Right Side Media Segment (HUD-style Stats Cards) */}
              <div className="absolute top-8 right-7 w-[120px] flex flex-col items-end gap-3.5 text-right">
                {member.stats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="w-full bg-white/50 backdrop-blur-sm border border-black/[0.04] rounded-2xl p-2.5 shadow-sm text-center transition-all duration-500 group-hover:border-primary/20 group-hover:bg-white/80 group-hover:shadow-md"
                  >
                    <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400">
                      {stat.label}
                    </span>
                    <span className="block text-sm font-black text-primary tracking-tight mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Left Text Group */}
              <div className="flex-1 flex flex-col justify-end max-w-[200px] text-left" style={{ color: "#1c1d1a" }}>
                <p className="text-xl font-light leading-none text-zinc-500">{member.name.first}</p>
                <h2 className="text-2xl font-black leading-none mt-1 text-[#1c1d1a] tracking-tight">{member.name.last}</h2>
                <p className="text-[9px] font-extrabold tracking-widest uppercase mt-2 text-primary/95">
                  {member.role}
                </p>
                <p className="text-[11px] opacity-80 mt-2.5 line-clamp-3 leading-relaxed text-zinc-650 font-medium">
                  {member.bio}
                </p>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
