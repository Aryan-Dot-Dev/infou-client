import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, Testimonial } from "./testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text: "Completely transparent from Day 1. They delivered exactly what they promised.",
    image: "https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Priya Sharma",
    role: "COO, Zevani",
  },
  {
    text: "When our first application got rejected, they found alternatives and helped us reapply. Rare dedication.",
    image: "https://plus.unsplash.com/premium_photo-1682092118645-da8aed30df2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Rajesh Nair",
    role: "Founder, TechBridge Solutions",
  },
  {
    text: "Found 4 women-specific schemes I qualified for. Fast, professional and always available.",
    image: "https://images.unsplash.com/photo-1666243185223-8380f527a0f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Ananya Deshmukh",
    role: "Director, GreenLeaf Exports",
  },
  {
    text: "ICS AI tool showed me 6 schemes I never knew existed. Thank you!",
    image: "https://images.unsplash.com/photo-1647689662423-7948c8523256?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Vikram Patel",
    role: "Founder, Trionex Lab",
  },
  {
    text: "Tried applying myself for 3 months and failed. ICS got it approved in 3 weeks.",
    image: "https://plus.unsplash.com/premium_photo-1682089841647-458dd29dc0ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Meera Iyer",
    role: "Co-Founder, Larana Studio",
  },
  {
    text: "No false promises, just honest guidance. That trust is rare in this space.",
    image: "https://images.unsplash.com/photo-1719266307151-c07fadbee416?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S2F2aXRhJTIwUmVkZHl8ZW58MHx8MHx8fDA%3D",
    name: "Kavita Reddy",
    role: "Managing Partner, Reddy Associates",
  },
  {
    text: "Found 4 schemes for my startup in minutes. MUDRA loan approved in 7 weeks.",
    image: "https://images.unsplash.com/photo-1694101181570-8dd4ddddbdf5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Arjun Mehta",
    role: "Founder, QuickServe Logistics LLP",
  },
  {
    text: "Government portals were a nightmare for me. ICS handled everything and kept me updated every 3 days.",
    image: "https://images.unsplash.com/photo-1572535897679-3da9e54b809f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sneha Kulkarni",
    role: "Owner, Kulkarni Agritech",
  },
  {
    text: "Government websites confused me for months. ICS matched me to 5 schemes in 10 mins and updated me twice a week till disbursal. Finally felt in control.",
    image: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Rohan Gupta",
    role: "MD, Axentra",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-transparent py-24 border-t border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center"
        >

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-6">
            What our clients say
          </h2>
          <p className="font-sans text-sm text-zinc-500 leading-relaxed opacity-75 max-w-md">
            See how startups, MSMEs, and business founders have benefited from our funding guidance, scheme support, and strategic consultancy services.
          </p>
        </motion.div>

        {/* Scrolling testimonial columns with dynamic fading mask */}
        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
          {/* Mobile-only column containing all reviews, hidden on tablet/desktop */}
          <TestimonialsColumn testimonials={testimonials} duration={35} className="block md:hidden w-full max-w-xs" />

          {/* Desktop/Tablet columns */}
          <TestimonialsColumn testimonials={firstColumn} duration={22} className="hidden md:block w-full max-w-xs" />
          <TestimonialsColumn testimonials={secondColumn} duration={26} className="hidden md:block w-full max-w-xs" />
          <TestimonialsColumn testimonials={thirdColumn} duration={24} className="hidden lg:block w-full max-w-xs" />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
