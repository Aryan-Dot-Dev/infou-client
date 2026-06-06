import React from "react";
import { RoutePath, navigateTo } from "../lib/router";

interface FooterProps {
  onNavigate?: (route: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, route: RoutePath) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    } else {
      navigateTo(route);
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.hash.startsWith("#/landing")) {
      window.location.hash = "#/landing#about";
      const element = document.getElementById("about-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (onNavigate) {
        onNavigate("landing");
      } else {
        navigateTo("landing");
      }
      setTimeout(() => {
        window.location.hash = "#/landing#about";
        const element = document.getElementById("about-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  };

  return (
    <footer className="bg-zinc-50/50 border-t border-zinc-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="font-sans text-xl font-extrabold tracking-tighter text-black mb-6 uppercase">
              Infou Consultancy
            </div>
            <p className="text-zinc-500 font-sans text-sm leading-relaxed max-w-xs">
              Institutional-grade strategic advisory and compliance oversight for complex government capital allocation.
            </p>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-black mb-6">
              Legal Framework
            </h4>
            <ul className="space-y-4 font-sans text-sm">
              <li>
                <a href="#/privacy" className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#/terms" className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#/compliance" className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1">
                  Compliance Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Organization column */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-black mb-6">
              Company
            </h4>
            <ul className="space-y-4 font-sans text-sm">
              <li>
                <a 
                  href="#/landing#about" 
                  onClick={handleAboutClick}
                  className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1"
                >
                  Advisory Board
                </a>
              </li>
              <li>
                <a 
                  href="#/services" 
                  onClick={(e) => handleLinkClick(e, "services")}
                  className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1"
                >
                  Sovereign Schemes
                </a>
              </li>
              <li>
                <a 
                  href="#/blog" 
                  onClick={(e) => handleLinkClick(e, "blog")}
                  className="text-zinc-500 hover:text-black transition-colors hover:underline underline-offset-4 decoration-1"
                >
                  Research Papers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Headquarters */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-black mb-6">
              Headquarters
            </h4>
            <p className="text-zinc-500 font-sans text-sm leading-relaxed mb-6">
              Nariman Point, Mumbai<br />
              Maharashtra, 400021<br />
              India
            </p>
            <p className="text-zinc-400 text-xs font-sans">
              © {new Date().getFullYear()} Institutional Funding Group. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
