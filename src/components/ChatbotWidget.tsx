import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import ClickSpark from "./ui/ClickSpark";
import { navigateToDelayed } from "../lib/router";
import { apiUrl } from "../lib/api";


interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isActionable?: boolean;
  type?: "assessment" | "contact";
}

const POLICY_ANSWERS: Record<string, { text: string; isActionable: boolean; type?: "assessment" | "contact" }> = {
  "pli subsidies": {
    text: "The Production Linked Incentive (PLI) scheme offers 4% to 6% financial incentives on incremental sales for eligible manufacturing sectors (Electronics, Auto, Pharma, etc.).",
    isActionable: true,
    type: "assessment"
  },
  "msme grants": {
    text: "MSMEs can access credit-linked subsidies, technology upgradation grants, and collateral-free loan guarantees up to ₹5 crore.",
    isActionable: true,
    type: "assessment"
  },
  "tax exemptions": {
    text: "Eligible startups under the Startup India initiative can claim a 100% tax holiday on profits for 3 consecutive years within their first decade of operations.",
    isActionable: true,
    type: "assessment"
  },
  "state policy audit": {
    text: "State-level incentives include electricity duty waivers, stamp duty exemptions, and SGST reimbursements depending on the location and scale of your plant.",
    isActionable: true,
    type: "assessment"
  }
};

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "Welcome to Infou Consultancy. I am your automated policy assistant. Type a query to check your government subsidy eligibility.",
  timestamp: new Date()
};

const SESSION_KEY = "infou_chat_history";

const loadMessages = (): Message[] => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
  } catch {
    // ignore parse errors
  }
  return [WELCOME_MESSAGE];
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  // Close chat when clicking outside the widget
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = async (query: string): Promise<{ text: string; isActionable: boolean; type?: "assessment" | "contact" }> => {
    const response = await fetch(apiUrl(`/api/chat-restricted`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json() as { answer?: string };
    const answer = data.answer?.trim();
    return {
      text: answer || "I do not have information on this.",
      isActionable: true,
      type: "assessment"
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsSending(true);

    try {
      const replyData = await getResponse(text);
      const botMsg: Message = {
        id: `bot_${Math.random().toString(36).substring(2, 9)}`,
        sender: "bot",
        text: replyData.text,
        timestamp: new Date(),
        isActionable: replyData.isActionable,
        type: replyData.type
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: Message = {
        id: `bot_${Math.random().toString(36).substring(2, 9)}`,
        sender: "bot",
        text: "I’m unable to reach the policy assistant right now. Please try again in a moment.",
        timestamp: new Date(),
        isActionable: true,
        type: "assessment"
      };

      setMessages((prev) => [...prev, botMsg]);
      console.error("[CHATBOT_WIDGET] Failed to fetch chat response:", error);
    } finally {
      setIsSending(false);
    }
  };

  const triggerAction = (type?: "assessment" | "contact") => {
    if (type === "contact") {
      navigateToDelayed("contact", 200);
    } else {
      window.dispatchEvent(
        new CustomEvent("open-assessment", { detail: { source: "manual_click" } })
      );
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 font-sans text-left">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-85 sm:w-95 h-120 bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200 origin-bottom-right">

          {/* Chat Header */}
          <div className="bg-zinc-50 border-b border-zinc-150 px-4 py-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-black tracking-tight">
                Infou Assistant
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-black transition-colors rounded-lg hover:bg-zinc-100"
              title="Close Chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="grow overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div key={msg.id} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed shadow-xs ${isBot
                      ? "bg-[#FFF7F0] border border-orange-100 text-zinc-800 rounded-tl-none"
                      : "bg-[#C45000] text-white rounded-tr-none"
                      }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            <div ref={chatEndRef} />
          </div>



          {/* Chat input box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-zinc-150 bg-white flex gap-2 items-center"
          >
            <Input
              required
              placeholder="Query government funding..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSending}
              className="grow rounded-lg text-xs h-9 border-zinc-200 focus-visible:ring-black/10 placeholder:text-zinc-300 text-black bg-zinc-50/50"
            />
            <ClickSpark sparkColor="#fff" sparkRadius={15} sparkCount={6} duration={350}>
              <button
                type="submit"
                disabled={isSending}
                className="w-9 h-9 bg-primary text-white hover:bg-primary/90 rounded-lg flex items-center justify-center transition-colors active:scale-95 duration-100 shrink-0 cursor-pointer"
                title="Send Message"
              >
                <Send size={12} />
              </button>
            </ClickSpark>
          </form>
        </div>
      )}

      {/* Floating Toggle Button Bubble */}
      <div className="relative flex flex-col items-end animate-bounce-slow">
        {!isOpen && (
          <div className="absolute bottom-16 right-0 mb-3 bg-[#FFF8F5] border-2 border-black rounded-2xl px-4 py-2.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs font-extrabold text-black uppercase tracking-wider select-none whitespace-nowrap pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300 z-10">
            Let's chat!
            {/* Cartoon tail pointing down-right */}
            <div className="absolute -bottom-2 right-6 w-3.5 h-3.5 bg-[#FFF8F5] border-r-2 border-b-2 border-black rotate-45 z-0" />
          </div>
        )}
        <ClickSpark sparkColor="#fff" sparkRadius={24} sparkCount={8} duration={400}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-primary relative group"
            title="Consult AI Policy Advisor"
          >
            {isOpen ? (
              <X size={20} className="animate-in spin-in-90 duration-200" />
            ) : (
              <>
                <MessageSquare size={20} className="animate-in zoom-in-50 duration-200" />
                {/* Visual unread notification dot */}
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black"></span>
                </span>
              </>
            )}
          </button>
        </ClickSpark>
      </div>
    </div>
  );
}
