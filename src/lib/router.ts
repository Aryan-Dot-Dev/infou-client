import { useState, useEffect } from "react";

export type RoutePath = "landing" | "services" | "blog" | "assessment";

/**
 * Custom React hook to subscribe to browser hash routing changes (popstate / hashchange).
 * Helps build clean, optimized SPAs without pulling in bloated routing packages.
 */
export function useHashLocation(): RoutePath {
  const [route, setRoute] = useState<RoutePath>(() => {
    const hash = window.location.hash.replace("#/", "");
    return isValidRoute(hash) ? hash : "landing";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "");
      setRoute(isValidRoute(hash) ? hash : "landing");
      
      // Smooth scroll to top on page change, unless navigating to a section anchor
      const hasSectionHash = window.location.hash.slice(2).includes("#");
      if (!hasSectionHash) {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Trigger check on mount if hash is empty
    if (!window.location.hash) {
      window.location.hash = "#/landing";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route;
}

function isValidRoute(hash: string): hash is RoutePath {
  return ["landing", "services", "blog", "assessment"].includes(hash);
}

export function navigateTo(path: RoutePath) {
  window.location.hash = `#/${path}`;
}

export function navigateToDelayed(path: RoutePath, sparkDuration: number) {
  setTimeout(() => {
    navigateTo(path);
  }, sparkDuration + 50);
}
