import React, { useState, useEffect, useRef, Suspense } from "react";
import { CheckCircle, Copy, Check, X, ShieldAlert, Award, FileSpreadsheet, PlayCircle, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ClickSpark from "./ui/ClickSpark";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { gsap } from "gsap";
import { apiUrl } from "../lib/api";


const Grainient = React.lazy(() => import("./ui/Grainient"));

export function AssessmentPage() {
  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    businessDescription: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPayload, setGeneratedPayload] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Recommendation states
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPayload, setShowPayload] = useState(false);
  const [requestPayload, setRequestPayload] = useState<string | null>(null);

  // Edit parameters popup modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Prevent background body scroll when edit modal is open
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isEditModalOpen]);

  // Load results from sessionStorage if redirected from auto-popup submit
  useEffect(() => {
    const cachedResults = sessionStorage.getItem("infou_assessment_results");
    if (cachedResults) {
      try {
        const payloadData = JSON.parse(cachedResults);
        if (payloadData.recommendations) {
          setRecommendations(payloadData.recommendations || []);
          setGeneratedPayload(JSON.stringify(payloadData.recommendations, null, 2));
          if (payloadData.originalFormData) {
            setFormData(payloadData.originalFormData);
          }
        } else {
          setRecommendations(payloadData || []);
          setGeneratedPayload(JSON.stringify(payloadData, null, 2));
        }
        setIsSuccess(true);
      } catch (err) {
        console.error("Failed to parse cached recommendations", err);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Corporate email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!/^[+0-9\s-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid contact number";
    }

    if (!formData.businessName.trim()) newErrors.businessName = "Business/Company name is required";
    if (!formData.businessType) newErrors.businessType = "Please select a business vertical";
    if (!formData.businessDescription.trim()) newErrors.businessDescription = "Business summary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    const payload = {
      timestamp: new Date().toISOString(),
      source: "manual_click",
      formId: `audit_${Math.random().toString(36).substring(2, 11)}`,
      data: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        businessName: formData.businessName.trim(),
        businessType: formData.businessType,
        businessDescription: formData.businessDescription.trim()
      }
    };

    const reqJson = JSON.stringify(payload, null, 2);
    setRequestPayload(reqJson);

    try {
      const response = await fetch(apiUrl(`/api/recommend-schemes`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: reqJson
      });

      if (!response.ok) {
        let errorMsg = `HTTP Error ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errorMsg = errData.detail;
          }
        } catch (_) { }
        throw new Error(errorMsg);
      }

      const resData = await response.json();
      setRecommendations(resData.recommendations || []);
      setGeneratedPayload(JSON.stringify(resData, null, 2));

      // Save to sessionStorage to persist across page refreshes
      const sessionPayload = {
        recommendations: resData.recommendations || [],
        originalFormData: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          businessName: formData.businessName.trim(),
          businessType: formData.businessType,
          businessDescription: formData.businessDescription.trim()
        }
      };
      sessionStorage.setItem("infou_assessment_results", JSON.stringify(sessionPayload));

      setIsSuccess(true);
      setIsEditModalOpen(false);
    } catch (error: any) {
      console.error("[INFOU PAGE RECOMMEND FAILED]", error);
      setApiError(error.message || "Unable to establish connection to the local funding advisory database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="font-sans text-xl font-extrabold text-black mb-1">
            Free Advisory Diagnostic
          </h2>
          <p className="text-zinc-500 font-sans text-xs leading-relaxed">
            Provide your corporate details below to run our policy matching matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1 text-left">
            <Label htmlFor="name" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Vikram Sharma"
              value={formData.name}
              onChange={handleInputChange}
              className={`h-10 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg text-sm ${errors.name ? "border-red-500 focus-visible:ring-red-100" : ""
                }`}
            />
            {errors.name && <span className="text-[10px] font-semibold text-red-500">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="space-y-1 text-left">
            <Label htmlFor="email" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
              Corporate Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. v.sharma@company.in"
              value={formData.email}
              onChange={handleInputChange}
              className={`h-10 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg text-sm ${errors.email ? "border-red-500 focus-visible:ring-red-100" : ""
                }`}
            />
            {errors.email && <span className="text-[10px] font-semibold text-red-500">{errors.email}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="space-y-1 text-left">
            <Label htmlFor="phone" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={handleInputChange}
              className={`h-10 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg text-sm ${errors.phone ? "border-red-500 focus-visible:ring-red-100" : ""
                }`}
            />
            {errors.phone && <span className="text-[10px] font-semibold text-red-500">{errors.phone}</span>}
          </div>

          {/* Business Name */}
          <div className="space-y-1 text-left">
            <Label htmlFor="businessName" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
              Business Name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="e.g. Infotech Systems Ltd"
              value={formData.businessName}
              onChange={handleInputChange}
              className={`h-10 border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black rounded-lg text-sm ${errors.businessName ? "border-red-500 focus-visible:ring-red-100" : ""
                }`}
            />
            {errors.businessName && (
              <span className="text-[10px] font-semibold text-red-500">{errors.businessName}</span>
            )}
          </div>
        </div>

        {/* Business Type Selector */}
        <div className="space-y-1 text-left">
          <Label htmlFor="businessType" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
            Business Vertical
          </Label>
          <Select
            value={formData.businessType}
            onValueChange={(val) => {
              setFormData((prev) => ({ ...prev, businessType: val }));
              if (errors.businessType) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.businessType;
                  return next;
                });
              }
            }}
          >
            <SelectTrigger
              id="businessType"
              className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-black shadow-xs outline-none focus:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 h-10 cursor-pointer ${errors.businessType ? "border-red-500" : ""
                }`}
            >
              <SelectValue placeholder="Select business sector" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-250 text-black">
              <SelectItem value="Technology">Technology & SaaS</SelectItem>
              <SelectItem value="Manufacturing">Heavy Manufacturing & PLI</SelectItem>
              <SelectItem value="Renewable Energy">Renewable Energy & Infrastructure</SelectItem>
              <SelectItem value="Healthcare">Healthcare & Biotech</SelectItem>
              <SelectItem value="Agriculture">Agri-tech & Rural Development</SelectItem>
              <SelectItem value="Services">Professional Services & Consulting</SelectItem>
              <SelectItem value="Other">Other Enterprise Sector</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessType && (
            <span className="text-[10px] font-semibold text-red-500 block">{errors.businessType}</span>
          )}
        </div>

        {/* Business Description */}
        <div className="space-y-1 text-left">
          <Label htmlFor="businessDescription" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-500">
            Business & Funding Goals Description
          </Label>
          <Textarea
            id="businessDescription"
            name="businessDescription"
            rows={3}
            placeholder="Outline your primary operations, expansion roadmap, and what funding schemes you seek."
            value={formData.businessDescription}
            onChange={handleInputChange}
            className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 focus-visible:border-black text-sm min-h-[90px] resize-none ${errors.businessDescription ? "border-red-500 focus-visible:ring-red-100" : ""
              }`}
          />
          {errors.businessDescription && (
            <span className="text-[10px] font-semibold text-red-500">{errors.businessDescription}</span>
          )}
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={8} duration={400} className="w-full" style={{ display: "block", width: "100%" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-all duration-100 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running Advisory Matrix...
                </>
              ) : (
                "Compile Eligibility Diagnostic"
              )}
            </button>
          </ClickSpark>
        </div>
      </form>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 pt-24 pb-24 flex items-start justify-center overflow-x-hidden">
      {/* Dynamic Background Glow */}
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

      <div className="w-full px-6 transition-all duration-500 ease-in-out max-w-7xl z-10 animate-in fade-in duration-300">
        {apiError ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 text-left shadow-sm max-w-xl mx-auto">
            <div className="space-y-6 animate-in fade-in-0 duration-200">
              <div className="flex flex-col items-center justify-center text-center py-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center rounded-full mb-3 shadow-xs">
                  <X size={24} strokeWidth={2} />
                </div>
                <h1 className="font-sans text-lg font-extrabold text-black uppercase tracking-wider">
                  Advisory Database Offline
                </h1>
                <p className="text-zinc-550 font-sans text-xs max-w-sm mt-1 leading-relaxed text-center">
                  The recommendations service returned the following diagnostic warning:
                </p>
                <div className="bg-red-50/50 border border-red-200 text-red-800 rounded-xl px-4 py-3.5 text-xs leading-relaxed max-w-lg mt-4 font-sans w-full text-center">
                  {apiError}
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <ClickSpark sparkColor="#000" sparkRadius={20} sparkCount={8} duration={350}>
                  <button
                    onClick={() => {
                      setApiError(null);
                      setIsSuccess(false);
                    }}
                    className="border border-zinc-200 text-black px-10 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer"
                  >
                    Retry Diagnostics Form
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        ) : !isSuccess ? (
          <div className="flex flex-col items-center animate-in fade-in-0 duration-200 max-w-2xl mx-auto w-full">
            {/* Top Centered Header (Just like Landing Page Hero) */}
            <div className="text-center max-w-3xl mx-auto mb-6 flex flex-col items-center justify-center w-full">
              <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Find Your Eligible Government Schemes
              </h1>
            </div>

            {/* Compact Form Card */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm w-full">
              {renderForm()}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in-0 duration-200 w-full text-left">
            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-1">
              <div className="space-y-1">
                <h1 className="font-sans text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-tight">
                  Matched Sovereign Funding Schemes
                </h1>
              </div>
            </div>

            {/* 2. Collapsible Profile Panel */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs text-left transition-all duration-300">
              {/* Collapsed horizontal summary panel */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                  {/* Entity Profile */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase select-none block">
                      Enterprise Entity
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-extrabold text-base text-black">
                        {formData.businessName || "Unnamed Business"}
                      </span>
                      <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold text-zinc-650 uppercase tracking-wider">
                        {formData.businessType || "Unspecified Sector"}
                      </span>
                    </div>
                  </div>

                  {/* Key Representative */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase select-none block">
                      Representative
                    </span>
                    <span className="font-sans font-bold text-sm text-zinc-800 block">
                      {formData.name}
                    </span>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase select-none block">
                      Contact Information
                    </span>
                    <span className="font-sans text-xs text-zinc-655 block">
                      {formData.email} &bull; {formData.phone}
                    </span>
                  </div>
                </div>

                <div className="pt-2 lg:pt-0 lg:border-l lg:border-zinc-100 lg:pl-6 flex items-center">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full lg:w-auto border border-zinc-200 hover:border-black text-black px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    Modify Parameters
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom Grid: Matched Schemes */}
            <div className="w-full">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="w-8 h-8 border-4 border-zinc-250 border-t-black rounded-full animate-spin" />
                  <p className="text-zinc-500 font-sans text-xs">Submitting sovereign policy matching matrix...</p>
                </div>
              ) : recommendations && recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {recommendations.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-xs hover:border-black hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left relative"
                    >
                      {/* Premium Call Badge with Tooltip */}
                      <div className="absolute top-5 right-5 z-20 group/tooltip">
                        <a
                          href="tel:+91 8447198483"
                          className="w-7 h-7 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm border border-primary/20 relative"
                        >
                          {/* Pulsing ring indicator */}
                          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 pointer-events-none group-hover/tooltip:animate-none" />
                          <Phone size={11} strokeWidth={2.5} />
                        </a>

                        {/* Tooltip Content */}
                        <div className="absolute bottom-full right-0 mb-2 px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] font-bold tracking-wide uppercase rounded-lg shadow-md whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 ease-out z-30 font-sans border border-zinc-800 flex items-center gap-1.5">
                          <Phone size={10} className="text-primary" />
                          <span>Call to get more details</span>
                          {/* Tooltip arrow centered under the badge */}
                          <div className="absolute top-full right-2.5 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-800" />
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        {/* Scheme Name */}
                        <h4 className="font-sans text-base font-extrabold text-black tracking-tight leading-tight pr-8">
                          {rec.schemeName}
                        </h4>

                        {/* Scheme Description */}
                        <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                          {rec.schemeDescription}
                        </p>
                      </div>

                      {/* Scheme Parameters HUD */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 text-left">
                          <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-500 font-sans">
                            Funding Range
                          </span>
                          <span className="block text-[11px] font-bold text-primary tracking-tight mt-1 font-sans">
                            {rec.fundingRange || "Not specified"}
                          </span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 text-left">
                          <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-500 font-sans">
                            Expected Timeline
                          </span>
                          <span className="block text-[11px] font-bold text-zinc-800 tracking-tight mt-1 font-sans">
                            {rec.expectedTimeline || "Not specified"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-zinc-200 rounded-2xl shadow-xs text-zinc-500 text-xs font-sans">
                  No matching schemes were found for your business profile at this time.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Parameters Popup Modal Overlay at Root Level to cover full screen & avoid z-index/containing block issues */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200">
          {/* Close modal on click backdrop */}
          <div className="absolute inset-0" onClick={() => setIsEditModalOpen(false)} />

          <div className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-xl text-left z-10 animate-in zoom-in-95 duration-200">
            {/* Premium Close Button positioned floating above on mobile and diagonally at the corner on desktop */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="absolute -top-10 right-2 sm:-top-4 sm:-right-4 z-50 w-9 h-9 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
              title="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-sans text-lg font-extrabold text-black uppercase tracking-wider">
                  SUBMIT
                </h3>
              </div>

              <div className="space-y-4">
                {/* Business Type Selector (Active) */}
                <div className="space-y-1">
                  <Label htmlFor="businessType" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Business Vertical
                  </Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(val) => {
                      setFormData((prev) => ({ ...prev, businessType: val }));
                      if (errors.businessType) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.businessType;
                          return next;
                        });
                      }
                    }}
                  >
                    <SelectTrigger
                      id="businessType"
                      className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-black outline-none h-10 cursor-pointer ${errors.businessType ? "border-red-500" : ""
                        }`}
                    >
                      <SelectValue placeholder="Select business sector" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-zinc-250 text-black">
                      <SelectItem value="Technology">Technology & SaaS</SelectItem>
                      <SelectItem value="Manufacturing">Heavy Manufacturing & PLI</SelectItem>
                      <SelectItem value="Renewable Energy">Renewable Energy & Infrastructure</SelectItem>
                      <SelectItem value="Healthcare">Healthcare & Biotech</SelectItem>
                      <SelectItem value="Agriculture">Agri-tech & Rural Development</SelectItem>
                      <SelectItem value="Services">Professional Services & Consulting</SelectItem>
                      <SelectItem value="Other">Other Enterprise Sector</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && <span className="text-[9px] font-semibold text-red-500 block">{errors.businessType}</span>}
                </div>

                {/* Description (Active) */}
                <div className="space-y-1">
                  <Label htmlFor="businessDescription" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Business & Funding Goals Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    rows={4}
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    className={`text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 min-h-[100px] resize-none ${errors.businessDescription ? "border-red-500" : ""
                      }`}
                  />
                  {errors.businessDescription && (
                    <span className="text-[9px] font-semibold text-red-500 block">{errors.businessDescription}</span>
                  )}
                </div>
              </div>

              {/* Actions Row */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="border border-zinc-200 hover:border-black text-black px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-8 py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
