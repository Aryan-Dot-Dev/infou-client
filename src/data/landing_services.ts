export interface LandingServiceHighlight {
  code: "GRANTS" | "START" | "DEBT" | "HUBS" | "VC" | "PRIVATE";
  title: string;
  signal: string;
  description: string;
}

export const landingServiceHighlights: LandingServiceHighlight[] = [
  {
    code: "GRANTS",
    title: "Government Grant Advisory",
    signal: "Stop Missing Free Money",
    description: "Discover the right government grants and startup schemes with complete application guidance.",
  },
  {
    code: "START",
    title: "Startup Scheme Matching",
    signal: "Find What Your Business Qualifies For",
    description: "Find the most relevant government schemes and opportunities through AI-powered analysis.",
  },
  {
    code: "DEBT",
    title: "Bank Loan Support",
    signal: "Loans Without the Headache",
    description: "Access business loans and government-backed funding with complete application support.",
  },
  {
    code: "VC",
    title: "Investor Connect",
    signal: "Prepared and Confident Outreach",
    description: "Build investor-ready pitch decks and connect with investor for funding opportunities.",
  },
  {
    code: "HUBS",
    title: "Incubation Access",
    signal: "Unlock Networks & Direct Funding",
    description: "Connect with suitable incubators for mentorship, networking, and startup growth .",
  },
  {
    code: "PRIVATE",
    title: "Private Funding Access",
    signal: "Tap Into CSR & Private Grants",
    description: "Explore private grants, CSR initiatives, and alternative business funding opportunities.",
  },
];
