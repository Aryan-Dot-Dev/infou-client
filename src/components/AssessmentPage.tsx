import React, { useState, useEffect, useRef, Suspense } from "react";
import { CheckCircle, Copy, Check, X, ShieldAlert, Award, FileSpreadsheet, PlayCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ClickSpark from "./ui/ClickSpark";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import illustration from "../notion_illustration.png";
import { gsap } from "gsap";
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

  // Collapsible prefilled edit form state
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);

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
        // Clear immediately so a page reload resets if desired
        sessionStorage.removeItem("infou_assessment_results");
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
      const response = await fetch("/api/recommend-schemes", {
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
      setIsSuccess(true);
      setIsFormCollapsed(true);
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
            <Label htmlFor="name" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
            <Label htmlFor="email" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
            <Label htmlFor="phone" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
            <Label htmlFor="businessName" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
          <Label htmlFor="businessType" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
          <Label htmlFor="businessDescription" className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-zinc-400">
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
              className="w-full bg-black text-white py-3 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-800 transition-all duration-100 cursor-pointer flex items-center justify-center gap-2"
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

  const renderResults = () => {
    return (
      <div className="space-y-8 animate-in fade-in-0 duration-200">
        {/* Header Info */}
        <div className="border-b border-zinc-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div>
            <h3 className="font-sans text-2xl font-extrabold text-black tracking-tight">
              Matched Sovereign Funding Schemes
            </h3>
            <p className="text-zinc-500 font-sans text-sm mt-1 leading-relaxed max-w-xl">
              Our policy matrix has mapped your business profile against 130+ central and state policies to identify key allocations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-250 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold font-sans">
              <CheckCircle size={14} className="text-emerald-600" />
              {recommendations?.length || 0} Matches Found
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <span className="w-8 h-8 border-4 border-zinc-250 border-t-black rounded-full animate-spin" />
            <p className="text-zinc-400 font-sans text-xs">Re-evaluating sovereign policy matching matrix...</p>
          </div>
        ) : recommendations && recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:border-black hover:shadow-md transition-all duration-300 text-left">
                <div className="space-y-3">
                  {/* Ministry and confidence level */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-150 pb-2">
                    <span className="text-[9px] font-extrabold tracking-widest text-zinc-400 uppercase max-w-[70%] truncate font-sans" title={rec.ministry}>
                      {rec.ministry || "Ministry of Commerce & Industry"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${rec.confidence === "high" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        rec.confidence === "medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-zinc-100 text-zinc-700 border border-zinc-200"
                        }`}>
                        {rec.confidence} Match
                      </span>
                      {rec.relevanceScore && (
                        <span className="text-[10px] font-extrabold text-black font-sans bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-md">
                          {(rec.relevanceScore * 100).toFixed(0)}% Match
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheme Name */}
                  <h4 className="font-sans text-base font-extrabold text-black tracking-tight leading-tight">
                    {rec.schemeName}
                  </h4>

                  {/* Scheme Description */}
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                    {rec.schemeDescription}
                  </p>

                  {/* Scheme Parameters HUD */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 text-left">
                      <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                        Funding Range
                      </span>
                      <span className="block text-xs font-bold text-primary tracking-tight mt-1 font-sans">
                        {rec.fundingRange || "Not specified in available evidence."}
                      </span>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 text-left">
                      <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                        Expected Timeline
                      </span>
                      <span className="block text-xs font-bold text-zinc-800 tracking-tight mt-1 font-sans">
                        {rec.expectedTimeline || "Not specified in available evidence."}
                      </span>
                    </div>
                  </div>

                  {/* Matched Signals */}
                  {rec.matchedSignals && rec.matchedSignals.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {rec.matchedSignals.map((sig: string, sigIdx: number) => (
                        <span key={sigIdx} className="text-[9px] font-bold text-zinc-650 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md font-sans animate-fade-in">
                          {sig}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recommended Next Step */}
                  {rec.recommendedNextStep && (
                    <div className="border-l-2 border-black bg-zinc-50 p-3 rounded-r-xl text-xs text-zinc-600 font-sans italic mt-2 leading-relaxed">
                      {rec.recommendedNextStep}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-200 rounded-xl text-zinc-400 text-xs font-sans">
            No matching schemes were found for your business profile at this time.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 pt-24 pb-24 flex items-start justify-center">
      <div className="w-full px-6 transition-all duration-500 ease-in-out max-w-7xl">
        {apiError ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 text-left shadow-sm max-w-xl mx-auto">
            <div className="space-y-6 animate-in fade-in-0 duration-200">
              <div className="flex flex-col items-center justify-center text-center py-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center rounded-full mb-3 shadow-xs">
                  <X size={24} strokeWidth={2} />
                </div>
                <h3 className="font-sans text-lg font-extrabold text-black uppercase tracking-wider">
                  Advisory Database Offline
                </h3>
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
          <div className="flex flex-col items-center animate-in fade-in-0 duration-200">
            {/* Top Centered Header (Just like Landing Page Hero) */}
            <div className="text-center ma x-w-3xl mx-auto mb-4 flex flex-col items-center justify-center w-full">
              <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Find Your Eligible Government Schemes
              </h1>
            </div>

            {/* Split Content layout */}
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-4 items-center w-full">
              {/* Right Column: Compact Form Card */}
              <div className="lg:col-span-6 lg:col-start-4 bg-white border border-zinc-200 rounded-2xl p-4 md:p-8 shadow-sm">
                {renderForm()}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in-0 duration-200">
            {/* Left Column: Collapsible Profile Summary / Edit Form */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-32 text-left transition-all duration-300">
              {isFormCollapsed ? (
                // Collapsed state: Compact summary dashboard
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase select-none">
                        SUBMITTED PROFILE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h3 className="font-sans text-lg font-extrabold text-black mt-1">
                      {formData.businessName || "Unnamed Business"}
                    </h3>
                    <span className="inline-block px-2.5 py-0.5 mt-1.5 bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold text-zinc-650 uppercase tracking-wider">
                      {formData.businessType || "Unspecified Sector"}
                    </span>
                  </div>

                  <div className="w-full h-px bg-zinc-200/60 my-2" />

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase select-none block">
                        Representative
                      </span>
                      <span className="font-sans font-bold text-zinc-800">
                        {formData.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase select-none block">
                        Contact Email
                      </span>
                      <span className="font-sans text-zinc-600 truncate block">
                        {formData.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase select-none block">
                        Phone
                      </span>
                      <span className="font-sans text-zinc-650">
                        {formData.phone}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsFormCollapsed(false)}
                      className="w-full border border-zinc-200 text-black py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Edit Profile Details
                    </button>
                  </div>
                </div>
              ) : (
                // Expanded state: Prefilled edit form
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase select-none block mb-1">
                      EDIT PROFILE PARAMETERS
                    </span>
                    <h3 className="font-sans text-sm font-extrabold text-black uppercase tracking-wider">
                      Re-Run Advisory Matrix
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`h-9 text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <span className="text-[9px] font-semibold text-red-500 block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Corporate Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`h-9 text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <span className="text-[9px] font-semibold text-red-500 block">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`h-9 text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <span className="text-[9px] font-semibold text-red-500 block">{errors.phone}</span>}
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <Label htmlFor="businessName" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Business Name
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={`h-9 text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.businessName ? "border-red-500" : ""}`}
                      />
                      {errors.businessName && <span className="text-[9px] font-semibold text-red-500 block">{errors.businessName}</span>}
                    </div>

                    {/* Business Type Selector */}
                    <div className="space-y-1">
                      <Label htmlFor="businessType" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
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
                          className={`w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-black outline-none h-9 cursor-pointer ${errors.businessType ? "border-red-500" : ""
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

                    {/* Description */}
                    <div className="space-y-1">
                      <Label htmlFor="businessDescription" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Business & Funding Goals Description
                      </Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        rows={3}
                        value={formData.businessDescription}
                        onChange={handleInputChange}
                        className={`text-xs rounded-lg border-zinc-200 focus-visible:ring-black/20 min-h-[70px] resize-none ${errors.businessDescription ? "border-red-500" : ""}`}
                      />
                      {errors.businessDescription && <span className="text-[9px] font-semibold text-red-500 block">{errors.businessDescription}</span>}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFormCollapsed(true)}
                      className="w-1/2 border border-zinc-200 text-black py-2 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 bg-black text-white py-2 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Running...
                        </>
                      ) : (
                        "Re-Run Audit"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Matched schemes (takes up 8 cols for more space) */}
            <div className="lg:col-span-8">
              {renderResults()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
