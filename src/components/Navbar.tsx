import React, { useState, useTransition, useEffect } from "react";
import { Menu, X, Phone, Book, Sunset, Trees, Zap, Award, Landmark, TrendingUp, Sparkles, Compass, Briefcase } from "lucide-react";
import { RoutePath, navigateTo, navigateToDelayed } from "../lib/router";
import ClickSpark from "./ui/ClickSpark";
import { useLanguage } from "../lib/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
  { code: "ta", name: "தமிழ்" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "اردو" }
];

interface NavbarProps {
  currentRoute: RoutePath;
}

export function Navbar({ currentRoute }: NavbarProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, startTransition] = useTransition();
  const { t, language, setLanguage } = useLanguage();

  // Detect scroll state to trigger capsule style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (route: RoutePath, hash?: string) => {
    setIsSheetOpen(false);
    startTransition(() => {
      if (hash) {
        if (window.location.hash.startsWith("#/landing")) {
          window.location.hash = `#/landing${hash}`;
          const element = document.getElementById(hash.replace("#", "") + "-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          navigateTo(route);
          setTimeout(() => {
            window.location.hash = `#/landing${hash}`;
            const element = document.getElementById(hash.replace("#", "") + "-section");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 350);
        }
      } else {
        navigateToDelayed(route, 300);
      }
    });
  };

  const menuItems = [
    {
      title: t("nav.about"),
      route: "landing" as RoutePath,
      hash: "#about"
    },
    {
      title: t("nav.services"),
      route: "services" as RoutePath,
      items: [
        {
          title: "Government Grant Advisory",
          icon: <Award className="w-4 h-4" />,
          route: "services" as RoutePath,
        },
        {
          title: "Startup Scheme Matching",
          icon: <Sparkles className="w-4 h-4" />,
          route: "services" as RoutePath,
        },
        {
          title: "Bank Loan Support",
          icon: <Landmark className="w-4 h-4" />,
          route: "services" as RoutePath,
        },
        {
          title: "Investor Connect",
          icon: <TrendingUp className="w-4 h-4" />,
          route: "services" as RoutePath,
        },
        {
          title: "Incubation Access",
          icon: <Compass className="w-4 h-4" />,
          route: "services" as RoutePath,
        },
        {
          title: "Private Funding Access",
          icon: <Briefcase className="w-4 h-4" />,
          route: "services" as RoutePath,
        }
      ],
    },
    /* {
      title: t("nav.blogs"),
      route: "blog" as RoutePath,
    }, */
    {
      title: t("nav.contact"),
      route: "landing" as RoutePath,
      hash: "#contact"
    },
  ];

  // Dynamically calculate border radius to look perfect as a floating capsule
  const headerRadius = isSheetOpen ? "rounded-2xl" : "rounded-full";

  const triggerColorClass = "bg-transparent text-zinc-650 hover:text-primary hover:bg-secondary/50 data-[state=open]:bg-secondary/50 focus:bg-transparent data-[active]:bg-secondary/50 cursor-pointer";

  const linkColorClass = "text-zinc-650 hover:text-primary hover:bg-secondary/50";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-in-out ${isScrolled ? "pt-4" : "pt-0"
        }`}
    >
      <div
        className={`w-full pointer-events-auto transition-all duration-500 ease-in-out ${isScrolled
          ? `w-[90%] max-w-6xl ${headerRadius} border border-primary/25 bg-secondary/90 text-zinc-900 shadow-xl shadow-zinc-950/5 py-2 md:py-3 px-6 md:px-12 backdrop-blur-md`
          : "w-full max-w-full rounded-none border border-transparent bg-transparent py-4 md:py-5 px-6 md:px-20 text-zinc-900"
          }`}
      >
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Brand Logo */}
          <ClickSpark sparkColor="#ea580c" sparkRadius={20} sparkCount={8} duration={300}>
            <div
              onClick={() => handleNavClick("landing")}
              className="font-sans text-xl md:text-2xl font-extrabold tracking-tighter cursor-pointer select-none hover:opacity-80 transition-opacity uppercase text-primary"
            >
              {/* {t("nav.brand")} */}
              <img src="https://imgh.in/host/5qzegn" alt="Logo" className="h-12 w-auto" />
            </div>
          </ClickSpark>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => {
                  if (item.items) {
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger className={triggerColorClass}>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-84 p-2 flex flex-col gap-2 bg-white/95 backdrop-blur-md rounded-2xl border border-primary/5">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <button
                                    onClick={() => handleNavClick(subItem.route)}
                                    className="group flex select-none items-center gap-4 rounded-xl p-3 text-left w-full border border-transparent hover:border-[#ea580c]/10 hover:bg-[#ea580c]/[0.03] transition-all duration-300 cursor-pointer"
                                  >
                                    <div className="p-2 bg-bronze/10 text-bronze group-hover:bg-[#ea580c] group-hover:text-primary-foreground transition-all duration-300 rounded-lg flex items-center justify-center shrink-0">
                                      {subItem.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                      <div className="text-sm font-extrabold text-black group-hover:text-[#ea580c] transition-colors duration-300">
                                        {subItem.title}
                                      </div>
                                    </div>
                                  </button>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  const isActive = currentRoute === item.route && !item.hash;
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => handleNavClick(item.route!, item.hash)}
                          className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${linkColorClass} ${isActive
                            ? "text-primary font-semibold bg-secondary/60"
                            : ""
                            }`}
                        >
                          {item.title}
                        </button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Items */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selection Dropdown */}
            <div className="relative">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  className="h-9 w-fit rounded-full border border-zinc-200 bg-transparent px-4 py-2 text-[10px] font-extrabold tracking-widest uppercase text-zinc-900 hover:bg-zinc-50 cursor-pointer notranslate"
                  translate="no"
                  aria-label="Select Language"
                >
                  <SelectValue placeholder="Language">
                    {languages.find(l => l.code === language)?.name || "Language"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-zinc-200 shadow-md rounded-xl notranslate" translate="no">
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="text-[10px] font-extrabold tracking-widest uppercase hover:bg-zinc-100 cursor-pointer py-2 notranslate"
                      translate="no"
                    >
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ClickSpark sparkColor="#ea580c" sparkRadius={18} sparkCount={6} duration={350}>
              <a
                href="tel:+91 8447198483"
                className="px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-900 bg-transparent flex items-center gap-2"
              >
                <Phone size={12} />
                +91 8447198483
              </a>
            </ClickSpark>
          </div>

          {/* Mobile Navigation Trigger & Drawer */}
          <div className="lg:hidden flex items-center gap-3">
            <ClickSpark sparkColor="#ea580c" sparkRadius={20} sparkCount={8} duration={350}>
              <a
                href="tel:+91 8447198483"
                className="p-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-900 rounded-full transition-colors flex items-center justify-center"
                title="Call Us"
              >
                <Phone size={16} />
              </a>
            </ClickSpark>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-full transition-colors focus:outline-none cursor-pointer text-zinc-900 hover:bg-zinc-100"
                  aria-label="Toggle Menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto overflow-x-hidden bg-background border-zinc-200 text-zinc-900">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <a
                      onClick={() => {
                        setIsSheetOpen(false);
                        handleNavClick("landing");
                      }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-lg font-extrabold tracking-tighter text-[#ea580c] uppercase">
                        {t("nav.brand")}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4 text-zinc-800"
                  >
                    {menuItems.map((item) => {
                      if (item.items) {
                        return (
                          <AccordionItem key={item.title} value={item.title} className="border-b-0">
                            <AccordionTrigger className="py-0 font-semibold hover:no-underline text-zinc-700 hover:text-primary">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 pl-4 ml-1 flex flex-col gap-1 border-l border-zinc-200">
                              {item.items.map((subItem) => (
                                <button
                                  key={subItem.title}
                                  className="group flex select-none items-center gap-3 rounded-lg py-2 px-2.5 text-left w-full border border-transparent hover:bg-secondary/40 transition-all duration-200 cursor-pointer"
                                  onClick={() => handleNavClick(subItem.route)}
                                >
                                  <div className="p-1.5 bg-bronze/10 text-bronze group-hover:bg-[#ea580c] group-hover:text-primary-foreground transition-all duration-200 rounded-md flex items-center justify-center shrink-0">
                                    {subItem.icon}
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <div className="text-sm font-medium text-zinc-600 group-hover:text-[#ea580c] transition-colors duration-200">
                                      {subItem.title}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }
                      return (
                        <a
                          key={item.title}
                          onClick={() => handleNavClick(item.route!, item.hash)}
                          className="font-semibold text-zinc-700 hover:text-primary cursor-pointer"
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </Accordion>

                  <div className="border-t border-zinc-200 py-4 flex flex-col gap-4">
                    {/* Language Selection Mobile Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-extrabold tracking-widest uppercase text-zinc-400 select-none">
                        Language
                      </span>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger
                          className="h-10 w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-xs font-bold tracking-wide uppercase text-zinc-900 hover:bg-zinc-50 cursor-pointer notranslate"
                          translate="no"
                          aria-label="Select Language"
                        >
                          <SelectValue placeholder="Language">
                            {languages.find(l => l.code === language)?.name || "Language"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-zinc-200 shadow-md rounded-xl notranslate" translate="no">
                          {languages.map((lang) => (
                            <SelectItem
                              key={lang.code}
                              value={lang.code}
                              className="text-xs font-bold tracking-wide uppercase hover:bg-zinc-100 cursor-pointer py-2.5 notranslate"
                              translate="no"
                            >
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <ClickSpark
                      sparkColor="#ea580c"
                      sparkRadius={20}
                      sparkCount={8}
                      duration={400}
                      className="w-full"
                      style={{ width: "100%", display: "block" }}
                    >
                      <a
                        href="tel:+91 8447198483"
                        className="border border-zinc-200 text-zinc-900 text-center py-3.5 text-xs font-bold tracking-widest uppercase rounded-full hover:bg-zinc-50 transition-all active:scale-95 duration-100 flex items-center justify-center gap-2 cursor-pointer w-full"
                      >
                        <Phone size={12} />
                        +91 8447198483
                      </a>
                    </ClickSpark>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
