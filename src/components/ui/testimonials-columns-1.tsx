"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

export const TestimonialsColumn = ({
  className = "",
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-2xl border border-zinc-200 bg-white text-left shadow-xs w-full max-w-xs transition-all duration-300 hover:border-black/50"
                key={i}
              >
                <div className="font-sans text-sm text-zinc-500 leading-relaxed">
                  "{text}"
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-zinc-200 bg-zinc-50"
                  />
                  <div className="flex flex-col">
                    <div className="font-sans text-sm font-extrabold text-black tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="font-sans text-[10px] tracking-widest font-bold uppercase text-zinc-400 mt-0.5 leading-none">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
