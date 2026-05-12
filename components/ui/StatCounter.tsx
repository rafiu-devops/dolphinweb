"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatCounterProps {
  value: string;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isInView) {
      springValue.set(numericValue);
    }
  }, [isInView, numericValue, springValue, mounted]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group p-8 rounded-3xl bg-card border border-border/40 backdrop-blur-md hover:border-brand-blue/30 transition-all duration-500 overflow-hidden shadow-lg h-[180px] md:h-[220px] flex flex-col items-center justify-center text-center"
    >
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-blue/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 space-y-3 w-full">
        <div className="flex items-baseline justify-center gap-1">
          <motion.span className="text-6xl md:text-7xl font-heading font-normal text-foreground italic tracking-wider text-glow">
            {mounted ? displayValue : "0"}
          </motion.span>
          <span className="text-4xl md:text-5xl font-heading font-normal text-brand-blue italic">{suffix}</span>
        </div>
        <div className="font-heading text-[13px] md:text-[15px] font-normal tracking-[0.2em] uppercase text-[--muted] group-hover:text-brand-blue transition-colors leading-tight px-4">
          {label}
        </div>
      </div>

      {/* Brand Accent Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-blue group-hover:w-1/2 transition-all duration-700" />
    </motion.div>
  );
}
