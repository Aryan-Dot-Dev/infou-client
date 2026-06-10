import React, { useState, useEffect } from "react";
import { X, CheckCircle, Copy, Check, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ClickSpark from "./ui/ClickSpark";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { navigateTo } from "../lib/router";
import Stepper, { Step } from "./ui/Stepper";
import { apiUrl } from "../lib/api";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: "manual_click" | "random_popup";
  onSubmitSuccess?: (payload: any) => void;
}

export function AssessmentModal({ isOpen, onClose, source, onSubmitSuccess }: AssessmentModalProps) {
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

  // Stepper state tracking
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  // New API-specific recommendation states
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPayload, setShowPayload] = useState(false);
  const [requestPayload, setRequestPayload] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        businessType: "",
        businessDescription: ""
      });
      setErrors({});
      setIsSuccess(false);
      setGeneratedPayload(null);
      setIsCopied(false);
      setRecommendations(null);
      setApiError(null);
      setShowPayload(false);
      setRequestPayload(null);
      setCurrentStepIndex(1);
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Instant field-level validation for responsive UX feedback
  const validateField = (fieldName: string, value: string) => {
    let errorMsg = "";
    if (fieldName === "name" && !value.trim()) {
      errorMsg = "Full name is required";
    } else if (fieldName === "email") {
      if (!value.trim()) {
        errorMsg = "Corporate email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    } else if (fieldName === "phone") {
      if (!value.trim()) {
        errorMsg = "Contact number is required";
      } else if (!/^[+0-9\s-]{8,20}$/.test(value)) {
        errorMsg = "Please enter a valid contact number";
      }
    } else if (fieldName === "businessName" && !value.trim()) {
      errorMsg = "Business/Company name is required";
    } else if (fieldName === "businessDescription" && !value.trim()) {
      errorMsg = "Business summary is required";
    }

    setErrors((prev) => {
      const next = { ...prev };
      if (errorMsg) {
        next[fieldName] = errorMsg;
      } else {
        delete next[fieldName];
      }
      return next;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Step validation helpers to dynamically control the "Continue" stepper button
  const isStep1Valid = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[+0-9\s-]{8,20}$/;
    return (
      formData.name.trim() !== "" &&
      !errors.name &&
      formData.email.trim() !== "" &&
      emailRegex.test(formData.email) &&
      !errors.email &&
      formData.phone.trim() !== "" &&
      phoneRegex.test(formData.phone) &&
      !errors.phone &&
      formData.businessName.trim() !== "" &&
      !errors.businessName
    );
  };

  const isStep2Valid = () => {
    return formData.businessType !== "" && !errors.businessType;
  };

  const isStep3Valid = () => {
    return formData.businessDescription.trim() !== "" && !errors.businessDescription;
  };

  const isCurrentStepValid = () => {
    if (currentStepIndex === 1) return isStep1Valid();
    if (currentStepIndex === 2) return isStep2Valid();
    if (currentStepIndex === 3) return isStep3Valid();
    return true;
  };

  const handleFinalStepCompleted = async () => {
    setIsSubmitting(true);
    setApiError(null);

    const payload = {
      timestamp: new Date().toISOString(),
      source: source,
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
    console.log("[INFOU API RECOMMEND INITIATED]", payload);

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

      if (onSubmitSuccess) {
        onSubmitSuccess(payload);
      }

      onClose();
      navigateTo("assessment");
    } catch (error: any) {
      console.error("[INFOU API RECOMMEND FAILED]", error);
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200">
      {/* Click outside to close (disabled for form integrity, close button is explicit) */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl z-10 animate-in zoom-in-95 duration-200">

        {/* Premium white circular Close Button positioned floating above on mobile and diagonally at the corner on desktop */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-2 sm:-top-4 sm:-right-4 z-50 w-9 h-9 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:scale-110 hover:rotate-90 active:scale-95 cursor-pointer"
          title="Close"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {apiError ? (
          <div className="step-circle-container p-6 md:p-8 pt-16 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] text-left">
            <div className="py-4 space-y-6 animate-in fade-in-0 duration-200 text-left">
              {/* Error Header */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center rounded-full mb-3 shadow-xs">
                  <X size={20} strokeWidth={2} />
                </div>
                <h3 className="font-sans text-base font-bold text-black uppercase tracking-wider">
                  Advisory Database Offline
                </h3>
                <p className="text-zinc-500 font-sans text-xs max-w-sm mt-1 leading-relaxed">
                  The local recommendations service returned the following diagnostic warning:
                </p>
                <div className="bg-red-50/50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-xs leading-relaxed max-w-md mt-3 font-sans w-full">
                  {apiError}
                </div>
              </div>

              {/* Show structured request data so developer can review */}
              <div className="space-y-3">
                <p className="text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase text-center">
                  Packaged Request Schema (Ready to wire)
                </p>

                {requestPayload && (
                  <div className="relative group text-left max-w-lg mx-auto">
                    <div className="absolute right-3 top-3 z-25">
                      <button
                        onClick={() => copyToClipboard(requestPayload)}
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>COPY REQUEST JSON</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="w-full text-[10px] font-mono tracking-widest text-zinc-600 bg-zinc-950 px-4 py-2 border-t border-x border-zinc-850 rounded-t-xl select-none">
                      API REQUEST SCHEME SPEC v1.0
                    </div>
                    <pre className="bg-zinc-950 text-zinc-300 p-4 rounded-b-xl text-[10px] overflow-x-auto font-mono border border-zinc-850 max-h-40 overflow-y-auto w-full">
                      <code>{requestPayload}</code>
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <ClickSpark sparkColor="#000" sparkRadius={20} sparkCount={6} duration={350}>
                  <button
                    onClick={() => {
                      setApiError(null);
                      setIsSuccess(false);
                    }}
                    className="border border-zinc-200 text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-zinc-50 transition-colors active:scale-95 duration-100 cursor-pointer w-full sm:w-auto"
                  >
                    Back to Form
                  </button>
                </ClickSpark>

                <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={8} duration={400}>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-colors active:scale-95 duration-100 cursor-pointer w-full sm:w-auto text-center"
                  >
                    Dismiss Warning
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        ) : isSubmitting ? (
          <div className="step-circle-container p-6 md:p-8 pt-16 pb-16 flex flex-col items-center justify-center min-h-[350px] bg-white border border-zinc-200 rounded-2xl shadow-xl text-center">
            <span className="w-10 h-10 border-4 border-zinc-200 border-t-primary rounded-full animate-spin" />
            <div className="space-y-1">
              <h3 className="font-sans text-base font-extrabold text-[#1c1d1a] uppercase tracking-wider">
                Compiling Diagnostic Audit
              </h3>
              <p className="text-zinc-500 font-sans text-xs max-w-xs leading-relaxed">
                Mapping corporate profile against 130+ active central & state policies...
              </p>
            </div>
          </div>
        ) : !isSuccess ? (
          <Stepper
            initialStep={1}
            onStepChange={(step) => setCurrentStepIndex(step)}
            onFinalStepCompleted={handleFinalStepCompleted}
            disableStepIndicators={false}
            backButtonText="Back"
            nextButtonText="Continue"
            nextButtonProps={{
              disabled: !isCurrentStepValid(),
              style: { opacity: isCurrentStepValid() ? 1 : 0.6 }
            }}
          >
            <Step>
              <div className="space-y-4 text-left">
                <h3 className="font-sans text-sm font-extrabold text-black uppercase tracking-wider mb-2">
                  Corporate & Representative Profile
                </h3>
                <p className="text-zinc-500 font-sans text-xs leading-relaxed mb-4">
                  Provide your representative details and registered business profile for scheme evaluation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.name ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {errors.name && <span className="text-[10px] font-semibold text-red-500">{errors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                      Corporate Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. v.sharma@company.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.email ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {errors.email && <span className="text-[10px] font-semibold text-red-500">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.phone ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {errors.phone && <span className="text-[10px] font-semibold text-red-500">{errors.phone}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="businessName" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="e.g. Infotech Systems Ltd"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 ${errors.businessName ? "border-red-500 focus-visible:ring-red-100" : ""
                        }`}
                    />
                    {errors.businessName && (
                      <span className="text-[10px] font-semibold text-red-500">{errors.businessName}</span>
                    )}
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-4 text-left">
                <h3 className="font-sans text-sm font-extrabold text-black uppercase tracking-wider mb-2">
                  Industry Alignment
                </h3>
                <p className="text-zinc-500 font-sans text-xs leading-relaxed mb-4">
                  Select the business vertical that primary represents your company's core operational activities.
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor="businessType" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                    Business Vertical
                  </Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(val) => {
                      setFormData((prev) => ({ ...prev, businessType: val }));
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.businessType;
                        return next;
                      });
                    }}
                  >
                    <SelectTrigger
                      id="businessType"
                      className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-black shadow-xs outline-none focus:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 h-10 cursor-pointer ${errors.businessType ? "border-red-500" : ""
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
              </div>
            </Step>

            <Step>
              <div className="space-y-4 text-left">
                <h3 className="font-sans text-sm font-extrabold text-black uppercase tracking-wider mb-2">
                  Operations & Subsidies
                </h3>
                <p className="text-zinc-500 font-sans text-xs leading-relaxed mb-4">
                  Describe your primary operations, expansion roadmap, and targeted government schemes or grants.
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor="businessDescription" className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                    Business & Funding Goals Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    rows={4}
                    placeholder="Outline your primary operations, expansion roadmap, and what funding schemes you seek (e.g. central capital subsidy, technology development grants)."
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    className={`rounded-lg border-zinc-200 focus-visible:ring-black/20 text-sm min-h-[110px] resize-none ${errors.businessDescription ? "border-red-500 focus-visible:ring-red-100" : ""
                      }`}
                  />
                  {errors.businessDescription && (
                    <span className="text-[10px] font-semibold text-red-500">{errors.businessDescription}</span>
                  )}
                </div>
              </div>
            </Step>
          </Stepper>
        ) : (
          <div className="step-circle-container p-6 md:p-8 pt-16 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] text-left">
            <div className="py-2 space-y-6 animate-in fade-in-0 duration-200">
              {/* Header Info */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center rounded-full mb-3 shadow-xs">
                  <CheckCircle size={20} strokeWidth={2} />
                </div>
                <h3 className="font-sans text-base font-extrabold text-black uppercase tracking-wider">
                  Scheme Recommendations Mapped
                </h3>
                <p className="text-zinc-500 font-sans text-xs max-w-sm mt-1 leading-relaxed">
                  The advisory engine processed your business profile against 130+ central & state policies.
                </p>
              </div>

              {/* Recommendations List */}
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                {recommendations && recommendations.length > 0 ? (
                  recommendations.map((rec: any, idx: number) => (
                    <div key={idx} className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-3 shadow-xs hover:border-black transition-colors duration-200">
                      {/* Ministry and confidence level */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-150 pb-2">
                        <span className="text-[9px] font-extrabold tracking-widest text-zinc-400 uppercase max-w-[70%] truncate" title={rec.ministry}>
                          {rec.ministry || "Ministry of Commerce & Industry"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${rec.confidence === "high" ? "bg-emerald-950 text-emerald-400 border border-emerald-900" :
                            rec.confidence === "medium" ? "bg-amber-950 text-amber-400 border border-amber-900" :
                              "bg-zinc-900 text-zinc-400 border border-zinc-800"
                            }`}>
                            {rec.confidence} Match
                          </span>
                          {rec.relevanceScore && (
                            <span className="text-[9px] font-bold text-zinc-500">
                              {(rec.relevanceScore * 100).toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Scheme Name */}
                      <h4 className="font-sans text-sm font-extrabold text-black tracking-tight flex items-center justify-between gap-2">
                        <span>{rec.schemeName}</span>
                        <div className="relative group/tooltip shrink-0">
                          <a
                            href="tel:+91 8447198483"
                            className="w-5 h-5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-primary/20"
                          >
                            <Phone size={8} strokeWidth={2.5} />
                          </a>

                          {/* Tooltip Content */}
                          <div className="absolute bottom-full right-0 mb-1.5 px-2 py-1 bg-zinc-900 text-white text-[9px] font-bold tracking-wide uppercase rounded-md shadow-md whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 ease-out z-30 font-sans border border-zinc-800 flex items-center gap-1">
                            <Phone size={8} className="text-primary" />
                            <span>Call to get more details</span>
                            {/* Tooltip arrow */}
                            <div className="absolute top-full right-2 w-1.5 h-1.5 bg-zinc-900 rotate-45 border-r border-b border-zinc-800" />
                          </div>
                        </div>
                      </h4>

                      {/* Scheme Description */}
                      <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                        {rec.schemeDescription}
                      </p>

                      {/* Scheme Parameters HUD */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-zinc-150/40 border border-zinc-200/50 rounded-lg p-2 text-left">
                          <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                            Funding Range
                          </span>
                          <span className="block text-[11px] font-bold text-primary tracking-tight mt-0.5 font-sans">
                            {rec.fundingRange || "Not specified in available evidence."}
                          </span>
                        </div>
                        <div className="bg-zinc-150/40 border border-zinc-200/50 rounded-lg p-2 text-left">
                          <span className="block text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans">
                            Expected Timeline
                          </span>
                          <span className="block text-[11px] font-bold text-zinc-800 tracking-tight mt-0.5 font-sans">
                            {rec.expectedTimeline || "Not specified in available evidence."}
                          </span>
                        </div>
                      </div>

                      {/* Matched Signals */}
                      {rec.matchedSignals && rec.matchedSignals.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {rec.matchedSignals.map((sig: string, sigIdx: number) => (
                            <span key={sigIdx} className="text-[9px] font-semibold text-zinc-600 bg-zinc-200/60 px-2 py-0.5 rounded-md">
                              {sig}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Recommended Next Step */}
                      {rec.recommendedNextStep && (
                        <div className="border-l-2 border-black bg-zinc-100/50 p-2.5 rounded-r-lg text-[11px] text-zinc-600 font-sans italic mt-1 leading-relaxed">
                          {rec.recommendedNextStep}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed border-zinc-200 rounded-xl text-zinc-400 text-xs font-sans">
                    No matching schemes were found for your business profile at this time.
                  </div>
                )}
              </div>

              {/* Developer Toggle */}
              <div className="pt-2 border-t border-zinc-150">
                <button
                  type="button"
                  onClick={() => setShowPayload(!showPayload)}
                  className="w-full text-center text-[10px] font-bold tracking-widest text-zinc-400 hover:text-black transition-colors uppercase cursor-pointer"
                >
                  {showPayload ? "Hide Technical Payload" : "View Technical JSON Response"}
                </button>

                {showPayload && generatedPayload && (
                  <div className="relative group text-left mt-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="absolute right-3 top-3 z-25">
                      <button
                        onClick={() => copyToClipboard(generatedPayload)}
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>COPY Response</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="w-full text-[10px] font-mono tracking-widest text-zinc-600 bg-zinc-950 px-4 py-2 border-t border-x border-zinc-850 rounded-t-xl select-none">
                      API RESPONSE PAYLOAD
                    </div>
                    <pre className="bg-zinc-950 text-zinc-300 p-4 rounded-b-xl text-[10px] overflow-x-auto font-mono border border-zinc-850 max-h-40 overflow-y-auto w-full">
                      <code>{generatedPayload}</code>
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-center">
                <ClickSpark sparkColor="#fff" sparkRadius={20} sparkCount={8} duration={400}>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white px-10 py-3.5 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-colors active:scale-95 duration-100 cursor-pointer"
                  >
                    Close Diagnostic View
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
