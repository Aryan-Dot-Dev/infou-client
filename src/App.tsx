import React, { useState, useEffect, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./lib/i18n";
const ServicesPage = React.lazy(() => import("./components/ServicesPage").then(module => ({ default: module.ServicesPage })));
// const BlogPage = React.lazy(() => import("./components/BlogPage").then(module => ({ default: module.BlogPage })));
const AssessmentModal = React.lazy(() => import("./components/AssessmentModal").then(module => ({ default: module.AssessmentModal })));
const ChatbotWidget = React.lazy(() => import("./components/ChatbotWidget").then(module => ({ default: module.ChatbotWidget })));
import { useHashLocation, navigateTo } from "./lib/router";
const AssessmentPage = React.lazy(() => import("./components/AssessmentPage").then(module => ({ default: module.AssessmentPage })));
import "./index.css";

const LandingPage = React.lazy(() => import("./components/LandingPage").then(module => ({ default: module.LandingPage })));

function LandingPageFallback() {
  return (
    <div className="w-full">
      <section className="px-6 py-2 overflow-hidden rounded-xl bg-white min-h-screen flex items-center relative">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl border border-zinc-200/50 pointer-events-none">
          <div className="absolute inset-0 bg-secondary/20 animate-pulse" />
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              backgroundImage: `radial-gradient(oklch(0.55 0.03 38) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 z-10 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 items-center">
            <div className="col-span-1 lg:col-span-3 order-2 lg:order-1 flex justify-center items-center">
              <div className="w-full max-w-[160px] lg:max-w-none aspect-[205/139] bg-zinc-50 border border-zinc-100 rounded-2xl opacity-70 animate-pulse" />
            </div>

            <div className="col-span-2 lg:col-span-6 order-1 lg:order-2 text-center flex flex-col items-center justify-center">
              <span className="font-sans text-base sm:text-lg font-extrabold tracking-[0.25em] uppercase text-[#ea580c] mb-4 block select-none">
                Introducing
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                AI Funding Search Engine for <span className="text-[#ea580c]">Businesses</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-505 leading-relaxed text-center max-w-xl mx-auto">
                1200+ funding opportunities exist across India. Our AI tool finds your best matches in 30 seconds and our experts handle everything after.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 select-none opacity-50">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-base md:text-lg font-bold text-zinc-900 leading-none">4.6</span>
                  <div className="flex items-center -space-x-0.5">
                    <div className="w-[18px] h-[18px] rounded bg-zinc-200 animate-pulse" />
                    <div className="w-[18px] h-[18px] rounded bg-zinc-200 animate-pulse" />
                    <div className="w-[18px] h-[18px] rounded bg-zinc-200 animate-pulse" />
                    <div className="w-[18px] h-[18px] rounded bg-zinc-200 animate-pulse" />
                    <div className="w-[18px] h-[18px] rounded bg-zinc-200 animate-pulse" />
                  </div>
                </div>
                <div className="w-[1px] h-4 bg-zinc-200 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-200 animate-pulse border-2 border-white" />
                    <div className="w-7 h-7 rounded-full bg-zinc-200 animate-pulse border-2 border-white" />
                    <div className="w-7 h-7 rounded-full bg-zinc-200 animate-pulse border-2 border-white" />
                    <div className="w-7 h-7 rounded-full bg-zinc-200 animate-pulse border-2 border-white" />
                  </div>
                  <span className="font-sans text-xs md:text-sm text-zinc-400 font-medium leading-none">
                    Based on trusted businesses
                  </span>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <div className="bg-foreground/10 rounded-[14px] border border-zinc-200/50 p-0.5">
                  <div className="rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase bg-black text-white opacity-80 animate-pulse">
                    Start for Free
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-3 order-3 lg:order-3 flex justify-center items-center">
              <div className="w-full max-w-[160px] lg:max-w-none aspect-[205/139] bg-zinc-50 border border-zinc-100 rounded-2xl opacity-70 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export function App() {
  const route = useHashLocation();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentSource, setAssessmentSource] = useState<"manual_click" | "random_popup">("manual_click");
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    return typeof window !== "undefined" && sessionStorage.getItem("infou_assessment_submitted") === "true";
  });

  const [popupCount, setPopupCount] = useState(() => {
    return typeof window !== "undefined" ? parseInt(sessionStorage.getItem("infou_popup_count") || "0", 10) : 0;
  });

  // Custom Event Listener to open assessment modal
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      const source = customEvent.detail?.source || "manual_click";
      setAssessmentSource(source);
      setIsAssessmentOpen(true);
    };

    window.addEventListener("open-assessment", handleOpenModal);
    return () => window.removeEventListener("open-assessment", handleOpenModal);
  }, []);

  // Random Auto-Popup Scheduler Engine
  useEffect(() => {
    // If the user has completed the assessment form, if the modal is currently visible, on the assessment page, or if popped up 2 times, do not schedule
    if (hasSubmitted || isAssessmentOpen || route === "assessment" || popupCount >= 2) return;

    // Define random delay between 50 and 80 seconds
    const minMs = 50000;
    const maxMs = 80000;
    const randomDelay = Math.floor(Math.random() * (maxMs - minMs) + minMs);

    console.log(`[INFOU POLICY ENGINE] Next diagnostic audit check scheduled in ${(randomDelay / 1000).toFixed(1)} seconds. (Popup count: ${popupCount})`);

    const timer = setTimeout(() => {
      const nextCount = popupCount + 1;
      setPopupCount(nextCount);
      sessionStorage.setItem("infou_popup_count", String(nextCount));
      setAssessmentSource("random_popup");
      setIsAssessmentOpen(true);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [hasSubmitted, isAssessmentOpen, route, popupCount]);

  // Redirect from hidden blog page to landing page
  useEffect(() => {
    if (route === "blog") {
      navigateTo("landing");
    }
  }, [route]);

  const handleAssessmentSubmit = (payload: any) => {
    setHasSubmitted(true);
    sessionStorage.setItem("infou_assessment_submitted", "true");
    console.log("[INFOU ACTION REPORT] Assessment successfully compiled. Global auto-popup engine silenced.");
  };

  const renderPage = () => {
    switch (route) {
      case "services":
        return (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-zinc-400 font-sans text-sm tracking-widest uppercase">Loading Services...</div></div>}>
            <ServicesPage />
          </Suspense>
        );
      // case "blog":
      //     return <BlogPage />;
      case "assessment":
        return (
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-zinc-400 font-sans text-sm tracking-widest uppercase">Loading Assessment...</div></div>}>
            <AssessmentPage />
          </Suspense>
        );
      case "landing":
      default:
        return (
          <Suspense fallback={<LandingPageFallback />}>
            <LandingPage />
          </Suspense>
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-zinc-50 font-sans selection:bg-black selection:text-white antialiased relative">
        {/* Dynamic Shell Navigation */}
        <Navbar currentRoute={route} />

        {/* Main Content Area */}
        <main className="flex-grow w-full">
          {renderPage()}
        </main>

        {/* Structured Footer */}
        <Footer />

        {/* Global Interactive Elements */}
        <Suspense fallback={null}>
          <AssessmentModal
            isOpen={isAssessmentOpen}
            onClose={() => setIsAssessmentOpen(false)}
            source={assessmentSource}
            onSubmitSuccess={handleAssessmentSubmit}
          />
        </Suspense>

        <Suspense fallback={null}>
          <ChatbotWidget />
        </Suspense>

        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </LanguageProvider>
  );
}

export default App;

