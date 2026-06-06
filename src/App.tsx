import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./lib/i18n";
import { LandingPage } from "./components/LandingPage";
import { ServicesPage } from "./components/ServicesPage";
import { BlogPage } from "./components/BlogPage";
import { AssessmentModal } from "./components/AssessmentModal";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { useHashLocation, navigateTo } from "./lib/router";
import { AssessmentPage } from "./components/AssessmentPage";
import "./index.css";

export function App() {
    const route = useHashLocation();
    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
    const [assessmentSource, setAssessmentSource] = useState<"manual_click" | "random_popup">("manual_click");
    const [hasSubmitted, setHasSubmitted] = useState(() => {
        return typeof window !== "undefined" && sessionStorage.getItem("infou_assessment_submitted") === "true";
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
        // If the user has completed the assessment form, if the modal is currently visible, or if on the assessment page, do not schedule
        if (hasSubmitted || isAssessmentOpen || route === "assessment") return;

        // Define random delay between 35 and 75 seconds
        const minMs = 35000;
        const maxMs = 75000;
        const randomDelay = Math.floor(Math.random() * (maxMs - minMs) + minMs);

        console.log(`[INFOU POLICY ENGINE] Next diagnostic audit check scheduled in ${(randomDelay / 1000).toFixed(1)} seconds.`);

        const timer = setTimeout(() => {
            setAssessmentSource("random_popup");
            setIsAssessmentOpen(true);
        }, randomDelay);

        return () => clearTimeout(timer);
    }, [hasSubmitted, isAssessmentOpen, route]);

    const handleAssessmentSubmit = (payload: any) => {
        setHasSubmitted(true);
        sessionStorage.setItem("infou_assessment_submitted", "true");
        console.log("[INFOU ACTION REPORT] Assessment successfully compiled. Global auto-popup engine silenced.");
    };

    const renderPage = () => {
        switch (route) {
            case "services":
                return <ServicesPage />;
            case "blog":
                return <BlogPage />;
            case "assessment":
                return <AssessmentPage />;
            case "landing":
            default:
                return <LandingPage />;
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
                <AssessmentModal
                    isOpen={isAssessmentOpen}
                    onClose={() => setIsAssessmentOpen(false)}
                    source={assessmentSource}
                    onSubmitSuccess={handleAssessmentSubmit}
                />

                <ChatbotWidget />
            </div>
        </LanguageProvider>
    );
}

export default App;

