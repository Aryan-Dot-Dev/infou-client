import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Zap, HeartHandshake, Heart, Info, Briefcase, Sparkles } from "lucide-react";
import { ScrollStack, ScrollStackItem } from "./ScrollStack";

interface TeamMember {
  id: string;
  name: string;
  age: string;
  role: string;
  tagline: string;
  bio: string;
  image: string;
  icon: React.ReactNode;
  verified: boolean;
  interests: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

const team: TeamMember[] = [
  {
    id: "founder",
    name: "Sudhanshu Sharma",
    age: "",
    role: "Founding Member",
    tagline: "",
    bio: "Sovereign funding strategy advisor with 15+ years of experience optimizing over ₹42B+ in growth funds.",
    image: "https://imgh.in/host/w0f7f5",
    icon: <Award className="w-4 h-4" />,
    verified: true,
    interests: ["Policy Architecture", "Growth Funds", "Sovereign Strategy"],
    stats: [
      { label: "Experience", value: "15+ Yrs" },
      { label: "Firms Guided", value: "450+" },
    ],
  },
  {
    id: "strategy",
    name: "Aryan Sharma",
    age: "",
    role: "Chief Technology Officer, Ex-Nestle",
    tagline: "",
    bio: "Full Stack Engineer with a passion for building innovative solutions. Leading the development of ICS with technology",
    image: "https://imgh.in/host/rgjhxd",
    icon: <Zap className="w-4 h-4" />,
    verified: true,
    interests: ["Full Stack Development", "AI Solutions"],
    stats: [
      { label: "FDI Channels", value: "12+" },
      { label: "M&A Audits", value: "80+" },
    ],
  },
  {
    id: "compliance",
    name: "Yatharth Chopra",
    age: "",
    role: "Data Analyst",
    tagline: "",
    bio: "Backend Engineer powering our AI applications through his expertise in backend and data handling",
    image: "https://imgh.in/host/78ea4b",
    icon: <ShieldCheck className="w-4 h-4" />,
    verified: true,
    interests: ["Backend Engineering", "Data Handling"],
    stats: [
      { label: "Audits Lead", value: "300+" },
      { label: "Capital Mapped", value: "₹15B+" },
    ],
  },
  {
    id: "cto",
    name: "Adarsh Sharma",
    age: "",
    role: "Senior Advisor",
    tagline: "",
    bio: "Architect of our AI search and classification engine, parsing state and national scheme directives.",
    image: "https://imgh.in/host/r01dgz",
    icon: <HeartHandshake className="w-4 h-4" />,
    verified: true,
    interests: ["AI/ML", "Search Engineering", "Policy Parsing"],
    stats: [
      { label: "Directives Indexed", value: "10k+" },
      { label: "Accuracy", value: "99.8%" },
    ],
  },
];

function ProfileCard({ member, index }: { member: TeamMember; index: number }) {
  const [liked, setLiked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default select-none"
      style={{
        aspectRatio: "3/4.2",
        transform: `rotate(${index % 2 === 0 ? "-1" : "1"}deg)`,
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${index % 2 === 0 ? "-1" : "1"}deg) scale(1)`;
      }}
    >
      {/* Full-card background image */}
      <div className="absolute inset-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

      {/* Default Bottom Content (Name & Role) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        {/* Name & Role */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-white text-xl font-extrabold tracking-tight leading-tight">
              {member.name}
            </h3>

          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <Briefcase className="w-3 h-3" />
            {member.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FounderCard() {
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrDesktop(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isTabletOrDesktop) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 py-8 z-10 relative">
        {team.map((member, index) => (
          <ProfileCard key={member.id} member={member} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto z-10 relative">
      <ScrollStack
        useWindowScroll={true}
        itemDistance={50}
        itemStackDistance={24}
        stackPosition="10%"
        scaleEndPosition="4%"
        baseScale={0.88}
        rotationAmount={1}
        blurAmount={1}
      >
        {team.map((member, index) => (
          <ScrollStackItem key={member.id}>
            <ProfileCard member={member} index={index} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
