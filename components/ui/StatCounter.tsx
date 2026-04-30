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
      className="relative group p-8 rounded-3xl bg-card border border-border/40 backdrop-blur-md hover:border-brand-blue/30 transition-all duration-500 overflow-hidden shadow-lg"
    >
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-blue/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 space-y-1">
        <div className="flex items-baseline justify-center gap-0.5">
          <motion.span className="text-5xl md:text-6xl font-black text-foreground italic tracking-tighter text-glow-blue">
            {mounted ? displayValue : "0"}
          </motion.span>
          <span className="text-3xl md:text-4xl font-black text-brand-blue italic">{suffix}</span>
        </div>
        <div className="text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-muted-foreground group-hover:text-brand-blue/60 transition-colors">
          {label}
        </div>
      </div>

      {/* Brand Accent Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-blue group-hover:w-1/2 transition-all duration-700" />
    </motion.div>
  );
}
